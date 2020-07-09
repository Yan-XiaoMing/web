fetch('/path/to/text',{method:'GET'})
    .then(response=>{
        console.log('请求成功')
    })
    .catch(err=>{
        console.error('请求失败');
    })