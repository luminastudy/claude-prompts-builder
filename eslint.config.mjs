import agentConfig from 'eslint-config-agent'
import publishablePackageJson from 'eslint-config-publishable-package-json'

export default [
  ...agentConfig,
  ...(Array.isArray(publishablePackageJson) ? publishablePackageJson : [publishablePackageJson]),
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.mjs'],
  },
  {
    rules: {
      // Relax rules for published library package
      'ddd/require-spec-file': 'off', // Library code doesn't need spec files in the package
      'default/no-hardcoded-urls': 'off', // Claude URLs are the core functionality
      'single-export/single-export': 'off', // Type files can export multiple related types
      'no-restricted-syntax': 'off', // Allow type assertions for library utilities
      'max-lines': 'off', // Allow longer files for comprehensive type guards
    },
  },
]
