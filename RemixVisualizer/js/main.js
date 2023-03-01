// Dev messages
const INDEV = false;
const SUGGESTED_PROJECTS_SHOW = false;
const SUGGESTED_PROJECT_MESSAGE = "Hi! If you're lost, here's some other projects to try out:";
const SUGGESTED_PROJECTS = ["255565", "39009", "286110997", "292371957"];

// Throbber messages to display to the user
const THROB_PAGELOAD = "Loading page...";
const THROB_SEARCHFORPROJECT = "Searching for project...";
const THROB_SEARCHFORROOT = "Project found! Searching for root project...";
const THROB_SEARCHFORREMIXES = "Project found! Loading remixes into the tree...";
const THROB_LOADINGPROJECT = "Finished loading project: ";

// Defaults for each setting
const DEFAULT_PROJECT = "255565";
const DEFAULT_LIMIT = "20";
const DEFAULT_GETROOT = false;
const DEFAULT_DIRECTION = "styles/tree-horizontal.css";
const DEFAULT_OFFSET = "0";

// LocalStorage 
const LS_PREFIX = "org7993-srtv-";
const LS_SETTINGSKEY = LS_PREFIX + "settings";
// const LS_REMIXINFOKEY = LS_PREFIX + "remixes";

// URL templates
const SCRATCH_URL = "https://api.scratch.mit.edu/";
const SCRATCH_PROJECTURL = "https://scratch.mit.edu/projects/";
const SCRATCH_PROFILEURL = "https://scratch.mit.edu/users/";
// The prefix for the element ID of each project container in the tree
const REMIX_ID_PREFIX = "project";

// References to various elements on page
let settings;
// Inputs
let inProject;
let inLimit;
let inGetRoot;
let inDirection;
// User Feedback
let output;
let throbber;
let loadingMessage;
let progressInfo;
// Remix Tree
let treeDisplayStyle;
let remixTree;
let treeGenerations; // tree depth
let treeLeaves; // tree breadth

// Progress-tracking variables for AJAX requests
let working;
let xhrJobsRunning;

// Objects for storing metadata for each remix, as well as the parent elements of each one on the tree
let remixInfo;


window.onload = (e) => {
    // Initialize variables
    xhrJobsRunning = 0;
    remixInfo = {};
    treeGenerations = 0;
    treeLeaves = 0;
    // Initialize settings as defaults (might get overwritten by localStorage later)
    settings = {
        project: DEFAULT_PROJECT,
        limit: DEFAULT_LIMIT,
        getRoot: DEFAULT_GETROOT,
        direction: DEFAULT_DIRECTION
    };

    // Find elements on page
    output = document.querySelector("#commandLog");

    throbber = document.querySelector("#throbber");
    loadingMessage = document.querySelector("#loadingMessage");
    progressInfo = document.querySelector("#progressInfo");

    treeDisplayStyle = document.querySelector("#treeDisplayStyle");
    remixTree = document.querySelector("#remixTree");

    // Show loading bar
    throbShow(THROB_PAGELOAD);

    // Display development messages if necessary
    if (INDEV) {
        // document.querySelector("#logo").src = "media/LogoIndev-512px.png";
        pageLog("Hi! If you're seeing this message, it means I am currently working on the site, and its functionality is volatile and not guaranteed to work properly! Please come back later or yell at me to fix it ;)");
    }
    if (SUGGESTED_PROJECTS_SHOW) {
        pageLog(SUGGESTED_PROJECT_MESSAGE);
        for(let project of SUGGESTED_PROJECTS) {
            pageLog(project);
        }
    }

    // LocalStorage

    // On load, set searchbox to have example project's URL
    inProject = document.querySelector("#projectSearch");
    inLimit = document.querySelector("#limit");
    inGetRoot = document.querySelector("#getRoot");
    inDirection = document.querySelector("#direction");

    // If stored values in localStorage, fetch them
    let storedSettings = localStorage.getItem(LS_SETTINGSKEY);
    if (storedSettings) {
        try {
            settings = JSON.parse(storedSettings);
        } catch {
            pageLog("Error retrieving stored settings!");
        }
    }
    // Set values of settings in the interface to either defaults or localStorage values
    inProject.value = settings.project;
    inLimit.value = settings.limit;
    inGetRoot.checked = settings.getRoot;
    inDirection.value = settings.direction;

    // Set display settings
    treeDisplayStyle.href = inDirection.value;

    // Store current settings in localStorage
    localStorage.setItem(LS_SETTINGSKEY, JSON.stringify(settings));

    // Remove non-number characters from string
    inProject.onchange = (e) => {
        let initial = e.target.value;
        let final = "";
        for (let i = 0; i < initial.length; i++) {
            if (!isNaN(parseInt(initial.charAt(i)))) {
                final = final.concat(initial.charAt(i));
            } 
        }
        e.target.value = final;        
    }
    // Change stylesheet used
    inDirection.onchange = (e) => {
        // Get value from element
        document.querySelector("#treeDisplayStyle").href = inDirection.value;

        let storedSettings = localStorage.getItem(LS_SETTINGSKEY);
        if (storedSettings) {
            try {
                settings = JSON.parse(storedSettings);
            } catch {
                pageLog("Error retrieving stored settings!");
            }
        }

        // Update localStorage
        settings = {
            project: settings.project,
            limit: settings.limit,
            getRoot: settings.getRoot,
            direction: inDirection.value
        };
        localStorage.setItem(LS_SETTINGSKEY, JSON.stringify(settings));
    }

    // Set function of search button
    // document.querySelector("#search").onclick = growTestTree;
    document.querySelector("#search").onclick = search;

    throbHide();
}

