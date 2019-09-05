const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  entry: {
    'main': [
      "react-hot-loader/patch",
      path.join(__dirname, '..', 'example/index.js')
    ]
  },
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, '..', 'example'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { modules: false }], 'react', 'stage-0'],
            cacheDirectory: true,
            "plugins": [
              "react-hot-loader/babel",
              "transform-runtime",
              'transform-class-properties',
              'transform-object-rest-spread',
              ["import", [{ "libraryName": "antd-mobile", "style": "css" }, { "libraryName": "lyxcool-test", "style": true }]]
            ],
            // babelrc: false
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9'
                  ]
                }),
                pxtorem({
                  rootValue: 124.2,
                  propWhiteList: []
                })
              ]
            }
          },
          'less-loader',
        ]
      },
      {
        test: /\.(jp[e]?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    alias: {
      "lyxcool-test": path.join(__dirname, '..')
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
      "lyxcool-test": "lyxcool-test",
      Promise: 'es6-promise-promise'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      __RUNENV__: JSON.stringify('local') || JSON.stringify('development'),
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
