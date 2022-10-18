import typescript2 from 'rollup-plugin-typescript2';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import sass from 'rollup-plugin-sass';
export const overrides = {
  compilerOptions: {
    declaration: true
  },
  exclude: [
    'src/**/*.test.tsx',
    'src/**/*.stories.tsx',
    'src/setupTests.ts',
    'src/reportWebVitals.ts'
  ]
};

export const baseConfig = {
  input: 'src/index.tsx',
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    sass({
      output: 'dist/index.css'
    }),
    typescript2({ tsconfigOverride: overrides })
    // Automatically externalize dependencies and peerDependencies in a bundle.
  ]
};