// Occurs when the search button is pressed
function search() {
    // Only run if the page isn't currently in the process of loading the page already
    if (!working) {
        working = true;

        // Initialize remixInfo and tree size variables
        // (I know this could lead to a lot of redundant requests
        // but I don't want to spend time optimizing that right now)
        output.innerHTML = "";
        remixInfo = {};
        treeGenerations = 0;
        treeLeaves = 0;
    
        settings = {
            project: inProject.value,
            limit: inLimit.value,
            getRoot: inGetRoot.checked,
            direction: inDirection.value
        };
        localStorage.setItem(LS_SETTINGSKEY, JSON.stringify(settings));

        // Get info for project to be shown and request the remixes
        request(false, projectID = settings.project, DEFAULT_LIMIT);
    }
    // else {
    //     console.log("Search button clicked but page was busy!");
    // }
}

// Request info on either a single project or that project's remixes from the API
function request(requestRemixes, projectID = DEFAULT_PROJECT, limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET) {
    xhrJobsRunning++;
    // if (requestRemixes) {
    //     throbShow(THROB_SEARCHFORREMIXES);
    // } else {
    //     throbShow(THROB_SEARCHFORPROJECT);
    // }

    if (!requestRemixes) {
        throbShow(THROB_SEARCHFORPROJECT);
    }

    // 1 - Create a new XHR object
    const xhr = new XMLHttpRequest();
        
    // 2 - Create a URL to have the proxy server called on
    let phpURL;
    if (requestRemixes) {
        phpURL = `php/get-remixes-scratch.php?project=${projectID}&limit=${limit}&offset=${offset}`;
    } else {
        phpURL = `php/get-project-info-scratch.php?project=${projectID}`;
    }

    // 3 - Set onerror handler
    xhr.onerror = dataError;
    // 4 - Set onload handler
    if (requestRemixes) {
        xhr.onload = fetchRemixes;
    } else {
        xhr.onload = fetchBaseProject;
    }
    // 5 - Set onloadend handler
    xhr.onloadend = endJob;

    // 6 - open connection to site and send request
    xhr.open("GET", phpURL);
    xhr.send();
}

