let promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('');
        console.log('setTimeout');
    },0);
    console.log("promise");
}).then(value=>{
    console.log("value");
})

console.log("写在最后不一定在最后");
