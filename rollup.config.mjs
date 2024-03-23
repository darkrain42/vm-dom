import { defineExternal, definePlugins } from '@gera2ld/plaid-rollup';
import { defineConfig } from 'rollup';
import solidPkg from 'solid-js/package.json' assert { type: 'json' };
import pkg from './package.json' assert { type: 'json' };

const external = defineExternal(Object.keys(pkg.dependencies));
const bundleOptions = {
  extend: true,
  esModule: false,
};
const outputOptions = {
  indent: false,
  banner: `/*! ${pkg.name}@${pkg.version} | ${pkg.license} License */`,
};

export default defineConfig([
  {
    input: 'src/index.ts',
    plugins: definePlugins({}),
    external,
    output: {
      format: 'esm',
      file: `dist/index.mjs`,
      ...outputOptions,
    },
  },
  {
    input: 'src/index.ts',
    plugins: definePlugins({}),
    output: {
      format: 'iife',
      file: `dist/index.js`,
      name: 'VM',
      ...outputOptions,
      ...bundleOptions,
    },
  },
  {
    input: 'src/solid.ts',
    plugins: definePlugins({}),
    output: {
      format: 'iife',
      file: `dist/solid.js`,
      name: 'VM.solid',
      ...outputOptions,
      ...bundleOptions,
      banner: `/*! ${pkg.name}@${pkg.version}/solid-js  solid-js@${solidPkg.version} | ${solidPkg.license} License */`,
    },
  },
]);
