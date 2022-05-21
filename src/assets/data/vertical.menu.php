<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header('Content-type: application/json');

$output='[
{
		"id": "home",
		"title": "Navigation",
		"subtitle": "",
		"type": "group",
		"icon": "heroicons_outline:home",	
		"children": [{
				"id": "db",
				"title": "List / Search Template",
				"type": "basic",
				"icon": "heroicons_outline:clipboard-check",
				"link": "/list-template"
		},
		{
				"id": "db",
				"title": "Add Form Template",
				"type": "basic",
				"icon": "heroicons_outline:clipboard-check",
				"link": "/form-template"
		},
		{
				"id": "db",
				"title": "Classic MIST",
				"type": "basic",
				"icon": "heroicons_outline:clipboard-check",
				"link": "/mist-home"
		},
		{
				"id": "db",
				"title": "Logout",
				"type": "basic",
				"icon": "heroicons_outline:clipboard-check",
				"link": "/mist-logout"
		}]
}]';
   $arr=json_decode($output,true);
   $output=array();
   $output['default']=$arr;
   $output['compact']=array();
   $output['futuristic']=array();
   $output['horizontal']=array();   
  echo json_encode($output);	

?>