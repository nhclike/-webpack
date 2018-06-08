/**
 * Created by lij on 2018/6/8.
 */
var path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports={
  entry:{
    index:'./src/js/index.js',
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
    new ExtractTextPlugin("index.css"),
    new CleanWebpackPlugin(['dist'],
      {
        root:path.join(__dirname,''),
        verbose: true,
        dry: false
      }),
    new HtmlWebpackPlugin({
      filename:'index.html',
      template: "./src/index.html",//new 一个这个插件的实例，并传入相关的参数
      chunks:['index']
    }),
    new HtmlWebpackPlugin({
      filename:'cart.html',
      template: "./src/cart.html", //new 一个这个插件的实例，并传入相关的参数
      chunks:['cart']
    })
  ],
  //devtool:'#source-map'
};