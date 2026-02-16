/** @type {import('jest').Config} */
const config = {
  roots: ["<rootDir>/src"],

  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },

  testMatch: ["**/*.spec.ts"],

  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],

  // 👇 ESSA LINHA RESOLVE O ERRO DO UUID (ESM)
  transformIgnorePatterns: [
    "node_modules/(?!(uuid)/)"
  ],

  clearMocks: true,
  coverageProvider: "v8",
};

module.exports = config;