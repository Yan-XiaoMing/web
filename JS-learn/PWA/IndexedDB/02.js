//IndexedDB 增删改查

let request = window.indexedDB.open('mydb',1);
request.onsuccess = (e)=>{
    let db = e.target.result;
    let transaction = db.transaction(
        ['myObjectStore'],
        'readonly'
    )
    let objectStore = transaction.objectStore('myObjectStore')
    let objectRequest = objectStore.get('111');
    objectRequest.onsuccess = e=>{
        let object = e.taiget.result
    }
}

//增
let request = window.indexedDB.open('mydb',2);
request.onupgradeneeded = e=>{
    let db = e.target.result;
    let transaction = db.transaction(
        ['myObjectStore'],
        'readwrite'
    )
    let objectStore = transaction.objectStore('myObjectStore');

    //objectStore.add() 方法，传入一个 object
    //object 有限制，它的主键值，也就是 id 值，不能是已存在的，如果 objectStore 中已经有了这个 id，那么会报错。
    //因此，在某些程序中为了避免这种情况的发生，通常会使用 objectStore.put() 方法。
    objectStore.add({
        id:'112',
        name:'yan ming'
    })
}

/*
objectStore.put() 方法和 objectStore.add() 方法大不相同。
如果 objectStore 中已经有了该id，则表示更新这个object，如果没有，则添加这个 object。
在另一种情况下，也就是设置了 autoIncrement 为 true 的时候，也就是主键自增的时候，objectStore.put() 方法必须传第二个参数，第二个参数是主键的值，以此来确定你要更新的是哪一个主键对应的 object，如果不传的话，可能会直接增加一个 object 到数据库中。从这一点上讲，自增字段确实比较难把握，因此我建议开发者严格自己在传入时保证 object 中存在主键值。
*/
let request = window.indexedDB.open('mydb',3)
request.onupgradeneeded = e=>{
    let db = e.target.result
    let transaction = db.transaction(
        ['myObjectStore'],
        'readwrite'
    )
    let objectStore = tarnsaction.objectStore('myObjectStore')
    //更新
    objectStore.put({
        id:'113',
        name:'yan mi'
    })
}

//删除数据
let request = window.indexedDB.open('mydb',4)
request.onupgradeneeded = e =>{
    let db = e.target.result;
    let transaction =db.transaction(
        ['myObjectStore'],
        'readwrite'
    )
    let objectStore = transaction.objectStore('myObjectStore');
    objectStore.delete('113');
}