import typescript2 from 'rollup-plugin-typescript2';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import sass from 'rollup-plugin-sass';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

const overrides = {
  compilerOptions: {
    declaration: true
  },
  exclude: [
    'src/**/*.test.tsx',
    'src/**/*.stories.tsx',
    'setupTests.ts',
    'reportWebVitals.ts'
  ]
};
export default {
  input: 'src/index.tsx',
  output: [
    {
      name: 'sailboat',
      file: 'dist/index.umd.js',
      format: 'umd',
      exports: 'named', // 代表导出的是全局变量命名的方式, sailboat
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        axios: 'Axios'
      },
      plugins: [terser()]
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    sass({
      output: 'dist/index.css'
    }),
    typescript2({ tsconfigOverride: overrides }),
    // 处理 ReferenceError: process is not defined 问题
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
    // Automatically externalize dependencies and peerDependencies in a bundle.
    // excludeDependenciesFromBundle({})
  ],
  // // 忽略
  external: ['react', 'react-dom', 'axios']
};
