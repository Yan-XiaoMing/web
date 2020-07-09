let request = new Request(input,init);

//1.GET 请求，请求参数需要写到 URL 当中
let getRequest = new Request('/api/hello?name=lilei',{
    method:'GET'
});

//2.POST 请求，请求参数需要写到 body 当中。
let postRequest = new Request('/api/hello',{
    method:'POST',
    body:JSON.stringify({
        name:'lilei'
    })
})

//3.自定义请求的 Headers 信息
let customRequest = new Request('/api/hello',{
    headers: new Headers({
        'Content-Type':'text/plain'
    })
})

//4.设置发起资源请求时带上 cookie。
let cookieRequest = new Request('/api/hell0',{
    credentials:'include'
})

if (request.url === 'https://example.com/data.txt') {
  // ...
}
if (request.method === 'POST') {
  // ...
}
if (reuqest.headers.get('Content-Type') === 'text/html') {
  // ...
}