// Creates the base of the remix tree diagram by fetching information from the provided project
function fetchBaseProject(e) {

    // 1 - Get the response as a JSON string
    let jsonString = e.target.response;

    // 2 - parse returned data as JSON, or break out if doesn't work
    let json;
    try {
        json = JSON.parse(jsonString);
    } catch {
        pageLog("A JSON parsing error occurred!");
        return;
    }

    // 3 - If user requested the root project and this isn't the root, get that one instead
    if (settings.getRoot && json.remix.root != null) {
        throbUpdate(THROB_SEARCHFORROOT);
        request(false, json.remix.root);
    }
    else {
        // 4 - Put first element into remixParents, which provides the
        // parent element for the first remix listed in the object as remixTree,
        // the base element of the diagram
        storeProjectInfo(json);
    
        // 5 - Add the project to the diagram, clearing out whatever's in there originally
        remixTree.innerHTML = null;
        addProjectToTree(json.id);
    
        throbUpdate(THROB_SEARCHFORREMIXES);

        // 6 - Request remixes of this project
        if (parseInt(settings.limit)) {
            // If numeric, request the number specified
            request(true, json.id, parseInt(settings.limit), 0);
        }
        else {
            // If "As many as possible", request the number specified
            request(true, json.id, DEFAULT_LIMIT, 0);
        }
    }
}

// Take loaded JSON and extract info about remixes from it
function fetchRemixes(e) {
    // 1 - Extract the project, limit, and offset used in this request from the URL
    let requestParams = getParametersFromURL(e.target.responseURL);

    // 2 - Check status, only continue if OK
    if (e.target.status == 200) {
        // 3 - Get the response as a JSON string, with JSON added to make the returned array into a JS Object
        let jsonString = `{"remixes":` + e.target.response + "}";
    
        // 4 - parse returned data as JSON, or break out if doesn't work
        let json;
        try {
            json = JSON.parse(jsonString);
        } catch {
            pageLog("A JSON parsing error occurred!");
            return;
        }
    
        // 5 - Make variable for referencing the array of remix objects
        let remixes = json.remixes;
    
        // 6 - If there are any, loop through list of remixes returned
        if (remixes.length > 0) {
            // 7 - Get parent project ID as the ID of the parent remix of the first element in
            // the returned array (it should be the same for all of them)
            let parent = remixes[0].remix.parent;
    
            // 8 - Iterate through all remixes in the array
            for (let currentRemix of remixes) {
                // 9 - Store info about the remix in remixInfo, and append it to the tree
                throbUpdate(THROB_LOADINGPROJECT + "<strong>" + currentRemix.title + "</strong>");
    
                storeProjectInfo(currentRemix);
                addProjectToTree(currentRemix.id);

                // 10 - Request remixes of this project
                if (parseInt(settings.limit)) {
                    // If numeric, request the number specified
                    request(true, currentRemix.id, parseInt(settings.limit), 0);
                }
                else {
                    // If "As many as possible", request the number specified
                    request(true, currentRemix.id, DEFAULT_LIMIT, 0);
                }
            }

            // 11 - If obtained as many remixes as the limit (and want to display more), request more remixes from the same parent
            if (!parseInt(settings.limit) && remixes.length == requestParams.limit) {
                // console.log(`Hit end of remixes! Requesting more from Parent: ${requestParams.project} Limit: ${requestParams.limit} Old Offset: ${requestParams.offset} New Offset: ${(parseInt(requestParams.offset) + parseInt(requestParams.limit))}`);
                request(true, requestParams.project, requestParams.limit, (parseInt(requestParams.offset) + parseInt(requestParams.limit)));
            }
        }
    }
    else if (remixInfo[requestParams.project].stats.remixes > 0) {
        pageLog(`There was an error getting ${remixInfo[requestParams.project].stats.remixes} remix(es) of Project # ${requestParams.project} <strong>${remixInfo[requestParams.project].title}</strong> (Status ${e.target.status}: ${e.target.statusText})`);
    }
}

// Takes a URL and grabs just the values from each of its parameters
function getParametersFromURL(url) {
    // 1 - First split by ampersands, then split each item by equals signs and take the second item of each of those splits
    let responseURLItems = url.split("?")[1].split("&").map((num) => { return num.split("="); });
    // 2 - Then convert to an object
    let requestParams = {};
    for (let param of responseURLItems) {
        requestParams[param[0]] = param[1];
    }
    // 3 - Freeze it
    Object.freeze(requestParams);
    return requestParams;
}

