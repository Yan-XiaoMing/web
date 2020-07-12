let urls = [
    '/index.html',
    '/index.js',
    '/index.css'
]

let resources = [
    //m5标识
    {
        url:'index.html',
        revision:'abc'
    },
    //通过文件版本标识
    {
        url:'/index.js',
        revision:'1.0.1'
    },
    //url直接包含标识信息
    'index.abc.css'
];

//确保资源不重名
let resource = {
    url:'/index.js',
    revision:'abc'
}

// let cacheKey = location.origin + resource.url + '?precache_url_revision='+resource.revision
// console.log(cacheKey);
//存储 拼接资源URl precache_url_reversion参数,并将其作为键值存储
let cacheKeyURL = new URL(resource.url, location)
cacheKeyURL.searchParams.set('precache_url_revision', resource.revision)
cache.put(cacheKeyURL.href, response)

//读取
if(requestURL === new URL(resource.url,location).href){
    //给资源请求URL拼接precache_url_revision参数,并作为键值查询
    let cacheKeyURL = new URL(requestURL,location)
    cacheKeyURL.searchParam.set('precache_url_revision',resource.revision);
    //查找缓存资源
    cache.match(cacheKeyURL.href).then(resonse=>{
        if(response!=null){
            //资源匹配成功
        }
    })
}

function cacheAll(cacheName,urls){
    return caches.open(cacheName).then(cache=>{
        cache.addAll(urls)
    })
}

self.addEventListener('install',event=>{
    event.waitUntil(cacheAll(cacheName,urls))
})
