var temp = 0;
window.onload = function(){
    waterfall('main','box');
   
    window.onscroll = function(){
        
        if(checkscrollside){
            var dataInt = {data:[]};
            for(let i = 0;i<=4;i++){
                if(temp>97){
                    temp = 0;
                }
                    dataInt.data.push({src:temp +'.jpg'})
                    if(dataInt.data.length>6){
                        dataInt.data.shift();
                    }
                    console.log(temp);
                    temp++;
            } 
            var oParent = document.getElementById('main');
            for(let i =0;i<dataInt.data.length;i++){
                var oBox=document.createElement('div');
                oBox.className='box';              
                oParent.appendChild(oBox);     

                var oPic=document.createElement('div'); 
                oPic.className='pic';  
                oBox.appendChild(oPic);

                var oImg=document.createElement('img');
                oImg.src='./images/'+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main','box');
        }
    }
}

function waterfall(parent,box){
    //将main下所有box元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent,box); 
    //计算整个页面显示的列数(页面宽/box的宽)
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
    oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
    var hArr = [];
    for(var i = 0;i<oBoxs.length;i++){
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight);
        }else{
           
            var minH = Math.min.apply(null,hArr);
            var index = getMinhIndex(hArr,minH);
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH+'px';
            // oBoxs[i].style.left = oBoxW*index+'px';
            oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
            hArr[index]+=oBoxs[i].offsetHeight;
            
        }
    }
}

//根据class获取元素
function getByClass(parent,clsName){
    var boxArr = [];//存储所有class为box的元素
    var oElements = parent.getElementsByTagName('*');
    for(var i = 0;i<oElements.length;i++){
        if(oElements[i].className === clsName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

function getMinhIndex(arr,val){
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}
//检测是否具备重新加载数据库的条件
function checkscrollside(){
    var oParent=document.getElementById('main');
    var aPin=getByClass(oParent,'box');
    var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
    var documentH=document.documentElement.clientHeight;//页面高度
    return (lastPinH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}