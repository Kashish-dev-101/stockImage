'use strict';

const searchText = document.querySelector("#search-input");
const searchBtn = document.querySelector("#generate-btn");
const imgContainer = document.querySelector("#image-container");
const baseURL = "https://api.unsplash.com/";


// fucntion to fetch the Image using API and append that to the HTML
const searchImage = async()=>{
    imgContainer.innerHTML = '';
    const searchString= searchText.value;
    console.log(searchString);
    const imageData = await fetch(`https://api.unsplash.com/search/photos?query=${searchText.value.trim()}&client_id=qEJS3_uc9Y5N_fd5ia0YQxM3hkwg7PrjfSphgZ3aJvo`)
    console.log(imageData);
    const response = await imageData.json();
    console.log(response);
    //console.log(response.results[0].urls.full);
    for (let pics of response.results){
           console.log(pics.urls.thumb);
           const img = document.createElement("img");
           img.src = pics.urls.thumb; // or .regular
          //img.alt = photo.alt_description || "Image"
          imgContainer.append(img);
    }
   


}

// Event listner for SearchButton
searchBtn.addEventListener("click",searchImage);


