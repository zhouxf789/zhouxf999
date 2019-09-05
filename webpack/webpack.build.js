const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const pxtorem = require('postcss-pxtorem')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const _filename = 'lyxcool-test'

module.exports = {
  entry: {
    'main': [path.join(__dirname, '..', 'src/index.js')]
  },
  externals: { 'react': 'React', 'react-dom': 'ReactDOM', 'classnames': 'classnames' },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: 'dist/',
    library: 'lyxcool-test',
    libraryTarget: 'umd',
    filename: `${_filename}.js`
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
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
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  plugins: [
    new CleanWebpackPlugin(["lib", "dist"], {
      root: path.join(__dirname, "..")
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename: `${_filename}.css`,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
