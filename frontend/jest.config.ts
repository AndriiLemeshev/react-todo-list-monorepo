export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.jest.json'
      }
    },
    // transform: {
    //     '^.+\\.(ts|tsx)$': 'ts-jest',
    //     '^.+\\.svg$': 'jest-transform-stub',
    // },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
