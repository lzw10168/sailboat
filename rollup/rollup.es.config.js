import { baseConfig } from './rollup.config';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
export default {
  ...baseConfig,
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es'
    }
  ],
  plugins: [
    ...baseConfig.plugins,
    // Automatically externalize dependencies and peerDependencies in a bundle.
    excludeDependenciesFromBundle({})
  ]
};
