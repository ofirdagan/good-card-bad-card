const path = require('path');
const webpack = require('webpack');

const config = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.local\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.global\.css$/,
        use: [
          'file-loader',
          'extract-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
          {
            loader: "extract-loader",
          },
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src", "link:href"],
              interpolate: true,
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['module:@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins:[
  ]
};

const goodCardConfig = Object.assign({}, config, {
  entry: ['./src/client/index.html', './src/client/good-card.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'good-card')
  },
});

const badCardConfig = Object.assign({}, config, {
  entry: ['./src/client/index.html', './src/client/bad-card.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bad-card')
  },
});

module.exports = [goodCardConfig, badCardConfig];
