let response = new Response(body, init)

let jsResponse = new Response(
    'console.log("Hello World!")', {
        status: 200,
        headers: new Headers({
            'Content-Type': 'application/x-javascript'
        })
    }
)

if (response.ok || response.status === 0) {
    // status 为 0 或 200-299 均代表请求成功
} else {
    // 请求失败
}

let response = new Response(JSON.stringify({name:'qiming'}))
// 通过 response.json() 读取请求体
response.json().then(data=>{
    console.log(data.name);
})


let response = new Response(JSON.stringify({name:'lilei'}));
console.log(response.bodyUsed);//false
response.json().then(data=>{
    console.log(response.bodyUsed)//true
})

//clone() 是一个同步方法，克隆得到的新对象在所有方面与原对象都是相同的。
//在这里需要注意的是，如果 Response 对象的响应体已经被读取，那么在调用 clone() 方法时会报错，
//因此需要在读取响应体读取前进行克隆操作。
let clonedResponse = response.clone();