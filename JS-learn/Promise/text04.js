let promise = new Promise((resolve,reject)=>{
    console.log(1);
    resolve(2);
}).then(msg=>{
    console.log(msg);
})

console.log(3);

setTimeout(function (){
    console.log(4);
},0)