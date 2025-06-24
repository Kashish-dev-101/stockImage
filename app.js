'use strict';

const searchtext = document.querySelector("#search-input");
console.log(searchtext);

const searchBtn = document.querySelector("#generate-btn");
console.log(searchBtn);

const imgSection = document.querySelector("#image-container");
console.log(imgSection);

const baseURL = "https://api.unsplash.com/";


searchBtn.addEventListener("click", async()=>{
    const searchTextValue = searchtext.value.trim();
    console.log(searchTextValue);

    searchtext.value = "";

    const imageSearchData = await fetch(`https://api.unsplash.com/search/photos?query=${searchTextValue}&per_page=12&client_id=qEJS3_uc9Y5N_fd5ia0YQxM3hkwg7PrjfSphgZ3aJvo`)
 
    const imageSearchResponse = await imageSearchData.json();
    console.log(imageSearchResponse);

    imgSection.innerHTML = "";

    for (let imageData of imageSearchResponse.results){
        console.log(imageData);
        console.log(imageData.urls.regular);
        const imgCard = document.createElement("div");
        const imgEle = document.createElement("img");
        imgSection.append(imgCard );
        imgCard.append(imgEle);
        imgEle.src = imageData.urls.regular;
    }

})



document.addEventListener("DOMContentLoaded", async()=>{
     const randomImagedata = await fetch(`${baseURL}/photos/random?count=12&client_id=qEJS3_uc9Y5N_fd5ia0YQxM3hkwg7PrjfSphgZ3aJvo`);
     console.log(randomImagedata);

     const randomImageResponse = await randomImagedata.json();
     console.log(randomImageResponse);

     for (let imageData of randomImageResponse){
        console.log(imageData);
        console.log(imageData.urls.regular);
        const imgCard = document.createElement("div");
        const imgEle = document.createElement("img");
        imgSection.append(imgCard );
        imgCard.append(imgEle);
        imgEle.src = imageData.urls.regular;
     }


})


