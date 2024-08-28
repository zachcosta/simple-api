import path from 'path';

const module = {
  mode: 'development',
  entry: './app.js',
  output: {
    path: path.resolve(".", 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(".", 'dist'),
    },
    compress: true,
    port: 9000,
  },
};

export default module