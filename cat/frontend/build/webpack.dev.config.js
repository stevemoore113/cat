"use strict";
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
module.exports = merge(baseConfig, {
    // 用於除錯, inline-source-map模式效率比較高, 所以在dev模式下推薦使用這個
    devtool: 'inline-source-map',
    mode: 'development',
    // 設定dev伺服器
    devServer: {
        // 設定埠號,預設8080
        port: 8000,
    },
    plugins: [
        // 在js中注入全域性變數process.env用來區分環境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            }
        }),
    ],
});
