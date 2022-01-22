<?php
include("config.php");
$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => 'https://covid-19-data.p.rapidapi.com/country/code?code='. $_REQUEST['countryCode'] .'',
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"x-rapidapi-host: covid-19-data.p.rapidapi.com",
		"x-rapidapi-key: ". $xrapidapikey .""
	],
]);

$result = curl_exec($curl);
$err = curl_error($curl);

$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	//$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $result;
	
	//print_r($encoded);

	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

curl_close($curl);

