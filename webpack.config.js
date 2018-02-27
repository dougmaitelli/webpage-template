"use strict";
var webpack = require("webpack");
var path = require("path");
var loaders = require("./webpack.loaders");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "9000";

loaders.push({
	test: /\.scss$/,
	loaders: ["style-loader", "css-loader?importLoaders=1", "sass-loader"],
	exclude: ["node_modules"]
});

module.exports = {
	entry: [
		"react-hot-loader/patch",
		"./src/index.jsx" // your app's entry point
	],
	output: {
		publicPath: "/",
		path: path.join(__dirname, "build"),
		filename: "bundle.js"
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	module: {
		rules: loaders
	},
	devServer: {
		contentBase: "./build",
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin({
			filename: "style.css",
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: "./src/template.html",
			files: {
				css: ["style.css"],
				js: ["bundle.js"]
			}
		})
	]
};
