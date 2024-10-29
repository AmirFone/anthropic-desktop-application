// webpack.config.js
const path = require('path');
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin'); // Import the plugin

module.exports = {
  mode: 'development', // or 'production' as needed
  entry: './renderer/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'renderer/public/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  devtool: 'source-map', // Helps with debugging
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
    fallback: {
      util: require.resolve('util/'), // Place fallback here
      // Add other fallbacks as needed
    },
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      safe: false,
      systemvars: true,
    }),
    new NodePolyfillPlugin(), // Use this plugin to handle polyfills
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'renderer/public'),
    },
    port: 3000,
    hot: true,
  },
  target: 'web', // Ensure target is 'web' for browser environment
};