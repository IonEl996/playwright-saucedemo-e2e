import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // 1. Core ESLint Recommended
  tseslint.configs.recommended,

  // 2. Playwright Specific Rules
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**', 'pages/**'], // Only apply these to test/POM files
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-skipped-test': 'warn',      // Don't accidentally leave .skip() in your portfolio
      'playwright/no-force-option': 'error',     // Discourage "hacks"; use better locators instead
      'playwright/prefer-web-first-assertions': 'error', // Use expect(loc).toBeVisible()
      'playwright/no-wait-for-timeout': 'error', // Never use page.waitForTimeout()
    },
  },

  // 3. Global TypeScript & Custom Overrides
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn', // Discourages 'any' type for better TS practice
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // 4. Prettier (Must be last to override stylistic rules)
  eslintConfigPrettier
);