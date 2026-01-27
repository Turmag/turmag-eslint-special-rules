import type { Config } from 'jest';

const config: Config = {
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  
  moduleNameMapper: {
      '^@tests/(.*)$': '<rootDir>/tests/lib/rules//$1',
      '^@rules/(.*)$': '<rootDir>/lib/rules//$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'vue'],

  testEnvironment: 'node',
  
  collectCoverage: true,
  coverageDirectory: 'coverage',
  transformIgnorePatterns: ['/node_modules/'],
};

export default config;