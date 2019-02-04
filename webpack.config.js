"use strict";

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");

let loaders = [
	{
		test: /\.tsx?$/,
		exclude: /(node_modules|bower_components|public\/)/,
		loader: "awesome-typescript-loader"
	},
	{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
	{
		test: /\.css$/,
		loaders: [
			"style-loader", 
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1,
				},
			},
			'postcss-loader'
		],
		exclude: [path.join(__dirname + "node_modules")]
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
			use: [
				{
					loader: MiniCssExtractPlugin.loader
				},
				{
					loader: "css-loader",
					options: {
						sourceMap: true
					}
				},
				'postcss-loader',
				{
					loader: "sass-loader",
					options: {
						sourceMap: true
					}
				}
			],
			exclude: [path.join(__dirname + "node_modules")]
		});
	} else {
		loaders.push({
			test: /\.scss$/,
			loaders: [
				"style-loader",
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1
					},
				},
				'postcss-loader',
				"sass-loader"],
			exclude: [path.join(__dirname + "node_modules")]
		});
	}

	return {
		entry: {
			"app.bundle": "./src/index.tsx",
			vendor: ['react', 'react-dom']
		},
		output: {
			publicPath: "/",
			path: path.join(__dirname, "dist"),
			filename: argv.mode === "production" ? "[name].[hash].js" : "[name].js"
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".json"],
			plugins: [
				new TsConfigPathsPlugin()
			]
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
		optimization: {
			minimizer: [
			  new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			  }),
			  new OptimizeCSSAssetsPlugin({})
			]
		  },
		plugins: [
			new WebpackCleanupPlugin(),
			new MiniCssExtractPlugin({
				publicPath: "/",
				filename: "[name].[contenthash].css"
			}),
			new HtmlWebpackPlugin({
				template: "./src/template.html"
			})
		]
	};
};
