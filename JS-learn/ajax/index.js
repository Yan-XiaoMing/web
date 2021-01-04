if(window.XMLHttpRequest){
    var xhr = new XMLHttpRequest()
}else{
    var xhr = new ActiveXObject()
}

xhr.open("get/post","请求地址",true)


//设置请求头
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')

//send方法发出请求，参数是发送的报文体，get方法时报文体为空null，post方法才有内容
xhr.send(null)

xhr.onreadystatechange = function(){
    //xhr.readyState有5种状态
    //(0，1，2，3，4)
    /*
         0：请求未初始化，还没有调用 open()。 
         1：请求已经建立，但是还没有发送，还没有调用 send()。 
         2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。 
         3：请求在处理中；通常响应中已有部分数据可用了，没有全部完成。 
         4：响应已完成；您可以获取并使用服务器的响应了。
    */
    if(xhr.readyState == 4){
        //响应已经完成了做些想做的事情
        console.log(xhr.responseText)   
    }
}