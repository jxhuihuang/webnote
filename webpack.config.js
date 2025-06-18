var path = require("path");
var glob = require("glob");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanPlugin = require("clean-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var webpack = require("webpack");
const { type } = require("os");

//webpack --config 文件名.js -w        /*执行另一个配置文件*/
/*  babel-preset-stage-0  没有--save的模块*/
var config = {
  entry: {
    index: "./index.js",
  },
  output: {
    path: "./build/",
    filename: "js/[name].js?v=[hash]", //js/[name].[chunkhash].js
    chunkFilename: "[id].js?v=[hash]",
  },
  devServer: {
    port: 9090,
    host: "127.0.0.1", ////默认lolaohost，也可0.0.0.0，这样同一网段的主机都能通过ip访问
    // open:true,     //build自动打开浏览器
    // compress:true,  //浏览器请求静态资源时压缩一下，打开浏览器的检查时可以看到bundle.js的content-encoding是gzip，浏览器自动解压
    // proxy: {             // 配置代理，防止跨域问题
    //     '/api': {
    //         target: 'https://api.github.com', // http://localhost:8080/api/users -> https://api.github.com/api/users
    //         pathRewrite: {                    // http://localhost:8080/api/users -> https://api.github.com/users
    //             '^/api': ''
    //         },
    //         // 不能使用 localhost:8080 作为请求 GitHub 的主机名
    //         changeOrigin: true
    //     }
    // }
    // contentBase: path.join(__dirname, 'dist'), //# 告诉服务器从哪里提供内容   //path.resolve(__dirname,'dist'),// 指定静态资源路径的根目录，需要对应output:path为dist，
    hot: true, //# 是否热部署，
    type: ''
  },
  module: {
    loaders: [
      // { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
        modules: false,
      },

      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader",
      },
      {
        test: /\.js$/,
        loader: "babel",
        query: { presets: ["es2015", "stage-0", "react"] },
        options: {
          plugins: [
            "react-hot-loader/babel",
            "add-module-exports",
            "transform-runtime",

            // [require.resolve('babel-plugin-import'), { libraryName: 'antd', style: 'css' }]
            [
              "import",
              {
                libraryName: "antd",
                libraryDirectory: "es",
                style: true, // `style: true` 会加载 less 文件
              },
            ], // import less,  // import less
          ],
        },
        exclude: /node_modules/,
      },
      { test: /\.(png|jpg)$/, loader: "url-loader?limit=8192" },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanPlugin(["./build/*"]),
    new CopyWebpackPlugin([
      // {from: './images', to: 'images'},
      // {from: './fonts', to: 'fonts'},
      // {from: './css', to: 'css'}
    ]),
    // 公共CSS名字和路径
    new ExtractTextPlugin("css/[name].css?v=[hash]"), // "css/[name].[chunkhash].css"
    // 把公共文件提取出来
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, "./node_modules")) === 0
        );
      },
    }),
    // new webpack.DefinePlugin(env.stringified),
    // new webpack.DefinePlugin({
    //   "process.env": {
    //     NODE_ENV: JSON.stringify("production"),
    //   },
    // }),

    /*压缩*/
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true, //输出文件不debugger
        drop_console: false, //输出文件不console
      },
    }),

    // new webpack.ProvidePlugin({// 全局依赖jQuery,不需要import了
    //     $: "jquery",
    //     jQuery: "jquery",
    //     "window.jQuery": "jquery"
    // })
  ],
  // 跨域请求
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  // }
};

module.exports = config;

var pages = Object.keys(getEntry("./*.html"));
//生成HTML模板
pages.forEach(function (pathname) {
  var conf = {
    filename: pathname + ".html", //生成的html存放路径,相对于path
    template: "./public/" + pathname + ".html", //html模板路径
    inject: true, //允许插件修改哪些内容,包括head与body
    hash: false, //是否添加hash值
    minify: {
      //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true, //删除空白符与换行符
    },
    chunksSortMode: "dependency",
    chunks: [pathname, "vendor"],
  };

  config.plugins.push(new HtmlWebpackPlugin(conf));
});

//按文件名来获取入口文件(即需要生成的模板文件数量)
function getEntry(globPath) {
  var files = glob.sync("./public/" + globPath);
  var entries = {},
    entry,
    dirname,
    basename,
    pathname,
    extname;
  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    pathname = pathname.replace(/public\\/, "");
    entries[pathname] = entry;
  }
  return entries;
}
