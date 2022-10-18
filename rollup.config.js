import typescript2 from 'rollup-plugin-typescript2';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import sass from 'rollup-plugin-sass';
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
      file: 'dist/index.es.js',
      format: 'es'
    },
    {
      name: 'sailboat',
      file: 'dist/index.umd.js',
      format: 'umd',
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        axios: 'axios'
      }
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
    // Automatically externalize dependencies and peerDependencies in a bundle.
    excludeDependenciesFromBundle({})
  ]
  // // 忽略
  // external: [
  //   'react',
  //   'react-dom',
  //   'axios',
  //   'lodash-es',
  //   'async-validator',
  //   '@fortawesome/fontawesome-svg-core',
  //   '@fortawesome/free-solid-svg-icons'
  // ]
};
