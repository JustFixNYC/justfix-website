require('@babel/register')({
  presets: ['@babel/preset-typescript'],
  plugins: [],
  extensions: ['.ts', '.tsx']
});

require('dotenv').load();

require('./src/search-index').build();
