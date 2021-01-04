console.log('service worker 注册成功');

self.addEventListener('install', (e) => {
    //    e.waitUntil(new Promise((resolve,reject)=>{
    //     //  reject('安装失败')  
    //      resolve('安装成功')
    //    }))

    self.skipWaiting();
    e.waitUntil(new Promise((resolve, reject) => {
        resolve('安装成功')
        console.log('service worker 安装成功')
    }))

})

self.addEventListener('activate', () => {
    console.log('service worker 激活成功')
})

self.addEventListener('fetch', event => {
    // if(event.request.url === 'http://127.0.0.1:5501/css%E5%AD%A6%E4%B9%A0/%E6%AF%8F%E6%97%A5css/Responsive/img/cL.png'){
    //     event.respondWith(new Response('Hello World'));
    // }
    // let url = new URL(event.request.url);
    // console.log(url);
    // 匹配 POST 请求
    // if (event.request.method === 'POST') {
    //     // 匹配成功
    //   }

    //   // 匹配 text/html 资源类型请求
    //   if (event.request.headers.get('Content-Type') === 'text/html') {
    //     // 匹配成功
    //   }
    console.log('service worker 抓取请求成功: ' + event.request.url);

    //通过 fetch 事件回调参数的方法 event.respondWith(r) 可以指定资源请求的响应结果。respondWith(r) 方法的参数 r 可以是一个 Response 对象实例，也可以是一个 Promise 对象，这个 Promise 对象在异步执行完成的时候同样需要 resolve 返回一个 Response 对象实例作为请求的响应结果。下面演示的两种请求响应方式都是可行的：

    // // 直接返回 Response 对象
    // event.respondWith(new Response('Hello World!'))

    // // 等待 1 秒钟之后异步返回 Response 对象
    // event.respondWith(new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve(new Response('Hello World!'))
    //     }, 1000)
    // }))
})


// 错误用法
self.addEventListener('fetch', event => {
    if (event.request.url === 'http://127.0.0.1:8080/data.txt') {
      setTimeout(() => {
        event.respondWith(new Response('Hello World!'))
      }, 1000)
    }
  })


self.addEventListener('fetch',event=>{
    if(event.request.url === 'http://127.0.0.1:8080/data.txt'){
        event.respondWith(new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(new Response('hello world'))
            },1000);
        }))
        //错误: promise 返回结果不是一个Response对象
        event.respondWith('hello world!');
        event.respondWith(Promise.resolve());
        event.respondWith(Promise.resolve('hello world'));

        //错误:存在未处理的溢出错误
        event.respondWith(Promise.reject(new Response('hello wordl')));
    }
})