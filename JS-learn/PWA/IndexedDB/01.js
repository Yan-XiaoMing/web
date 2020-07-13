// 如果有 mydb 这个数据库，就直接打开
// 如果没有，就会创建 mydb 数据库
//indexedDB.open() 方法有两个参数，第一个参数为数据库名，第二个参数为数据库版本。
let request = window.indexedDB.open('mydb',1);

request.onsuccess = (e)=>{
    //IndexedDB 数据库的事件回调中都会在事件对象中带有数据库容器对象，
   // 可以通过 event.target.result 获取，
   //在这个例子中是在 IndexedDB 数据库打开或者创建成功后通过 
   //onsuccess 事件回调获取到了数据库容器。
    let db = e.target.result
}


//一个对象中不能够有同名的objectStore,如果再次创建相同名的objectStore，就会报错

result.onupgradeneeded = (e)=>{
    let db = e.target.result;
    db.createObjectStore('mystore',{keyPath:'id'})
}

//而且一旦一个objectStore被创建以后，name和keyPath不能被修改
let request = window.indexedDB.open('mydb',1);
request.onupgradeneeded = (e)=>{
    let db = e.target.result;
    let objectStore;
    if(!db.objectStoreNames.contains('mystore')){
        objectStore = db.createObjectStore('mystore',{keyPath:'id'})
    }
    else{
        objectStore = e.target.transaction.objectStore('mystore');
    }
}
//keyPath规定需要把object属性作为检索的入口
// {
//     id:1,
//     name:'yan'
// }
// {
//     id:2,
//     name:'qi'
// }

let request = window.indexedDB.open('mydb',3);
request.onupgradeneeded = (e)=>{
    let db = e.target.result;
    let objectStore;
    if(!db.objectStoreNames.contains('mystore')){
        objectStore =db.createObjectStore('mystore',{keyPath:1})
    }
    else{
        objectStore = e.target.transaction.objectStore('mystore')
    }
    objectStore.createIndex('id','id',{unique:true});
}

//objectStore 本身的信息是不能修改的，例如 name 和 keyPath 都是不能修改的，
//但是它所拥有的索引可以被修改。
//所谓修改--先删除掉原来的同名索引，然后添加新的索引
let request = window.indexedDB.open('mydb',4)
request.onupgradeneeded = (e)=>{
    
    //从事务中获取已经存在的objectStore
    let objectStore = e.target.transaction.objectStore('mystore');
    let indexNames = objectStore.indexNames;

    //先删除对应的索引
    if(indexNames.includes('name')){
        objectStore.deleteIndex('name')
    }

    //创建一个同名的索引
    objectStore.createIndex('name','name',{unique:false});
}

//db.transaction() 方法有两个参数：
// objectStores：事务打算对哪些 objectStore 进行操作，因此是一个数组
// mode：对进行操作的 objectStore 的模式，即读写权限控制，readonly | readwrite
let request = window.indexedDB.open('mydb',5)
request.onsuccess = (e)=>{
    let db = e.target.result;
    let transation = db.transaction(
        ['myObjectStore'],
        'readonly'
    )
    let objectStore =transation.objectStore('myObjectStore');
    let objectRequest = objectStore.get('111')
    objectRequest.onsuccess = (e)=>{
        let object = e.target.result;
    }
}

//游标
//获取一个 objectStore 中的全部 object 
//IndexedDB 没有直接提供类似的方法来获取。但是可以利用游标来解决
let request = window.indexedDB.open('mydb',10);
request.onsuccess = (e)=>{
    let db = e.target.result
    let transaction = db.transaction(
      ['myObjectStore'],
      'readonly'
    );
    let objectStore = transaction.objectStore('myObjectStore');
    //打开一个游标
    //objectStore.openCursor() 方法打开游标机制，该方法返回一个 Request 对象，
    //在这个 Request 对象的 onsuccess 回调中，
    //如果 cursor 没有遍历完所有 object，
    //那么通过执行 cursor.continue() 来让游标滑动到下一个 object，
    //onsucess 回调会被再次触发。
    //而如果所有的 object 都遍历完了，cursor 变量会是 undefined。
    let cursorRequest = objectStore.openCursor();//cursor 光标、游标
    
    //results 变量，它的声明必须放在 onsuccess 回调函数的外部，因为该回调函数会在遍历过程中反复执行。
    let results = [];
    cursorRequest.onsuccess = (e)=>{
        let cursor = e.target.result;
        if(cursor){
            results.push(cursor.value)
            cursor.continue()
        }else{
            console.log(results);
        }
    }
}

//主键范围
// IDBKeyRange 对象定义索引的范围。
//upperBound()、lowerBound()、bound() 、only()
function searchItems(lower,upper){
    if(lower===''&&upper===''){
        return
    }

    let range
    if(lower !== '' && upper !== ''){
        range = IDBKeyRange.bound(lower,upper)
    }
    else if(lower===''){
        range = IDBKeyRange.upperBound(upper)
    }
    else if(upper === ''){
        range = IDBKeyRange.lowerBound(lower)
    }
}

let request = window.indexedDB.open('mydb',11)
request.onsuccess = (e)=>{
    let db = e.target.result;
    let transaction = db.transaction(
        ['myObjectStore'],
        'readonly'
    )
    let store = transaction.objectStore('myobjectStore')
    let index = stroe.index('price')
    //索引打开带有主键集合的游标
    let cusorRequest = index.openCursor(range)
    let results = [];
    cusorRequest.onsuccess = (e)=>{
        let cursor = e.target.result;
        if(cursor){
            console.log('游标的位置在:',cursor.key)
            results.push(cursor.value)
            cursor.continue()
        }
        else{
            console.log(results);
        }
    }
}