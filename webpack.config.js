import path from 'path';

const module = {
  mode: 'development',
  entry: {
    main: './app.js',
    htmlindex: './src/index.js'
  },
  output: {
    path: path.resolve(".", 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(".", 'dist'),
    },
    compress: true,
    port: 9000,
  },
  resolve: {
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "url": false,
      "util": false,
      "querystring": false,
      "crypto": false,
      "os": false,
      "async_hooks": false
    }, 
    // modules: [
    //   path.resolve("...", 'src/lib/utils'),
    //   path.resolve("__dirname", 'src/lib/models'),
    //   path.resolve("__dirname", 'node_modules')
    // ]
  }
};

export default module