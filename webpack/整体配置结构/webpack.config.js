const path = require("path");

module.exports = {
  // entry 表示 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
  // 类型可以是 string | object | array
  entry: "./app/entry", //只有1个入口,入口只有一个文件
  entry: ["./app/entry1", "./app/entry2"], //只有1个入口,入口2个文件
  entry: {
    //有2个入口
    a: "./app/entry-a",
    b: ["./app/entry-b1", "./app/entry-b2"],
  },

  // 如何输出结果：在 Webpack 经过一系列处理后，如何输出最终想要的代码。
  output: {
    //输出文件存放的路径,必须为string绝对路径
    path: path.resolve(__dirname, "dist"),

    //输出文件的名称,
    filename: "bundle.js", //完整名称
    filename: "[name].js", //当配置了多个entry
    filename: "[chunkhash].js", //根据文件内容hash值生成文件名称,用于浏览器长时间缓存文件

    //发布到线上的所有自愿的URL前缀,string类型
    publicPath: "/assets/", //放到指定的目录下
    publicPath: "", //放到根目录下
    publicPath: "https://cdn.yqmwyy.club/", //放到CDN上

    //导出库的名称 string类型
    //不填它的时候 默认输出格式是匿名的立即执行函数
    library: "MyLibrary",

    //导出库的类型  枚举类型 默认为var
    //可以是umd | umd2 | commonjs2 | commonjs | amd | this | var | assign | window | global | jsonp
    libraryTarget: "umd",

    //是否包含有用的文件路径信息到生成的代码里去,boolean类型
    pathinfo: true,

    //附加的Chunk的文件名称
    chunkFilename: "[id].js",
    chunkFilename: "[chunkhash].js",

    //JSONP异步加载资源时的回调函数名称,需要和服务端搭配使用
    jsonpFunction: "myWebpackJsonp",

    //生成的Source Map文件名称
    sourceMapFilename: "[file].map",

    //浏览器开发者工具里显示的源码模块名称
    devtoolModuleFilenameTemplate: "webpack:///[resource-path]",

    //异步加载跨域的资源时使用的方式
    crossOriginLoading: "use-credentials",
    crossOriginLoading: "anonymous",
    crossOriginLoading: false,
  },

  //配置模块相关
  module: {
    rules: [
      //配置loader
      {
        test: /\.jsx?$/, //正则匹配命中要使用Loader的文件
        include: [
          //只会命中这里面的文件
          path.resolve(__dirname, "app"),
        ],
        exclude: [
          // 忽略这里面的文件
          path.resolve(__dirname, "app/demo-files"),
        ],
        use: [
          //使用哪些loader,有先后次序,从后往前执行
          "style-loader", //直接使用loader的名称
          {
            loader: "css-loader",
            options: {
              //给loader传些参数
            },
          },
        ],
      },
    ],
  },
  plugins: [],

  //配置寻找模块的规则
  resolve: {
    modules: [
      //寻找模块的根目录,array类型,默认以node_modules为根目录
      "node_modules",
      path.resolve(__dirname, "app"),
    ],
    extensions: [".js", ".json", ".jsx", ".css"], //模块的后缀名
    alias: {
      //模块别名配置,用于映射模块
      //把 'module' 映射 'new-module',同样的'module/path/file'也会被映射成'new-module/path/file'
      module: "new-module",
      //使用结尾符号 $ 后,把'only-module' 映射成 'new-module',
      //但是不像上面的,'module/path/file'不会被映射成 'new-module/path/file'
      "only-module$": "new-module",
    },
    alias: [
      // alias 还支持使用数组来更详细的配置
      {
        name: "module", //老的模块
        alias: "new-module", //新的模块
        //是否是只映射模块,如果是true只有'module'会被映射,如果是false 'module/inner/path' 也会被映射
        onlyModule: true,
      },
    ],
    symlinks: true, // 是否跟随文件软链接去搜寻模块的路径
    descriptionFiles: ["package.json"], // 模块的描述文件
    mainFields: ["main"], // 模块的描述文件里的描述入口的文件的字段名称
    enforceExtension: false, // 是否强制导入语句必须要写明文件后缀
  },
  //输出文件性能检查配置
  performance: {
    hints: "warning", // 有性能问题时输出警告
    hints: "error", // 有性能问题时输出错误
    hints: false, // 关闭性能检查
    maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
    maxEntrypointSize: 400000, // 最大入口文件大小 (单位 bytes)
    assetFilter: function (assetFilename) {
      // 过滤要检查的文件
      return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
    },
  },

  devtool: "source-map", //配置source-map
  context: __dirname, //Webpack使用的根目录,string类型必须为绝对路径,
  //配置输出代码的运行环境
  target: "web", //浏览器默认
  target: "webworker", //WebWorker
  target: "node", //node使用`require`语句加载Chunk
  target: "async-node", //node异步加载Chunk
  target: "node-webkit", //nw.js
  target: "electron-main", //electron主线程
  target: "clectron-renderer", //electron 渲染线程
  externals: {
    //使用来自JavaScript运行环境提供的全局变量
    jquery: "jQuery",
  },
  stats: {
    //控制台输出日志控制
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },
  devServer: {
    //DevsServer相关的配置
    proxy: {
      //代理到后端服务接口
      "/api": "http://localhost:3000",
    },
    contentBase: path.join(__dirname, "public"), // 配置 DevServer HTTP 服务器的文件根目录
    compress: true, //是否开启gzip压缩
    historyApiFallback: true, //是否开发HTML5 History API 网页
    hot: true, //开启模块热替换功能
    https: false, //是否开启HTTPS模式
    profile: true, // 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳

    cache: false, // 是否启用缓存提升构建速度

    watch: true, // 是否开始
    watchOptions: {
      // 监听模式选项
      // 不监听的文件或文件夹，支持正则匹配。默认为空
      ignored: /node_modules/,
      // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
      // 默认为300ms
      aggregateTimeout: 300,
      // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每隔1000毫秒询问一次
      poll: 1000,
    },
  },
};
