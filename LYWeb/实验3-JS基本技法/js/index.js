var arrP= document.getElementsByClassName("m-item");
// console.log(arrP);
var h1 = document.getElementsByTagName('h1')[0];
console.info(h1);
var p1 = arrP[0];

var lis = document.querySelectorAll('ul>li');
lis.forEach((e,index) => {
     e.onclick = (e)=> alert('当前元素的索引是' + index);

});

p1.addEventListener('click',()=>{
    p1.style.color = 'red';
    p1.style.background = "#FF6666";
});
var p2 = arrP[1];
p2.addEventListener('click',()=>{
    var nowDate = new Date();
    var strDate = nowDate.getFullYear() + '-' + nowDate.getMonth()+ '-'+nowDate.getDate();
    h1.innerHTML = strDate;
});
var p3 = arrP[2];
p3.addEventListener('click',(e)=>{
    e.target.parentNode.classList.add("fn-active");
    alert('增加成功,P3父节点class为: '+e.target.parentNode.classList.value);
})

var p4 = arrP[3];
p4.addEventListener('click',(e)=>{
    p8 = arrP[7];
    var parentNode = e.target.parentNode;
    parentNode.removeChild(p8);
    alert('p8被删除');
});

var p5 = arrP[4];
p5.addEventListener('click',()=>{
    alert('您即将跳转至淘宝')
    window.location.href = 'http://www.taobao.com';
})

var p6= arrP[5];
p6.addEventListener('click',(e)=>{
    var parentNode = e.target.parentNode;
    var childernList = parentNode.children;
    var exist = false;
    // console.log(childernList);
    // console.log(childernList.length);
    for(var item = 0;item<childernList.length;item++){
       if(childernList[item].textContent==='p9'){
           exist = true;
       }
    }
    if(!exist){
        var li = document.createElement('li');
        li.className = 'm-item';
        li.innerHTML = 'p9';
        parentNode.appendChild(li);
    }else{
        alert('p9已经存在!');
    }
})

