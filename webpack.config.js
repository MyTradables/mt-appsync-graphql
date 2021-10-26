const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  devtool: 'inline-source-map',
  mode: 'production',
  target: 'node',
  optimization: {
    splitChunks: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true
        }
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    // Runs the typescript type checker seperate from the webpack build thread
    // this improves the build performance slightly.
    new ForkTsCheckerWebpackPlugin()
  ]
};
