<?php

	// remove for production
	include("config.php");
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	$poiloc = $_REQUEST['poiloc'];
	$poiloc = str_replace(' ', '_', $poiloc);

	$url ='https://www.triposo.com/api/20211011/poi.json?tag_labels=cuisine&location_id='. $poiloc .'&count=30&order_by=-score&fields=name,coordinates&account='. $account .'&token='. $token .'';
	//$url='http://api.geonames.org/countryCode?type=JSON&lat='. $_REQUEST['lat'] .'&lng='. $_REQUEST['lng'] .'&username=ravrucin&style=full';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $result;
	
	//print_r($encoded);

	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>