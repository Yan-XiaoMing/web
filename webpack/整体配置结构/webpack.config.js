const path = require('path')

module.exports = {
    // entry 表示 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
    // 类型可以是 string | object | array 
    entry: './app/entry',//只有1个入口,入口只有一个文件
    entry: ['./app/entry1','./app/entry2'],//只有1个入口,入口2个文件
    entry:{//有2个入口
        a:'./app/entry-a',
        b: ['./app/entry-b1','./app/entry-b2']
    },

    // 如何输出结果：在 Webpack 经过一系列处理后，如何输出最终想要的代码。
    output:{
        //输出文件存放的路径,必须为string绝对路径
        path: path.resolve(__dirname,'dist'),

        //输出文件的名称,
        filename:'bundle.js',//完整名称
        filename: '[name].js',//当配置了多个entry
        filename: '[chunkhash].js',//根据文件内容hash值生成文件名称,用于浏览器长时间缓存文件
        
        //发布到线上的所有自愿的URL前缀,string类型
        publicPath: '/assets/',//放到指定的目录下
        publicPath:'',//放到根目录下
        publicPath:'https://cdn.yqmwyy.club/',//放到CDN上
        
        //导出库的名称 string类型
        //不填它的时候 默认输出格式是匿名的立即执行函数
        library:'MyLibrary',

        //导出库的类型  枚举类型 默认为var
        //可以是umd | umd2 | commonjs2 | commonjs | amd | this | var | assign | window | global | jsonp
        libraryTarget:'umd',

        //是否包含有用的文件路径信息到生成的代码里去,boolean类型
        pathinfo:true,

        //附加的Chunk的文件名称
        chunkFilename:'[id].js',
        chunkFilename:'[chunkhash].js',

        //JSONP异步加载资源时的回调函数名称,需要和服务端搭配使用
        jsonpFunction:'myWebpackJsonp',

        //生成的Source Map文件名称
        sourceMapFilename:'[file].map',

        //浏览器开发者工具里显示的源码模块名称
        devtoolModuleFilenameTemplate:'webpack:///[resource-path]',

        //异步加载跨域的资源时使用的方式
        crossOriginLoading:'use-credentials',
        crossOriginLoading:'anonymous',
        crossOriginLoading:false,
    },

    //配置模块相关
    module:{
        
    }
}