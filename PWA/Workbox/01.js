importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// workbox.core.cacheNames.precache 和 workbox.core.cacheNames.runtime 获取当前定义的预缓存和动态缓存名称。
//用 workbox.core.setCacheNameDetails 方法去修改这些默认名称
workbox.core.setCacheNameDetails({
    prefix:'app',
    suffix:'v1',
    precache:'precache',
    runtime:'runtime'
})

console.log(workbox.core.cacheNames.precache)

console.log(workbox.core.cacheNames.runtime)

//workbox预缓存
workbox.routing.precacheAndRoute([
    {
        url:"/index.html",
        revision:'asdf'
    },
    '/index.abc.js',
    '/index.bcd.css'
])

//Workbox路由
workbox.routing.registerRoute(match,handlerCb);
//路由匹配规则:match
//1.对于URL字符串进行匹配，如果是相对路径，Workbox 首先会以当前网页的 URL 为基准进行补全再进行字符串匹配。
workbox.routing.registerRoute('http://127.0.0.1:9009/index.css',handlerCb)
//2.对资源URL进行正则匹配
workbox.routing.registerRoute(/\/index\.css$/,handlerCb)
//3.自定义路由匹配方法
const match = ({url,event}) =>{
    return url.pathname === '/index.html'
}
//其中 url 是 URL 类的实例，event 是 fetch 事件的回调参数。url 可通过对 URL 类进行实例化，从 event.request.url 转换得到：
let url = new URL(event.request.url)


//资源请求处理方法
//handlerCb 是对匹配到的资源请求进行处理的方法，开发者可以在这里决定如何响应请求，无论是从网络、从本地缓存还是在 Service Worker 中直接生成都是可以的

//url：event.request.url 经 URL 类实例化的对象；
//event：fetch 事件回调参数；
//params：自定义路由匹配方法所返回的值。

const handlerCb = ({url,event,params})=>{
    return Promise.resolve(new Response('123'))
}

//Workbox缓存策略
/*
缓存优先策略:
    NetworkFirst：网络优先
    CacheFirst：缓存优先
    NetworkOnly：仅使用正常的网络请求
    CacheOnly：仅使用缓存中的资源
    StaleWhileRevalidate：从缓存中读取资源的同时发送网络请求更新本地缓存
*/ 
workbox.routing.registerRoute(/\/api/,new workbox.strategies.NetworkFirst());

/*
缓存配置策略:
    cacheName：指定当前策略进行资源缓存的名称；
    plugins：指定当前策略所使用的插件列表；
对于需要使用 Fetch API 来发送网络请求的策略将会多出以下配置项：
    fetchOptions：作为 Fetch API 的第二个参数传给当前策略中所有使用到的 Fetch API;
对于需要使用 Cache API 操作本地缓存的策略将多出以下配置项:
    matchOptions：作为 Cache 对象所提供的查找方法 match 的第二个参数透传给当前策略中所有使用到 cache.match 的地方。    
*/

//指定资源缓存名称
workbox.routing.registerRoute(
    /\.(jpe?g|png)/,
    new workbox.strategies.CacheFirst({
        cacheNames:'image-runtime-cache'
    })
)
//添加插件
workbox.routing.registerRoute(
    /\.(jpe?g|png)/,
    new workbox.strategies.CacheFirst({
        plugins:[
            new workbox.expiration.Plugin({
                //对图片资源缓存1周
                maxAgeSeconds:7*24*60*60,
                //匹配改策略的图片最多缓存10张
                maxEntries:10
            })
        ]
    })
)

//配置fetchOptions
//对于跨域请求的图片资源，可以通过fetchOptions将策略中的Fetch API的请求模式设置为了cors:
workbox.routing.registerRoute(
    /^https:\/\/third-party-site\.com\/.*\.(jpe?g|png)/,
    new workbox.strategies.CacheFirst({
      fetchOptions: {
        mode: 'cors'
      }
    })   
)

//配置matchOptions
//假设图片资源缓存的存取需要忽略请求 URL 的 search 参数，可以通过设置 matchOptions 来实现
workbox.routing.registerRoute(
    /\.(jpe?g|png)/,
    new workbox.strategies.CacheFirst({
        matchOptions:{
            ignoreSearch:true
        }
    })
)

//基于Workbox改造Service Worker
//预缓存
workbox.precaching.precacheAndRoute([
    {
        url:'/index.html',
        revision:'5ed70e0c237b4c66'
    },
    '/index.f123dasd.js',
    '/index.123asjkfdloop091293.css'
])
//动态缓存
workbox.routing.registerRoute(
    /\/article.json&/,
    new workbox.strategies.StaleWhileRevalidate()
)
workbox.routing.registerRoute(
    /\/statistics\.json$/,
    new workbox.strategies.NetworkOnly()
)