require('@babel/register')({
  presets: ['@babel/preset-typescript'],
  plugins: [],
  extensions: ['.ts', '.tsx']
});

require('dotenv').load();

require('./src/search-index').build().catch(e => {
  console.error(e);
  process.exit(1);
});
