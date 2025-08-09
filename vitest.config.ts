import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: './src/test/setup.ts',
          restoreMocks: true,
          clearMocks: true,
          unstubEnvs: true,
          unstubGlobals: true,
          include: ['src/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
          exclude: ['src/**/*.browsertest.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        },
      },
      {
        test: {
          name: 'browser',
          globals: true,
          setupFiles: './src/test/setup.ts',
          restoreMocks: true,
          clearMocks: true,
          unstubEnvs: true,
          unstubGlobals: true,
          include: ['src/**/*.browsertest.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
          exclude: ['src/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              }
            ],
            headless: true,
          },
        },
      },
    ],
  },
});