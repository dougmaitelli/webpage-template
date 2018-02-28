"use strict";
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackCleanupPlugin = require("webpack-cleanup-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

let loaders = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components|public\/)/,
		loader: "babel-loader"
	},
	{
		test: /\.css$/,
		loaders: ["style-loader", "css-loader?importLoaders=1"],
		exclude: ["node_modules"]
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "file-loader"
	},
	{
		test: /\.(woff|woff2)$/,
		exclude: /(node_modules|bower_components)/,
		loader: "file-loader?prefix=font/&limit=5000"
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "file-loader?limit=10000&mimetype=application/octet-stream"
	},
	{
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "file-loader?limit=10000&mimetype=image/svg+xml"
	},
	{
		test: /\.gif/,
		exclude: /(node_modules|bower_components)/,
		loader: "file-loader?limit=10000&mimetype=image/gif"
	},
	{
		test: /\.jpg/,
		exclude: /(node_modules|bower_components)/,
		loader: "file-loader?limit=10000&mimetype=image/jpg"
	},
	{
		test: /\.png/,
		exclude: /(node_modules|bower_components)/,
		loader: "file-loader?limit=10000&mimetype=image/png"
	}
];

module.exports = (env, argv) => {
	if (argv.mode === "production") {
		loaders.push({
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [
					{
						loader: "css-loader",
						options: {
							minimize: true,
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			}),
			exclude: ["node_modules"]
		});
	} else {
		loaders.push({
			test: /\.scss$/,
			loaders: ["style-loader", "css-loader?importLoaders=1", "sass-loader"],
			exclude: ["node_modules"]
		});
	}

	return {
		entry: {
			"app.bundle": "./src/index.jsx"
		},
		output: {
			publicPath: "/",
			path: path.join(__dirname, "dist"),
			filename: argv.mode === "production" ? "[name].[hash].js" : "[name].js"
		},
		resolve: {
			extensions: [".js", ".jsx"]
		},
		module: {
			rules: loaders
		},
		devServer: {
			// embed the webpack-dev-server runtime into the bundle
			inline: true,
			// serve index.html in place of 404 responses to allow HTML5 history
			historyApiFallback: true
		},
		plugins: [
			new WebpackCleanupPlugin(),
			new ExtractTextPlugin({
				publicPath: "/",
				filename: "[name].[contenthash].css"
			}),
			new HtmlWebpackPlugin({
				template: "./src/template.html"
			})
		]
	};
};
