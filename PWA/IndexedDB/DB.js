class DB{
    constructor({dbName='db',version=1,storeName}){
        this.dbName = dbName;
        this.storeName = storeName;
        this.version = version;
    }

    async getDB(){
        //优先返回缓存的数据库实例
        if(this.db){
            return this.db;
        }
        //打开数据库
        let request = indexedDB.open(this.dbName,this.version);

        request.onupgradeneeded = e =>{
            let db = e.target.result
            //当仓库不存在时建立仓库并设置对应的索引
            if(!db.objectStoreName.contains(this.storeName)){
                db.createObjectStore(this.storeName,{keyPath:'key'})
            }
        }

        let event = await promisify(request);
        this.db = event.target.result;
        return this.db;
    }

    async setItem(key,value){
        //获取数据库
        let db = await this.getDB()
        //创建事务,指定使用到的仓库名称以及读写权限
        let transaction = db.transaction([this.storeName],'readwrite')
        //获取仓库实例
        let objectStore = transaction.objectStore(this.storeName);
        //将Key和value包装成对象{key,value}并存入仓库
        let request = objectStore.put({key,value})
        //异步执行结果通过Promise返回
        return promisify(request)
    }

    async getItem(key){
        //获取数据库实例
        let db = await this.getDB();
        //创建事务,并制定仓库名以及相应的读写权限
        let transaction = db.transaction([this.storeName],'readonly')
        //获取仓库实例
        let objectStore = transaction.objectStore(this.storeName);
        //查找对应的数据并通过Promise对象包装后返回
        let request = objectStore.get(key);
        let event = await promisify(request)
        return event.target.result && event.target.result.value
    }

    async getAll(){
        let db = await this.getDB();
        let transaction = db.transaction([this.storeName],'readonly');
        let objectStore = transaction.objectStore(this.storeName)
        let request = objectStore.getAll()
        let event = await promisify(request)
        let result = event.target.result;
        if(!result||!result.length){
            return
        }

        let map = new Map()
        for(let {key,value} of result){
            map.set(key,value)
        }
        return map;
    }
    async removeItem(key){
        let db = await this.getDB();
        let transaction = db.transaction([this.storeName],'readwrite')
        let objectStore = transaction.onjectStore(this.storeName)
        // 删除数据
        let request = objectStore.delete(key);
        let event = await promisify(request);
        return event;
    }
}

function promisify(request){
    return new Promise((resolve,reject)=>{
        request.onsuccess = resolve;
        request.onerror = reject;
    })
}

const db = new DB({storeName:'test'});
db.setItem('number',1).then(()=>{console.log('写入成功!')})
db.setItem('/path/to/data',{status:0,dara:'Hello World'})
    .then(()=>{console.log('写入成功!')})
db.getItem('number').then(value=>console.log(value))
db.getItem('/path/to/data').then(value=>console.log(value))
db.getAll().then(map=>console.log(map))