// Stores info from a project's JSON and stores info about it as an object with reference to 
function storeProjectInfo(json) {
    remixInfo[json.id] = {
        title: json.title,
        description: json.description,
        instructions: json.instructions,
        author: json.author,
        imageMain: json.image,
        imageOthers: json.images,
        history: json.history,
        stats: json.stats,
        remix: json.remix,
        // IDs of any remixes of this project
        remixIDs: [],
        // The generation of remixes this project is a member of
        generation: 1,
        // Current project offset of the displayed tree
        localOffset: 0
    };

    // If this project has a parent that's already in the tree
    if (remixInfo[json.remix.parent]) {
        // Add to parent's list of remixes
        remixInfo[json.remix.parent].remixIDs.push(json.id);
        // Set own generation to parent's generation, plus 1
        remixInfo[json.id].generation = parseInt(remixInfo[json.remix.parent].generation) + 1;
    }
        
    // If this remix is the root, or if it is a remix but not an only child,
    // update the known tree breadth
    if (!remixInfo[json.remix.parent] || remixInfo[json.remix.parent].remixIDs.length > 1) {
        treeLeaves++;
    }

    // If this remix's generation is larger than the current known generation,
    // update the known tree depth
    treeGenerations = Math.max(remixInfo[json.id].generation, treeGenerations);
}

// Creates a new div for a remix, adds it to the tree according to the remixParents object
function addProjectToTree(id) {
    // 1 - Find stored project info
    const projectInfo = remixInfo[id];

    if (projectInfo) {
        // If that project exists in the info storage, create and append nested elements:

        // 2 - Containing flexbox
        container = document.createElement("div");
        container.className = "tree container";
        container.id = REMIX_ID_PREFIX + id;

        // 3 - On one part of the flexbox, a container for the specified project
        project = document.createElement("div");
        project.className = "tree project";

        // 4 - Inside that link, place the object's thumbnail
        thumbnail = document.createElement("img");
        thumbnail.className = "tree thumbnail";
        thumbnail.src = projectInfo.imageOthers["100x80"];
        thumbnail.alt = projectInfo.title;
        thumbnail.title = projectInfo.title;
        thumbnail.value = id;

        // 5 - Build project data

        // 5.1 - Create container
        projectData = document.createElement("div");
        projectData.className = "tree projectData";
        
        // 5.2 - Create thumbnail at higher resolution
        projectDataThumbnail = document.createElement("img");
        projectDataThumbnail.className = "tree thumbnailBig";
        projectDataThumbnail.src = projectInfo.imageOthers["200x200"];
        projectDataThumbnail.alt = projectInfo.title;
        projectData.appendChild(projectDataThumbnail);
        
        // 5.3 - Create header for project title

        // 5.3.1 - Create header element
        projectDataTitleHeader = document.createElement("h2");
        projectDataTitleHeader.className = "tree title";

        // 5.3.2 - Create link element
        projectDataTitleLink = document.createElement("a");
        projectDataTitleLink.href = SCRATCH_PROJECTURL + id;
        projectDataTitleLink.target = "_blank";
        projectDataTitleLink.innerHTML = projectInfo.title;

        // 5.3.3 - Append link to header and header to projectData
        projectDataTitleHeader.appendChild(projectDataTitleLink);
        projectDataTitleHeader.innerHTML += ", by";
        projectData.appendChild(projectDataTitleHeader);

        // 5.4 - Create header for project author

        // 5.4.1 - Create header element
        projectDataAuthorHeader = document.createElement("h3");
        projectDataAuthorHeader.className = "tree author";

        // 5.4.2 - Create link element
        projectDataAuthorLink = document.createElement("a");
        projectDataAuthorLink.href = SCRATCH_PROFILEURL + projectInfo.author.username;
        projectDataAuthorLink.target = "_blank";
        projectDataAuthorLink.innerHTML = "@" + projectInfo.author.username;
        
        // 5.4.3 - Create image element for profile picture
        projectDataAuthorPic = document.createElement("img");
        projectDataAuthorPic.src = projectInfo.author.profile.images["50x50"];
        projectDataAuthorPic.alt = projectInfo.author.username + "'s profile";
        
        // 5.4.4 - Append profile picture to link, link to header, and header to projectData
        projectDataAuthorLink.appendChild(projectDataAuthorPic);
        projectDataAuthorHeader.appendChild(projectDataAuthorLink);
        projectData.appendChild(projectDataAuthorHeader);

        // 5.5 - Create elements for stats

        // 5.5.1 - Create parent div for stats
        projectDataStats = document.createElement("div");
        projectDataStats.className = "tree stats";

        // 5.5.2 - Create span for views
        projectDataViews = document.createElement("span");
        projectDataViews.className = "tree statViews";
        projectDataViews.innerHTML = projectInfo.stats.views;

        // 5.5.3 - Create span for loves
        projectDataLoves = document.createElement("span");
        projectDataLoves.className = "tree statLoves";
        projectDataLoves.innerHTML = projectInfo.stats.loves;

        // 5.5.4 - Create span for favorites
        projectDataFavorites = document.createElement("span");
        projectDataFavorites.className = "tree statFavorites";
        projectDataFavorites.innerHTML = projectInfo.stats.favorites;

        // 5.5.5 - Create span for remixes
        projectDataRemixes = document.createElement("span");
        projectDataRemixes.className = "tree statRemixes";
        projectDataRemixes.innerHTML = projectInfo.stats.remixes;

        // 5.5.6 - Append all these elements to parent div, then that to projectData
        projectDataStats.appendChild(projectDataViews);
        projectDataStats.appendChild(projectDataRemixes);
        projectDataStats.appendChild(projectDataLoves);
        projectDataStats.appendChild(projectDataFavorites);
        projectData.appendChild(projectDataStats);

        
        // 6 - Append thumbnail and projectData to project container, and container to containing flexbox
        project.appendChild(projectData);
        project.appendChild(thumbnail);
        container.appendChild(project);

        // 7 - Create a nested flexbox for each remix shooting off from the project
        remixes = document.createElement("div");
        remixes.className = "tree remixes";

        // 8 - Append the remix flexbox to the container
        container.appendChild(remixes);

        // 9 - Find remix box of parent element
        parentElement = document.querySelector("#" + REMIX_ID_PREFIX + projectInfo.remix.parent + " > .remixes");

        // 10 - If parent element found on the page, append it to that; if not, append it to the base
        if (parentElement) {
            parentElement.appendChild(container);
        }
        else {
            remixTree.appendChild(container);
        }

        // 11 - Finally, return a reference to the container element just in case
        return container;
    }

    return null;
}

