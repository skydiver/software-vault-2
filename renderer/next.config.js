const withPlugins = require('next-compose-plugins');
const css = require('@zeit/next-css');

const nextConfig = {
  exportPathMap() {
    // Let Next.js know where to find the entry page
    // when it's exporting the static bundle for the use
    // in the production version of your app
    return {
      '/': { page: '/' },
    };
  },

  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]',
        },
      },
    });

    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },
};

module.exports = withPlugins([[css]], nextConfig);
