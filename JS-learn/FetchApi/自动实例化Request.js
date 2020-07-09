fetch(new Request ('/path/to/resourse',{method:'GET'}));
//等价于
fetch('/path/to/resource',{method:'GET'});

fetch('/path/to/resource').then(respone=>{
    if(respone.status === 200){
        //请求成功
    }
    else{
        //请求失败
    }
})
.catch(err=>{
    //网络中断或请求失败
})