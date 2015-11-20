import path from 'path';
import webpack from 'webpack';

const port = 3000;
const entry = [
  `webpack-dev-server/client?http://localhost:${port}`,
  'webpack/hot/only-dev-server'
];

export default {
  devtool: 'eval-cheap-module-source-map',
  entry: {
    background: [ path.join(__dirname, '../src/browser/extension/background/index'), ...entry ],
    window: [ path.join(__dirname, '../src/browser/window/index'), ...entry ],
    popup: [ path.join(__dirname, '../src/browser/extension/popup/index'), ...entry ],
    inject: [ path.join(__dirname, '../src/browser/extension/inject/index'), ...entry ]
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: `http://localhost:${port}/js/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {app: path.join(__dirname, '../src/app')},
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/
    }, {
      test: /\.css?$/,
      loaders: ['style', 'raw']
    }]
  }
};