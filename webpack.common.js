const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
        { 
            test: /\.txt$/, 
            use: 'raw-loader'
         },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
    ],
    
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],

};