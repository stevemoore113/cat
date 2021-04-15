const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('./utils');

module.exports = {
  entry: resolve('app/main.js'),
  output: {
    path: resolve('dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // 只編譯app資料夾下的檔案
        include: resolve('app'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          }
        }
      },
    ]
  },
  resolve: {
    // 設定路徑別名
    alias: {
      '@': resolve('app'),
    },
    // 檔案字尾自動補全, 就是你import檔案的時候如果沒寫字尾名就會優先找下面這幾個
    extensions: ['.js', '.jsx'],
  },
  // 第三方依賴，可以寫在這裡，不打包
  externals: {},
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('template/app.html')
    })
  ]
}