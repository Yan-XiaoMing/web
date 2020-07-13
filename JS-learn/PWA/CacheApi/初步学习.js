//判断浏览器是否支持Cache Api
if ('caches' in self) {
    console.log('环境支持 Cache Api')
}

caches.open("myCache").then(cache => {
    // cache.put(new Request('../img/cityCard_03.jpg'),new Response(JSON.stringify({code:'success'})));
    // fetch('../img/cityCard_03.jpg').then(response=>{
    //     if(response.ok){
    //         cache.put(new Request('../img/cityCard_03.jpg'),response);
    //     }
    // })
    // cache.add('../img/cityCard_03.jpg').then(()=>{})
    // cache.addAll([
    //     '../img/cityCard_03.jpg',
    //     '../img/cityCard_04.jpg'
    // ]).then(()=>{})
    // cache.match('../img/cityCard_03.jpg').then(response => {
    //     if (response == null) {
    //         //未匹配到资源
    //     } else {
    //         console.log(response);
    //     }
    // })
    // cache.matchAll('../img/cityCard_03.jpg').then(responses => {
    //     if (!responses.length) {
    //        //未匹配到资源
    //     } else {
    //         console.log(responses);
    //     }
    // })

    // cache.match('../img/cityCard_03.jpg?id=10', {ignoreSearch: true}).then(response => {
    //     if (response == null) {
    //         //未匹配到资源
    //     } else {
    //         console.log(response);
    //     }
    // })
    // cache.keys().then(requests=>{
    //     if(!requests.length){
    //         //未匹配到
    //     }
    //     else{
    //         console.log(requests)
    //     }
    // })
    cache.delete('../img/cityCard_03.jpg').then(success => {
        console.log(success)
    })
    cache.delete('/nonexistent.txt').then(success => {
        console.log(success)//false(删除失败)
    })
    cache.delete('../img/cityCard_03.jpg?id=10', {ignoreSearch: true}).then(success => {
        console.log(success)//true cityCard_03.jpg?id=10被删除
    })

});