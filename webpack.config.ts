import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve("__dirname", 'dist'),
    filename: 'bundle.js',
  }
};

export default config