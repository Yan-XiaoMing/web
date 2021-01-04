function respond(event, handler) {
    try {
        // 执行响应处理方法，根据返回结果进行兜底
        let res = handler(event.request)
        // 异步的响应结果兜底
        if (res instanceof Promise) {
            let promise = res.then(response => {
                    // 如果返回结果非 Response 对象，抛出错误
                    if (!(response instanceof Response)) {
                        throw Error('返回结果异常')
                    }
                    return response;
                })
                // 异步响应错误处理，即直接返回状态码为 500 Response 对象
                .catch(() => new Response('service worker 出错', {
                    status: 500
                }))
            event.respondWith(promise);
            return
        }
        if(res instanceof Response){
            event.respondWith(res);
        }

    } catch (e) {

    }
}