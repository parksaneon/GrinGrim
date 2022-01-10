const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  devServer: {
    port: 9000,
    liveReload: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "index.css"
    })
  ],
  mode: "development"
};
