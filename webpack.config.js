import path from 'path';
import { glob } from 'glob';

// Helper function to generate entries for models and utils
const generateEntries = async (pattern) => {
  const entries = {};
  const files = await glob(pattern);
  files.forEach(file => {
    const entryName = file
      .replace('src/lib/', '')  // Remove base path
      .replace(/\.[^/.]+$/, ''); // Remove extension
    entries[entryName] = './' + file;
  });
  return entries;
};

// Combine all entries
const getEntries = async () => {
  const [modelEntries, utilEntries] = await Promise.all([
    generateEntries('src/lib/models/**/*.js'),
    generateEntries('src/lib/utils/**/*.js')
  ]);
  
  return {
    ...{
      main: './app.js',
      htmlindex: './src/index.js'
    },
    ...modelEntries,
    ...utilEntries
  };
};

const config = {
  mode: 'development',
  output: {
    path: path.resolve(".", 'dist'),
    filename: (pathData) => {
      // Keep models and utils in their respective directories
      if (pathData.chunk.name.includes('models/')) {
        return 'models/[name].js';
      }
      if (pathData.chunk.name.includes('utils/')) {
        return 'utils/[name].js';
      }
      return '[name].bundle.js';
    },
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
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
    }
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      }
    ]
  }
};

export default async () => {
  config.entry = await getEntries();
  return config;
};