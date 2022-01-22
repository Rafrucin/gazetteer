<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

    $file = 'countryBorders.geo.json';
    $str = file_get_contents($file);
    $json = json_decode($str);
    $myarr = $json->features;
    $result = array();

    foreach ($myarr as $value) 
    {    
        array_push($result, $value->properties->name);
    }

    sort($result);
    $encoded = json_encode($result);
//print_r($encoded);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $encoded;

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output); 
        

?>