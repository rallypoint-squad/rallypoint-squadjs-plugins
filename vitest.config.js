import { join } from 'node:path';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      // https://github.com/aleclarson/vite-tsconfig-paths/issues/130
      './discord-base-plugin.js': join(import.meta.dirname, 'mocks/plugins/discord-base-plugin.js'),
    },
  },
  test: {
    globals: true,
  },
});
