var googleMap = {
    show:function(){
        console.log('开始渲染google地图');
    }
}

var baiduMap = {
    show:function(){
        console.log('开始渲染百度地图');
    }
}

//设计模式弹性脆弱
/*
var renderMap = function(){
    if(type === 'google'){
        googleMap.show();
    }
    else if(type === 'baidu'){
        baiduMap.show();
    }
}
*/

var renderMap = function(map){
    if(map.show instanceof Function){
        map.show();
    }
}

renderMap(googleMap);
renderMap(baiduMap);

var sosoMap = {
    show:function(){
        console.log('开始渲染搜搜地图');
    }
}

renderMap(sosoMap);