function dataError(e) {
    pageLog("An XHR error occurred with fetching data.");
}

function endJob(e) {
    xhrJobsRunning--;
    if (xhrJobsRunning < 1) {
        throbHide();
        working = false;
    }
}

// Function for when a project thumbnail is clicked
function expandProject(e) {
    // console.log(e.target);
    // console.log(e.target.attributes.value.value);
    // console.log(`.tree.thumbnail[value="${e.target.attributes.value.value}"] + .tree.projectData`)

    // query the next projectData-class sibling of the project thumbnail clicked on
    dataElement = document.querySelector(`.tree.thumbnail[value="${e.target.attributes.value.value}"] + .tree.projectData`);

    // console.log(dataElement);
    // Toggle info visibility
    if (dataElement.style.visibility == "hidden") {
        dataElement.style.visibility = "visible";
    }
    else {
        dataElement.style.visibility = "hidden";
    }
}

function throbShow(message = "") {
    loadingMessage.innerHTML = message;
    throbber.style.visibility = "visible";
}

function throbUpdate(message = "") {
    loadingMessage.innerHTML = message;
}

function throbHide() {
    document.querySelector("#throbber").style.visibility = "hidden";
}

function pageLog(message) {
    let logMessage = document.createElement("p");
    logMessage.innerHTML = message;
    output.appendChild(logMessage);
}

// Needs to be refactored
function growTestTree() {

    remixTree.innerHTML = null;
    storeProjectInfo(exampleProject);
    addProjectToTree(exampleProject.id);

    let parent = exampleRemixes.remixes[0].remix.parent;
    
    for (let currentRemix of exampleRemixes.remixes) {
        // Store info about the remix in remixInfo, and get the element the parent resides in
        throbUpdate(THROB_LOADINGPROJECT + currentRemix.title);

        storeProjectInfo(currentRemix);
        addProjectToTree(currentRemix.id);
    }
}