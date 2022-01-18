import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebPackPlugin from 'copy-webpack-plugin';
import path from 'path';

const __dirname = path.resolve();

export default {
  entry: ['regenerator-runtime', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'main.js',
    assetModuleFilename: 'img/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  devServer: {
    port: 9000,
    compress: true,
    liveReload: true,
    historyApiFallback: true,
    proxy: {
      '/drawings': 'http://localhost:8000',
      '/images': 'http://localhost:8000',
      '/category': 'http://localhost:8000',
      '/auth': 'http://localhost:8000'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new CopyWebPackPlugin({
      patterns: [{ from: './src/img', to: 'img' }]
    })
  ],
  mode: 'development'
};
