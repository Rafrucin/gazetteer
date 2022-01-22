<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

function FindArrIndex($country){
    $file = 'countryBorders.geo.json';
    $str = file_get_contents($file);
    $json = json_decode($str);
    $myarr = $json->features;
    $index = 0;
    $isFound = false;

    foreach ($myarr as $value) 
    {    
        $result = $value->properties->name;
        $countryCode = $value->properties->iso_a2;
        if ($result == $country || $countryCode == $country ){ 
            $isFound = true;
            break;
            }
        $index ++;
    }

    if($isFound)
    {
        return json_encode($json->features[$index]);
    }
    else {return;}
}


$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = FindArrIndex($_REQUEST['countryOrCountryCode']);

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output); 


?>