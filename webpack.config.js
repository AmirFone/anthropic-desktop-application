const path = require('path');

module.exports = {
  mode: 'development',
  entry: './renderer/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'renderer/public/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'renderer/src/components/'),
      '@assets': path.resolve(__dirname, 'assets/')
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'renderer/public'),
    },
    port: 3000,
    hot: true
  },
  target: 'electron-renderer'
}