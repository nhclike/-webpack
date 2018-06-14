/**
 * Created by lij on 2018/6/8.
 */
var path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
module.exports={
  entry:{
    vendor:['jquery','./src/js/common.js'],                 //第三方插件的打包
    index:'./src/js/index.js', //多入口打包生成多个js
    cart:'./src/js/cart.js'
  },
  output:{
    path:path.join(__dirname,'/dist'),
    filename:'js/[name].js',
    publicPath:''
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        include:path.join(__dirname,'src'),
        exclude:/node_module/,
        loader:'babel-loader'

      },
      {
        test:/\.css$/,
        include:path.join(__dirname,'src'),
        exclude:/node_module/,
        /*use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })*/   //将css作为独立的.css文件单独引入
        loader:'style-loader!css-loader'  //css直接插入到html中

      }
    ]
  },
  plugins:[
    new ExtractTextPlugin("index.css"),  //把css打包成独立的文本
    new CleanWebpackPlugin(['dist'],  //清除掉之前的打包文件，覆盖模式
      {
        root:path.join(__dirname,''),
        verbose: true,
        dry: false
      }),
    new webpack.optimize.UglifyJsPlugin(), //webpack自带压缩插件
    new webpack.optimize.CommonsChunkPlugin({
        name:'vendor',
        chunks:['index','cart','vendor'],   //需要提取的文件
        minChunks:3                          //3表示提取在3个js中都有的文件
    }),
    new HtmlWebpackPlugin({
      filename:'index.html',
      template: "./src/index.html",
      chunks:['index','vendor'],         //指定引入打包后的哪个js，不设置的话默认都会引入
      minify:{                            //html压缩设置
        removeComments:true,
        collapseWhitespace:true
      }
    }),
    new HtmlWebpackPlugin({
      filename:'cart.html',
      template: "./src/cart.html",
      chunks:['cart','vendor'],
      minify:{                            //html压缩设置
        removeComments:true,
        collapseWhitespace:true
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  //devtool:'#source-map'
};