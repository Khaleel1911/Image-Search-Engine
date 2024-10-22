const closeBtn=document.getElementById("close-btn");
const popupimgcontainer=document.querySelector(".popup-img-container");
const morebtn=document.getElementById("more-btn");
const searchbtn=document.getElementById("search-btn");
const imagesWrapper=document.querySelector(".images");
const popup=document.querySelector(".popup");
const Accesskey="f6lVk3iNUluNhhmoNZ7VR-tZaiMAhzjnQsMaPyfpHrQ";
const perpage=15;
let page=1;
let searchkey="animal";
let imglink="";
let URL=`https://api.unsplash.com/search/photos?client_id=${Accesskey}&page=${page}&per_page=${perpage}&query=${searchkey}`;

closeBtn.onclick=function(){
    // console.log("im close");
    popup.classList.remove("show");
}

const generateHTML=(images)=>{
   imagesWrapper.innerHTML+= images.map(img=>
        `<li class="card" onclick="showpopup('${img.urls.regular}')"><img src="${img.urls.regular}" alt="img"></li>`
    ).join("");
}

function showpopup(img){
    popupimgcontainer.innerHTML=`<img src="${img}" alt="img">`;
    popup.classList.add("show");
    imglink=img;
    
}

 //   to view the photo in full screen mode. made to implement the download functionlaity later....
    document
      .getElementById("download-btn")
      .addEventListener("click", function () {
        const link = document.createElement("a");

        link.href = `${imglink}`;

        link.download = "img.jpg";
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      });


const getImages = (apiURL)=>{
    fetch(apiURL).then(res=>res.json()).then(data=>{
        console.log(data)
        generateHTML(data.results);
    })
}


morebtn.addEventListener("click",()=>{
    page++;
    let URL=`https://api.unsplash.com/search/photos?client_id=${Accesskey}&page=${page}&per_page=${perpage}&query=${searchkey}`;
    getImages(URL);
});

searchbtn.addEventListener("click",()=>{
    imagesWrapper.innerHTML="";
    searchkey=document.getElementById("search-keyword").value;
    if(searchkey===""){
        searchkey="nature";
    }
    let URL=`https://api.unsplash.com/search/photos?client_id=${Accesskey}&page=${page}&per_page=${perpage}&query=${searchkey}`;
    getImages(URL);
});


document.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        imagesWrapper.innerHTML="";
    searchkey=document.getElementById("search-keyword").value;
    if(searchkey===""){
        searchkey="nature";
    }
    let URL=`https://api.unsplash.com/search/photos?client_id=${Accesskey}&page=${page}&per_page=${perpage}&query=${searchkey}`;
    getImages(URL);
    }
})
getImages(URL);



           