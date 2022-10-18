import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import { baseConfig } from './rollup.config';

export default {
  ...baseConfig,
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
    ...baseconfig.plugins,
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
