require('@babel/register')({
  presets: [
    ['@babel/preset-env', {
      targets: {node: "current"},
    }],
    '@babel/preset-typescript'
  ],
  plugins: [],
  extensions: ['.ts', '.tsx'],
  babelrc: false,
});

require('dotenv').load();

require('./src/search-index').build().catch(e => {
  console.error(e);
  process.exit(1);
});
