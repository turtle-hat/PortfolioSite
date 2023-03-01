<?php
	$project = "255565"; // the default project to search for

    // if there is ?project, grab the value
    if(array_key_exists('project', $_GET) && strlen($project)){
        $project = $_GET['project'];
        // encode spaces in the parameters as +
        $project = str_replace(' ', '+', $project);
    }

    // build URL to request from
	$URL = "https://api.scratch.mit.edu/projects/$project";
	header('content-type:application/json');      // tell the requestor that this is JSON
	header("Access-Control-Allow-Origin: *");     // turn on CORS
	echo file_get_contents($URL);
?>