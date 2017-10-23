'use strict';

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const theme = require('./src/theme.js');

module.exports = {

    entry: path.resolve(__dirname, 'src/index.js'),

    output: {
        path: path.resolve(__dirname, '../dist/frontend'),
        filename: 'bundle_[hash:8].js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: [ 'babel-loader' ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            browsers: 'last 2 version'
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: theme
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|eot|ttf|svg)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]_[hash:8].[ext]'   
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                exclude: [/node_modules/],
                use: [ 'html-loader' ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html'
        })
    ]

};
