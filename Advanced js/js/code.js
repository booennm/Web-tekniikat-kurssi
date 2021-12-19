document.getElementById("curiosity").addEventListener("click", viewImages("curiosity"));
document.getElementById("perseverance").addEventListener("click", viewImages("perseverance"));

let currentView = 0;

let curiosityCams = ["", "fhaz", "rhaz", "mast", "chemcam", "mahli", "mardi", "navcam", "pancam", "minites"];
let perseveranceCams = ["", "edl_rucam", "edl_rdcam", "edl_ddcam", "edl_pucam1", "navcam_left", "navcam_right", "mcz_right", "mcz_left", "front_hazcam_left_a", "front_hazcam_right_a", "rear_hazcam_left", "rear_hazcam_right", "skycam", "sherlock_watson"];

/**
 * Prints an interface for viewing the most recent images from Mars rover photos API
 * @param {string} roverName name of the chosen rover in all lowercase letters
 */
function viewImages(roverName) {

    let backButton = document.createElement("span");
    backButton.innerHTML = "<i class='fas fa-long-arrow-alt-left'></i> go back to picking a rover";
    backButton.addEventListener("click", window.location.reload());

    document.body.insertBefore(backButton, document.body.firstChild());

    document.querySelector(".selection").classList.remove(".selection");
    document.querySelector("h2").remove();

    let headerName = roverName.charAt(0).toUpperCase() + roverName.slice(1);
    document.querySelector("h1").textContent = headerName;

    if(roverName == "curiosity") {
        getImage(roverName, curiosityCams[currentView]);
    }else if(roverName == "perseverance") {
        getImage(roverName, perseveranceCams[currentView]);
    }
}

/**
 * Prints the most recent image and its information
 * @param {string} rover name of the rover 
 * @param {string} cam name of the camera, if an empty string searches from all the cameras
 */
function getImage(rover, cam) {

    let request = new XMLHttpRequest();
    let url = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/latest_photos?&api_key=AEPvIWsTwogkG1DQDfzWSu5voSsXRrSJQwt3gDcn"

    if(cam != "") {
        url += "&camera=" + cam;
    }

    request.open("GET", url, true);
    request.send();

    let img = "";
    let date = "";
    let name = "";

    request.addEventListener("load", function(){

        if(request.status == 200 && request.readyState == 4) { //status 200 is a succesful request, state 4 means the operation is complete
            var response = JSON.parse(request.responseText);

            console.log(response);
            
            let index = response.latest_photos.length - 1;
            let entry = response.latest_photos[index];

            img = entry.img_src;
            date = entry.earth_date;
            name = entry.camera.full_name;
        }
    });

    //print cameras name
    let camNameElement = document.querySelector("h2");

    if(!camNameElement) {
        let camNameElement = document.createElement("h2");

        if(currentView == 0) {
            camNameElement.textContent = "Most recent image";
        }else {
            camNameElement.textContent = name;
        }

        document.querySelector(".header").appendChild(camNameElement);
    }else {

        if(currentView == 0) {
            camNameElement.textContent = "Most recent image";
        }else {
            camNameElement.textContent = name;
        }
    }
    
    //check for image div
    let imgDiv = document.getElementById("img");

    if(!imgDiv) {
        let imgDiv = document.createElement("div");
        imgDiv.setAttribute("id", "img");

        //make icons
        let leftArrow = document.createElement("i");
        leftArrow.classList.add("fas fa-chevron-left fa-2x");
        let leftSpan = document.createElement("span");
        leftSpan.setAttribute("id", "previous");

        if(rover = "curiosity") {
            if(currentView == 0) {
                leftSpan.textContent = curiosityCams[curiosityCams.length-1];
            }else {
                leftSpan.textContent = curiosityCams[currentView-1];
            }
        }else if(rover = "perseverance") {
            if(currentView == 0) {
                leftSpan.textContent = perseveranceCams[perseveranceCams.length-1];
            }else {
                leftSpan.textContent = perseveranceCams[currentView-1];
            }
        }

        let rightArrow = document.createElement("i");

        let imgElement = document.createElement("img");
    }

    //print image
    let imgElement = document.querySelector("img");

    if(!imgElement) {
        let imgElement = document.createElement("img")
    }
    document.querySelector("img").setAttribute("src", img);
}