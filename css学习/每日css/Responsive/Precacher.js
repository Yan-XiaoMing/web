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
                cacheResource(this.cacheName,this.resources)
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
}