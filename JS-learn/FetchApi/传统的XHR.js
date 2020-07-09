
let xhr = new XMLHttpRequest();

xhr.onload = function(){
    console.log('请求成功');
}

xhr.onerror = function(err){
    console.error('请求失败');
}

xhr.open('GET','/path/to/text',true);

xhr.send();