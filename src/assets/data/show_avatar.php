<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
ini_set('max_execution_time',600);
ini_set('set_time_limit',600);
error_reporting(-1);
ini_set('memory_limit', '-1');
require_once('../../../lib/class.OracleDB.php');

$X=new OracleDB();
$id=$_GET["id"];

$sql = "SELECT ORIGINAL_IMAGE AS WEB_IMAGE, FILE_NAME, ";
$sql .=" CAPTION, DESCRIPTION FROM IMAGES WHERE IMAGE_ID =" . $id;
$data = $X->sql($sql);

header("content-type:image/jpeg");
echo $data[0]['WEB_IMAGE'];
//print('<img width="425" src="data:image/jpeg;base64,'.base64_encode($data[0]['WEB_IMAGE']).'" />');
?>



