function loadImage(file,resolve,reject){
    const image = new Image();
    image.src = file;
    image.onload = () =>{
        resolve(image);
    }
    image.onerror = ()=>{
        reject(new Error("load fail"));
    }
    document.body.appendChild(image);
}

loadImage("../img/cityCard_03.jpg",
    image=>{
        image.style.border = "5px solid red";
    },
    error=>{
        console.log(error);
    }
)