let kfc = new Promise((resolve, reject) => {
    console.log("kfc start");
    resolve("我是kfc,请来取餐");
});

let dad = kfc.then(msg => {
    console.log(`收到了kfc的消息: ${msg}`);
    return {
        then(resolve) {
            setTimeout(() => {
                setTimeout(() => {
                    resolve("我己经吃了2s了,不辣可以吃了")
                }, 2000);
            })
        }
    };
});

let son = dad.then(msg => {
    return new Promise((resolve, reject) => {
        console.log(`收到dad消息: ${msg}`);
        setTimeout(() => {
            resolve("妈妈我吃了2s,吃完了")
        }, 2000)
    })
})

let mom = son.then(msg => {
    console.log(`妈妈收到儿子消息: ${msg}`);
})

// console.log(
//     new Promise((resolve, reject) => {})
// ); //Promise {<pending>}
// console.log(
//     new Promise((resolve, reject) => {
//         resolve("fulfilled");
//     })
// ); //Promise {<resolved>: "fulfilled"}

// console.log(
//     new Promise((resolve, reject) => {
//         reject("rejected");
//     })
// ); //Promise {<rejected>: "rejected"}