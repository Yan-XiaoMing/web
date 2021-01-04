function eat(name){
    console.log(name+'吃');
}
function wash(name,callback){
    console.log(name+'洗')
    callback(name);
}
// wash('我',eat);

function fun (num){
    console.log(num);
}

async function asyncTest(){
     fun(1);
    wash('我',eat);
    await fun(2);
}
asyncTest()