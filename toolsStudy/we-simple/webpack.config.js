const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: "development", //加上这一句试试
    devtool: 'eval-source-map', // 生成Source Maps（使调试更容易）通过简单的配置，webpack就可以在打包时为我们生成的source maps，这为我们提供了一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。
    entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
      path: __dirname + "/public",//打包后的文件存放的地方
      filename: "bundle.js"//打包后输出文件的文件名
    },
    devServer: {
      contentBase: "./public",//本地服务器所加载的页面所在的目录
      historyApiFallback: true,//不跳转
      inline: true//实时刷新
    },
    output: {
      path: __dirname + "/build",
      filename: "bundle-[hash].js"
    },
    performance: {
      hints:false   
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    module: {
      rules: [
          {
              test: /(\.jsx|\.js)$/,
              use: {
                  loader: "babel-loader"
              },
              exclude: /node_modules/
          }
      ]
  },
  module: {
    rules: [
        {
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }
            ]
        }
    ]
  },
  module: {
    rules: [
        {
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        modules: true, // 指定启用css modules
                        localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                    }
                }
            ]
        }
    ]
},
module: {
  rules: [
      {
          test: /(\.jsx|\.js)$/,
          use: {
              loader: "babel-loader"
          },
          exclude: /node_modules/
      },
      {
          test: /\.css$/,
          use: [
              {
                  loader: "style-loader"
              }, {
                  loader: "css-loader",
                  options: {
                      modules: true
                  }
              }, {
                  loader: "postcss-loader"
              }
          ]
      }
  ]
},
plugins: [
  new webpack.BannerPlugin('版权所有，翻版必究'),
  new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
  }),

  new webpack.HotModuleReplacementPlugin(),//热加载插件

  new webpack.optimize.OccurrenceOrderPlugin(), // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
  // new webpack.optimize.UglifyJsPlugin(), // 压缩JS代码；webpack4.x下，压缩代码不在webpack.config.js中写plugins: [ new webpack.optimize.UglifyJsPlugin() ],而是在package.json中的script下面写：
  new ExtractTextPlugin("style.css") //分离CSS和JS文件
],
};







