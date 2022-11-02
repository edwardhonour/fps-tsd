<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
ini_set('memory_limit',-1);
ini_set('max_execution_time', 3000);
ini_set('upload_max_filesize', '8M');
ini_set('memory_limit', -1);
ini_set('post_max_size', '8M');
ini_set('KeepAliveTimeout', '300');
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header("Content-Type: text/html; charset=utf-8");

require_once('../../../lib/class.OracleDB.php');
require_once('../../../lib/class.FPSDocuments.php');

$ora=new OracleDB();
$db=$ora->connectACN();

$fileName = basename($_FILES["file"]["name"]);
$fileType = basename($_FILES["file"]["type"]);
$blobimage = scaleImageFileToBlob($_FILES['file']['tmp_name']);

$sql = "select IMAGES_SEQ.NEXTVAL as new_key from DUAL";
$data = $db->query($sql);
$result = $data->fetch(PDO::FETCH_ASSOC);
$newKey = $result['NEW_KEY'];
$user_id=$_COOKIE['uid'];
$_POST['user_id']=$_COOKIE['uid'];

$_POST['fsa']=-1;
$_POST['facility_id']=-1;
$_POST['title']="User Profile Avatar";
$_POST['photodescription']="User Profile Avatar " . $_POST['user_id'];

$sql = $db->prepare("insert into IMAGES (image_id, survey_id, facility_id, caption, description, file_name, original_image) " .
    "VALUES (?,?,?,?,?,?,empty_blob()) RETURNING original_image INTO :original_image");
$sql->bindParam(1,  $newKey);
$sql->bindParam(2,  $_POST['fsa']);
$sql->bindParam(3,  $_POST['facility_id']);
$sql->bindParam(4,  $_POST['title']);
$sql->bindParam(5,  $_POST['photodescription']);
$sql->bindParam(6,  $fileName);

//save the original image
$blob = $db->getNewDescriptor(OCI_D_LOB);
$sql->bindValue(":original_image", $blob, -1, OCI_B_BLOB);

$sql->execute(OCI_DEFAULT);

if(!$blob->save($blobimage)){
    $sql->rollback();
    echo "<br>Please try again as the uploaded failed for " . $fileName . "!<br>";
} else {
    $sql->commit();
}

$sql="UPDATE TBL_USER SET MASTER_CONTACT_ID = " . $newKey . " WHERE USER_ID = " . $_POST['user_id'];
$ora->execute($sql);

$output=array();
$output['error_code']=0;
$output['error_description']="";
echo json_encode($output);
die();

//----------------------------------------------------------------------------------------
//  Function below found at https://www.php.net/manual/en/function.imagejpeg.php in user 
//  contributed notes at bottom and then slightly modified.
//  Handes gif, png and jpg. Scale max width and max height down below if necessary
//----------------------------------------------------------------------------------------

function scaleImageFileToBlob($file) {

    $source_pic = $file;
    $max_width = 1180;
    $max_height = 1180;

    list($width, $height, $image_type) = getimagesize($file);

    switch ($image_type)
    {
        case 1: $src = imagecreatefromgif($file); break;
        case 2: $src = imagecreatefromjpeg($file);  break;
        case 3: $src = imagecreatefrompng($file); break;
        default: return '';  break;
    }

    $x_ratio = $max_width / $width;
    $y_ratio = $max_height / $height;

    if( ($width <= $max_width) && ($height <= $max_height) ){
        $tn_width = $width;
        $tn_height = $height;
        }elseif (($x_ratio * $height) < $max_height){
            $tn_height = ceil($x_ratio * $height);
            $tn_width = $max_width;
        }else{
            $tn_width = ceil($y_ratio * $width);
            $tn_height = $max_height;
    }

    $tmp = imagecreatetruecolor($tn_width,$tn_height);

    /* Check if this image is PNG or GIF, then set if Transparent*/
    if(($image_type == 1) OR ($image_type==3))
    {
        imagealphablending($tmp, false);
        imagesavealpha($tmp,true);
        $transparent = imagecolorallocatealpha($tmp, 255, 255, 255, 127);
        imagefilledrectangle($tmp, 0, 0, $tn_width, $tn_height, $transparent);
    }
    imagecopyresampled($tmp,$src,0,0,0,0,$tn_width, $tn_height,$width,$height);

    /*
     * imageXXX() only has two options, save as a file, or send to the browser.
     * It does not provide you the oppurtunity to manipulate the final GIF/JPG/PNG file stream
     * So I start the output buffering, use imageXXX() to output the data stream to the browser,
     * get the contents of the stream, and use clean to silently discard the buffered contents.
     */
    ob_start();

    switch ($image_type)
    {
        case 1: imagegif($tmp); break;
        case 2: imagejpeg($tmp, NULL, 100);  break; // best quality
        case 3: imagepng($tmp, NULL, 0); break; // no compression
        default: echo ''; break;
    }

    $final_image = ob_get_contents();

    ob_end_clean();

    return $final_image;
}


?>


