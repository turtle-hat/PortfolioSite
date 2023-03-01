<?php
	$project = "255565"; // the default project to search for
    $limit = "40"; // the default amount of projects to display at once
    $offset = "0"; // the default amount to offset the search

    // if there is ?project, grab the value
    if(array_key_exists('project', $_GET) && strlen($project)){
        $project = $_GET['project'];
        // encode spaces in the parameters as +
        $project = str_replace(' ', '+', $project);
    }
    // if there is ?limit, grab the value
    if(array_key_exists('limit', $_GET) && strlen($limit)){
        $limit = $_GET['limit'];
        // encode spaces in the parameters as +
        $limit = str_replace(' ', '+', $limit);
    }
    // if there is ?offset, grab the value
    if(array_key_exists('offset', $_GET) && strlen($offset)){
        $offset = $_GET['offset'];
        // encode spaces in the parameters as +
        $offset = str_replace(' ', '+', $offset);
    }

	$URL = "https://api.scratch.mit.edu/projects/$project/remixes?limit=$limit&offset=$offset";
	header('content-type:application/json');      // tell the requestor that this is JSON
	header("Access-Control-Allow-Origin: *");     // turn on CORS
	echo file_get_contents($URL);
?>