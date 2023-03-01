const SCRATCH_URL = "https://api.scratch.mit.edu/";
const DEFAULT_PROJECT = "255565";
const DEFAULT_LIMIT = "40";
const DEFAULT_OFFSET = "0";
let content;

window.onload = (e) => {
    // On load, set searchbox to have example project's URL
    document.querySelector("#projectSearch").value = DEFAULT_PROJECT;
    document.querySelector("#limit").value = DEFAULT_LIMIT;
    document.querySelector("#offset").value = DEFAULT_OFFSET;

    // Set function of search button
    document.querySelector("#search").onclick = search;

    // Find content box
    content = document.querySelector('#apidump');

    // Test feedback to ensure this script ran
    document.querySelector("body").style.backgroundColor = "#00FF00";
}

// Occurs when the search button is pressed
function search() {
    console.log("Search button clicked!");

    // Get info for project to be shown
    let projectID = document.querySelector("#projectSearch").value;
    let limit = document.querySelector("#limit").value;
    let offset = document.querySelector("#offset").value;

    // 1 - Create a new XHR object
    const xhr = new XMLHttpRequest();
    
    // 2 - Create a URL to have the proxy server called on
    const phpURL = `php/get-remixes-scratch.php?project=${projectID}&limit=${limit}&offset=${offset}`;

    // 3 - Set onerror handler
    xhr.onerror = dataError;
    // 4 - Set onload handler
    xhr.onload = dataLoaded;

    // 5 - open connection to site and send request
    xhr.open("GET", phpURL);
    xhr.send();
}

function dataLoaded(e) {
    // Get the response as a JSON string
    const jsonString = e.target.response;
    console.log("JSON string received: " + jsonString);
    document.querySelector("body").style.backgroundColor = "#0000FF";

    // 5. update the UI by showing the results
    let json;
    try {
        json = JSON.parse(jsonString);
    } catch {
        content.innerHTML = "A JSON parsing error occurred!"
        return;
    }

    content.innerHTML = jsonString;
}

function dataError(e) {
    content.innerHTML = "An error occurred";
}