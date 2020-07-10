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
let cacheKeyURL = new URL(resource.url,location);
cacheKeyURL.searchParams.set('precache_url_revision',resource.revision);
let cacheKey = cacheKeyURL.href;

function cacheAll(cacheName,urls){
    return caches.open(cacheName).then(cache=>{
        cache.addAll(urls)
    })
}

self.addEventListener('install',event=>{
    event.waitUntil(cacheAll(cacheName,urls))
})
