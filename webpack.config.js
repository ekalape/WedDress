const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebPackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ghpages = require('gh-pages');
const CopyPlugin = require("copy-webpack-plugin");


const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 5501,
        static: './',

    }
}

module.exports = ({ develop }) => ({
    mode: develop ? "development" : "production",
    devtool: develop ? "inline-source-map" : false,

    ...devServer(develop),
    entry: '/src/structure/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        assetModuleFilename: "assets/[name][ext]",
        //publicPath: "assets/"
    },
    module: {
        rules: [{
                test: /\.[tj]s$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg|json)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({ title: "Wedding dress shop", template: "./src/ind.html" }),

        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
        new CopyPlugin({
            patterns: [{
                    from: "./src/assets",
                    to: "assets"
                },

            ]
        })
    ],


});