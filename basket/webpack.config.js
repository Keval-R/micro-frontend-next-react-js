const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    cache: false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:3002/',
        filename: '[name].bundle.js',
    },
    devServer: {
        port: 3002,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        hot: true,
        liveReload: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'reactApp',
            filename: 'remoteEntry.js',
            exposes: {
                './CartPage': './src/CartPage',
            },
            remotes: {
                host: "host@http://localhost:3000/_next/static/chunks/remoteEntry.js",
            },
            shared: ['react', 'react-dom', "react-redux", "@reduxjs/toolkit"],
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    mode: 'development',
};
