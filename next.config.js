const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      loader: '@svgr/webpack',
    });

    config.module.rules.push({
      test: /\.md$/i,
      loader: 'raw-loader',
      options: {
        esModule: false,
      },
    });

    return config;
  },
});
