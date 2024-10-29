// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
  mode: 'development',
  entry: './renderer/src/index.jsx', // Ensure this path is correct
  output: {
    path: path.resolve(__dirname, 'renderer/public/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'renderer/src/components/'),
      '@assets': path.resolve(__dirname, 'assets/'),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'renderer/public'),
    },
    port: 3000,
    hot: true,
  },
  target: 'electron-renderer',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
};