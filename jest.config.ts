import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Load jest-dom
  testEnvironment: "jest-environment-jsdom", // Required for React component testing
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // If you use @ alias in tsconfig
  },
};

export default createJestConfig(customJestConfig);