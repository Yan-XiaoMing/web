function match(rule, request) {
    switch (Object.prototype.toString.call(rule)) {
        // url 文本匹配
        case '[object String]':
            // 使用 URL() 将匹配规则传入的路径补全
            return request.url === new URL(rule, location).href

            // url 正则匹配
        case '[object RegExp]':
            return request.url.match(rule)

            // 支持自定义匹配
        case '[object Function]':
            return rule(request)
    }
}

// // 完整版 URL 匹配
// match('http://127.0.0.1:8080/data.txt', event.request)

// // 相对路径 URL 匹配
// //
// // 假设当前页面网址为 http://127.0.0.1:8080/index.html
// // 那么 /data.txt 会自动补全为 http://127.0.0.1:8080/data.txt
// match('/data.txt', event.request)

// // 正则匹配
// match(/\/data\.txt/, event.request)

// // 自定义匹配方法
// match(
//   request => request.url.indexOf('/data.txt') > 0,
//   event.request
// )