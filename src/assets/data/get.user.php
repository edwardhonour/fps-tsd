<?php

//---------------------------------------------------------------------------------------
// MODIFIED INFRASTRUCTURE SURVEY TOOL
//
// get.user.php:  Get User Account data that is used by angular controls.  This is 
//                redundant but necessary to keep the template formatted correctly.
//    
//                This file will not change from application to application.
//
//---------------------------------------------------------------------------------------

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header('Content-type: application/json');

$production="Y";

if ($production=='Y') {
        //-------------------------------------------------//
        //-- File is:  D:\FPSSTAGE\lib\class.OracleDB.php  //
        //-------------------------------------------------//
  	require_once('../../../lib/class.OracleDB.php');
	$X=new OracleDB();
} else {
	require_once('class.XRDB.php');
	$X=new XRDB();
}

//-------------------------------------------------------------------------------------
// PHP cookies are still available in Angular as long as we keep our datasource on 
// the application servers the users log into.
//-------------------------------------------------------------------------------------

if (isset($_COOKIE['uid'])) $uid=$_COOKIE['uid']; else $uid=0; 

$sql="select * from FPS_USER where USER_ID = " . $uid;
$user=$X->sql($sql);
if (sizeof($user)>0) {
     $output=array();
     $output['id']="cfaad35d-07a3-4447-a6c3-d8c3d54fd5df";
     $output['name']=$user[0]['FIRST_NAME'] . " " . $user[0]['LAST_NAME'];
     $output['email']=$user[0]['EMAIL'];
     if ($user[0]['MASTER_CONTACT_ID']!=0) {
         $output['avatar']="assets/data/show_avatar.php?id=" . $user[0]['MASTER_CONTACT_ID'];
     } else {
         $output['avatar']="assets/images/avatars/brian-hughes.jpg";
     }
     $output['status']="online";
     echo json_encode($output);
} else {
     $output=array();
     $output['id']="cfaad35d-07a3-4447-a6c3-d8c3d54fd5df";
     $output['name']="Account Not Found";
     $output['email']="account@notfound.com";
     $output['avatar']="assets/images/avatars/brian-hughes.jpg";
     $output['status']="offline";
     echo json_encode($output);
}

?>
