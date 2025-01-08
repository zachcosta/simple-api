import path from 'path';

const module = {
  mode: 'development',
  entry: {
    main: './app.js',
    htmlindex: './src/index.js'
  },
  output: {
    path: path.resolve("__dirname", 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    static: {
      directory: path.join("__dirname", 'dist'),
    },
    compress: true,
    port: 9000,
  },
  // resolve: {
  //   fallback: {
  //     "fs": false,
  //     "tls": false,
  //     "net": false,
  //     "path": false,
  //     "zlib": false,
  //     "http": false,
  //     "https": false,
  //     "stream": false,
  //     "url": false,
  //     "util": false,
  //     "querystring": false,
  //     "crypto": false,
  //     "os": false,
  //     "async_hooks": false
  //   } 
  // }
};

export default module