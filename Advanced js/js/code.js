let request = new XMLHttpRequest();
let url = "https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=AEPvIWsTwogkG1DQDfzWSu5voSsXRrSJQwt3gDcn"

request.open("GET", url, true);
request.send();

request.addEventListener("load", function(){

    if(request.status == 200 && request.readyState == 4) { //status 200 is a succesful request, state 4 means the operation is complete
        var response = JSON.parse(request.responseText);

        console.log(response);
        
        let index = response.latest_photos.length - 1;

        let img = response.latest_photos[index].img_src;

        document.getElementById("img").setAttribute("src", img);
    }
});