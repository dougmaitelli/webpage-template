"use strict";

const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_, argv) => ({
  entry: "./src/index.tsx",
  output: {
    clean: true,
    filename: argv.mode === "production" ? "[name].[contenthash].js" : "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "styles"),
    },
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: "source-map-loader",
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                silenceDeprecations: ["color-functions", "global-builtin", "if-function", "import"],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        test: /\.(eot|gif|jpe?g|png|svg|ttf|woff2?)$/i,
        resourceQuery: { not: [/raw/] },
        type: "asset/resource",
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    static: false,
  },
  optimization: {
    minimizer: [
      "...",
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ["default", { svgo: false }],
        },
      }),
    ],
  },
  performance: false,
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new HtmlWebpackPlugin({ template: "./src/template.html" }),
  ],
});
