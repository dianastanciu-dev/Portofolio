let galleryImages= document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth=window.innerWidth;

if(galleryImages){
    galleryImages.forEach(function(image, index){
        image.onclick = function(){
            let getElementCss = window.getComputedStyle(image);
            let getFullImgUrl = getElementCss.getPropertyValue("background-image");
            let getImgUrlPos = getFullImgUrl.split("img/");
            //alert(getFullImgUrl);
            let setNewImgUrl = getImgUrlPos[1].replace('")', '');
            //alert(setNewImgUrl);//replace works
            getLatestOpenedImg = index + 1;

            let container = document.body;
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class" , "img-window");//works
            newImgWindow.setAttribute("onclick" , "closeImg()");//works 
            
            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src" , "img/" + setNewImgUrl);//works
            newImg.setAttribute("id" , "current-img");

            newImg.onload = function(){                 
                let imgWidth = this.width;
                let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;
                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode(">");
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)");
                newNextBtn.style.cssText = "right:" + calcImgToEdge + "px;"; // css property "right: "
    
                
                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("<");
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");
                newPrevBtn.style.cssText = "left:" + calcImgToEdge + "px;";  //  css property "left: "
            }
            
        }
                       
    });
}

function closeImg(){
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();

}

function changeImg(changeDir){

    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);
  
    let calcNewImg;

    if(changeDir === 1){
        calcNewImg = getLatestOpenedImg + 1;
        if(getLatestOpenedImg > galleryImages.length){
           calcNewImg = 1;
        }

    }


if(changeDir === 0){
    calcNewImg = getLatestOpenedImg - 1;
    if(getLatestOpenedImg < 1){
       calcNewImg = galleryImages.length;
    }
}


newImg.setAttribute("src", "img/img" + calcNewImg + ".jpg");
newImg.setAttribute("id", "current-img");

getLatestOpenedImg = calcNewImg;

}