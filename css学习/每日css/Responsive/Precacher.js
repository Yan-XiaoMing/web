//预缓存资源加载

class Precacher{
    constructor({
        cacheName = 'precache',
        searchKey = 'precache_url_revision'
    } = {}){
        this.cacheName = cacheName
        this.searchKey = searchKey
        //存储资源信息的列表
        this.resources =[]
        //初始化事件监听
        this.initEventListener()
    }

    initEventListener(){
        //在install事件回调执行预缓存资源加载
        self.addEventListener('install',event=>{
            event.waitUntil(
                clearOldResources(this.cacheName,this.resources)
            )
        })

        //添加activate事件监听清理旧资源
        self.addEventListener('activate')
    }

    precache(resources){
        for(let resource of resources){
            //格式化资源信息
            let res = formatResource(this.searchKey,resource)
            this.resources.push(res)
        }
    }

    addRoute(){
        if(this.hasAdded){
            return 
        }
        this.hasAdded = true;

        const cacheFirstHandler = cacheFirst({
            cacheName:this.cacheName
        })

        const router = new Router()
        router.registerRoute(
            request =>{
                return this.resources.some(
                    resource=>resource.url === request.url
                )
            },
            request=>{
                for(let resource of this.resources){
                    if(resource.url === request.url){
                        return cacheFirstHandler(new Request(resource.cacheKey))
                    }
                }
            }
        )
    }
    // 将 precache() 和 addRoute() 合成一个方法
    precacheAndRoute(resources){
        this.precache(resources);
        this.addRoute()
    }
}

async function clearOldResources(cacheName,resources){
    let urls = resources.map(resource=>resource.cacheKey);
    let cache = await caches.open(cacheName);
    //获取已存储的所有资源键值信息
    let requests = await cache.keys()
    //找出新增的url 
    //获取已存储的资源的URl
    let cachedURLs = requests.map(request=>request.url)
    //找到不在资源信息列表当中的URL
    let oldURLs = cachedURLs.filter(url=>!urls.includes(url))
    
    await Promise.all(oldURLs.map(url=>cache.delete(url)));
}

let precacher = new Precacher()
precacher.precacheAndRoute([
    {
        url:'index.html',
        revision:'abc'
    },
    {
        url:'index,js',
        revision:'1.0.1'
    },
    'index.abc.css'
])