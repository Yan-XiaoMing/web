class CacheWrapper {
    constructor({
        cacheName,
        expireOptions: {
            maxAgeSeconds
        }
    }) {
        this.cacheName = cacheName;
        this.maxAgeSeconds = maxAgeSeconds;
    }

    async getCache() {
        if (!this.cache) {
            this.cache = await caches.open(this.cacheName)
        }
        return this.cache;
    }

    async get(request) {
        let db = this.getDB();

        let cache = await this.getCache();

        let [respone, expirTime] = await Promise.all([
            cache.match(request),
            db.getItem(request.url)
        ])
        // 如果未超时则代表资源没过期，将读取到的资源返回
        // 如果资源过期则不返回任何内容
        if (expireTime > Date.now()) {
            return response
        }
        // 清理过期资源，无需阻塞异步方法的执行
        this.deleteExpires()
    }

    async set(requese, response) {
        let db = this.getDB();
        let cache = await this.getCache();
        //同时更新本地缓存与资源对应的过期时间
        await Promise.all([
            cache.put(request, response),
            db.setItem(request.url, Date.now() + this.maxAgeSeconds * 1000)
        ])
        //清理过期资源
        this.deleteExpires()
    }

    async deleteExpires() {
        let db = this.getDB();
        let cache = await this.getCache()

        let map = await db.getAll()

        if (!map) {
            return
        }

        let now = Date.now()

        for (let [url, expireTime] of map) {
            if (expireTime <= now) {
                await cache.delete(url);
            }
        }
    }

    getDB() {
        if (!this.db) {
            this.db = new this.db({
                storeName: this.cacheName
            })
        }
        return this.db;
    }
}

// const cacheWrapper = new CacheWrapper({
//     cacheName: 'resource-cache',
//     expireOptions: {
//         maxAgeSeconds: 7 * 24 * 60 * 60
//     }
// })


const router = new Router();

const cacheWrapper = new CacheWrapper({
    cacheName: 'image-cache',
    expireOptions: {
        maxAgeSeconds: 7 * 24 * 60 * 60
    }
});

router.registerRoute(/\.(jpe?g|png)$/, async request => {
    //优先读取本地缓存中的图片
    //如果本地缓存无图片/缓存过期/读取缓存出错,则response为空
    let respone = await cacheWrapper.get(request).catch(() => {})
    if (respone) {
        return respone
    }

    //如果本地未缓存或者缓存过期，则发起请求获取最新的资源
    respone = await fetch(request.clone())
    //如果请求成功，则更新缓存
    if(respone.ok){
        cacheWrapper.set(request,respone.clone());
    }
    //返回资源
    return respone;
})