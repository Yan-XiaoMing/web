navigator.storage.estimate()
    .then(estimate=>{
        //设备为当前域名所分配的存储空间总大小
        console.log(estimate.quota)

        //当前域名已经使用了的存储空间大小
        console.log(estimate.usage);
    });