const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  output: {//打包输出路径，出口
    filename: 'bundle.js',//指定输出文件名字
    path: path.resolve(__dirname, './dist'),//文件的输出路径，只能是绝对路径
    clean: true, //清理掉上次生成残留文件
    //方法1 资源放置位置
    assetModuleFilename: 'images/[contenthash][ext]'//资源模块文件名，还可以设置路径，webpack提供：[contenthash]表示根据文件内容来生成一个hash字符串，[ext]扩展名使用源资源的扩展名
  },
  devServer: {
    static: './dist', //dist 作为根目录
  },
  mode: 'development', //模式
  // mode: 'production', //production模式下cssMinimizerWebpackPlugin进行css代码压缩
  devtool: 'inline-source-map',//改变打包的js的格式
  plugins: [ //插件
    new HtmlWebpackPlugin({
      template: './index.html',//生成的html模板是来自当前目录下的index.html
      filename: 'index.html',//生成的html模板的名字
      inject: 'body',//script标签嵌入的位置
    }),
    new miniCssExtractPlugin({
      filename: 'styles/[contenthash].css' //将css 单独抽出来放在一个文件夹下
    })
  ],

  module: {//模块
    rules: [//规则
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {//方法2资源放置位置 优先级更高 
          filename: 'images1/[contenthash][ext]'//资源模块文件名，还可以设置路径，webpack提供：[contenthash]表示根据文件内容来生成一个hash字符串，[ext]扩展名使用源资源的扩展名
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
      {
        test: /\.jpeg$/,
        type: 'asset',//默认资源文件大于8k,使用asset/resource；小于8k,使用asset/inline
        parser: { //解析器
          dataUrlCondition: { //临界值条件
            maxSize: 4 * 1024 * 1024 //4*1024默认值
          }
        }
      },
      // {
      /* 这个含义是告诉webpack,当碰到require或者import去解析一个.txt的文件的时候，
      在对这个文件打包前，先使用raw-loader先转化一下
      */
      // test: /\.txt$/,//识别那些文件被转换
      // use: 'raw-loader',//定义转化的时候应该使用哪个loader来进行转化
      // },
      {
        // style-loader 在html中样式放在style里面,css-loader解析css
        // 执行顺序，从后往前'less-loader'___'css-loader'___'style-loader'
        // miniCssExtractPlugin.loader 抽离css作为一个单独的文件
        test: /\.(css|less)$/,
        // use: ['style-loader', 'css-loader', 'less-loader'],
        use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      // {
      //   test: /\.(css|less)$/,
      //   use: ['style-loader', 'css-loader', 'less-loader'],
      // }
      // 加载font字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      // 加载cvs|tsv数据,转成一个js数组
      {
        test: /\.(cvs|tsv)$/,
        use: ['csv-loader']
      },
      // 加载xml数据,转成一个js对象
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      // 对Js语法转化
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-runtime'] // 用来兼容async/await 的语法
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new cssMinimizerWebpackPlugin() //压缩css代码
    ]
  }
}
/*
  webpack 自带js加载模块，那为哈还需要Babel-loader呢？
  自带的只能做js模块化的打包，不能转化js里面的代码，比如es6转es5，当浏览器版本较低时，可能不兼容es6的语法，发生报错，所以写代码需要
  一个转化工具，就是Babel
*/




/*
loader 定义有2个重要的属性
在module rules 下面定义一个test，识别哪些文件被转化，定义一个use,在定义转化的时候应该使用哪个loader来进行转化
// 在对引入的.txt文件打包之前先用raw-loader先转化一下
module:{
  rules:[{
    test:/\.txt$/,   //识别哪些文件被转化
    use:'raw-loader'  //在定义转化的时候应该使用哪个loader来进行转化
  }]
}

*/

