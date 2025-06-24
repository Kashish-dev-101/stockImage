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

    const imageSearchData = await fetch(`https://api.unsplash.com/search/photos?query=${searchTextValue}&per_page=20&client_id=qEJS3_uc9Y5N_fd5ia0YQxM3hkwg7PrjfSphgZ3aJvo`)

 
    const imageSearchResponse = await imageSearchData.json();
    console.log(imageSearchResponse);

    imgSection.innerHTML = "";

    for (let photo of imageSearchResponse.results){
        console.log(photo);
        console.log(photo.urls.regular);

        const imgCard = document.createElement("div");
        imgCard.classList.add("image-card");

        const imgEle = document.createElement("img");
        imgEle.src = photo.urls.regular;
        imgEle.alt = photo.alt_description || "Unsplash image";

        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        // photographer 

        const photographer = document.createElement("div");
        photographer.classList.add("photographer");


        // Download Button 

        const downloadBtn = document.createElement("button");
        downloadBtn.classList.add("download-btn");
        downloadBtn.textContent = "⬇️";

        downloadBtn.addEventListener("click", async()=>{
            //await fetch(`${photo.links.download_location}?client_id=qEJS3_uc9Y5N_fd5ia0YQxM3hkwg7PrjfSphgZ3aJvo`);
            window.open(photo.links.download, "_blank");  
        });

        overlay.append(photographer);
        overlay.append(downloadBtn);

        imgCard.append(overlay);
        imgCard.append(imgEle);
        imgSection.append(imgCard );
        
        
    }

})



document.addEventListener("DOMContentLoaded", async()=>{
     const randomImagedata = await fetch(`${baseURL}/photos/random?count=50&client_id=qEJS3_uc9Y5N_fd5ia0YQxM3hkwg7PrjfSphgZ3aJvo`);
     console.log(randomImagedata);

     const randomImageResponse = await randomImagedata.json();
     console.log(randomImageResponse);

     for (let imageData of randomImageResponse){
        console.log(imageData);
        console.log(imageData.urls.regular);


        const imgCard = document.createElement("div");
        imgCard.classList.add("image-card");

        const imgEle = document.createElement("img");
        imgEle.src = imageData.urls.regular;


        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        // photographer 

        const photographer = document.createElement("div");
        photographer.classList.add("photographer");


        // Download Button 

        const downloadBtn = document.createElement("button");
        downloadBtn.classList.add("download-btn");
        downloadBtn.textContent = "⬇️";

        downloadBtn.addEventListener("click", async()=>{
            //await fetch(`${photo.links.download_location}?client_id=qEJS3_uc9Y5N_fd5ia0YQxM3hkwg7PrjfSphgZ3aJvo`);
            window.open(imageData.links.download, "_blank");  
        });
        
        overlay.append(photographer);
        overlay.append(downloadBtn);

        imgCard.append(overlay);
        imgCard.append(imgEle);
        imgSection.append(imgCard );
        
       
        
     }


})


const categoryBar = document.querySelectorAll(".category");
console.log(categoryBar);

for (let category of categoryBar){
    console.log(category);
    category.addEventListener("click", async()=>{
    
    const categoryText = category.innerText.trim();
      
    const categoryImageData = await fetch(`https://api.unsplash.com/search/photos?query=${categoryText}&per_page=20&client_id=qEJS3_uc9Y5N_fd5ia0YQxM3hkwg7PrjfSphgZ3aJvo`);

    const imageCategoryResponse = await categoryImageData.json();
    console.log(imageCategoryResponse);

    imgSection.innerHTML = "";

    for (let photo of imageCategoryResponse.results){
        console.log(photo);
        console.log(photo.urls.regular);

        const imgCard = document.createElement("div");
        imgCard.classList.add("image-card");

        const imgEle = document.createElement("img");
        imgEle.src = photo.urls.regular;
        imgEle.alt = photo.alt_description || "Unsplash image";

        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        // photographer 

        const photographer = document.createElement("div");
        photographer.classList.add("photographer");


        // Download Button 

        const downloadBtn = document.createElement("button");
        downloadBtn.classList.add("download-btn");
        downloadBtn.textContent = "⬇️";

        downloadBtn.addEventListener("click", async()=>{
            //await fetch(`${photo.links.download_location}?client_id=qEJS3_uc9Y5N_fd5ia0YQxM3hkwg7PrjfSphgZ3aJvo`);
            window.open(photo.links.download, "_blank");  
        });

        overlay.append(photographer);
        overlay.append(downloadBtn);

        imgCard.append(overlay);
        imgCard.append(imgEle);
        imgSection.append(imgCard );
        
        
    }

    })
}



