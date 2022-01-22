<?php

	// remove for production
	include("config.php");
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
	$capital = $_REQUEST['capital'];
	//$capital = "London";
	$capital = str_replace(' ', '_', $capital);
	//$url='http://api.geonames.org/counthttp://api.geonames.org/countryCode?type=JSON&lat=47.03&lng=10.2&username=ravrucin&style=fullryInfoJSON?formatted=true&lang=' . $_REQUEST['lang'] . '&country=' . $_REQUEST['country'] . '&username=flightltd&style=full';
    $url='https://api.ipgeolocation.io/timezone?apiKey='. $apiKeytime .'&location='. $capital .'';
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
	$output['data'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
