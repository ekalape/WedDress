const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebPackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 5501,

    }
}

module.exports = ({ develop }) => ({
    mode: develop ? "development" : "production",
    devtool: develop ? "inline-source-map" : false,
    entry: './src/ts/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        assetModuleFilename: "assets/[name][ext]"
    },
    module: {
        rules: [{
                test: /\.[tj]s$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
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
        new HtmlWebpackPlugin({ title: "Wedding dress shop", template: "./src/wDress-card.html" }),

        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })
    ],

    ...devServer(develop)

});