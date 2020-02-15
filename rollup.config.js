import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import filesize from 'rollup-plugin-filesize';
import minify from 'rollup-plugin-babel-minify';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const INPUT_FILE_PATH = 'src/index.js';

const GLOBALS = {
  axios: 'axios',
};

const EXTERNAL = ['axios'];

const OUTPUT_DATA = [
  {
    file: pkg.browser,
    format: 'umd',
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.module,
    format: 'es',
  },
];

const PLUGINS = [
  babel({ exclude: 'node_modules/**' }),
  localResolve(),
  resolve({
    module: true,
    jsnext: true,
    main: true,
    preferBuiltins: true,
    browser: true,
    modulesOnly: true,
  }),
  minify(),
  terser(),
  commonjs(),
  filesize(),
];

const config = OUTPUT_DATA.map(({ file, format }) => ({
  input: INPUT_FILE_PATH,
  output: {
    file,
    format,
    name: pkg.name,
    globals: GLOBALS,
  },
  external: EXTERNAL,
  plugins: PLUGINS,
}));

export default config;
