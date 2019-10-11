'use strict';

const {transform} = require('@babel/core');
const tsPreset = require('@babel/preset-typescript');
const jestPreset = require('babel-preset-jest');
const envPreset = require('@babel/preset-env');

// REMINDER: IF YOU EDIT THIS FILE MAKE SURE YOU RUN JEST
// WITH ITS `--no-cache` OPTION BECAUSE JEST SUCKS
module.exports = {
  process(src, filename) {
    const result = transform(src, {
      filename,
      presets: [
        tsPreset,
        jestPreset,
        [envPreset, {
          targets: {
            node: "current"
          }
        }],
      ],
      sourceMaps: "inline",
      plugins: [
        "@babel/plugin-transform-react-jsx"
      ],
    });

    return result ? result.code : src;
  },
};
