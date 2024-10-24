import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    "react-markdown": "<rootDir>/src/mock/ReactMarkdownMock.tsx",
    "remark-gfm": "<rootDir>/src/mock/ReactMarkdownMock.tsx",
  },
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  coverageThreshold: {
    global: {
      statements: 34,
      branches: 34,
      functions: 34,
      lines: 34,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
