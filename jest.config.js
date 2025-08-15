module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg|ico)$': '<rootDir>/__tests__/__mocks__/fileMock.js',
    '^react-flow-renderer$': '<rootDir>/__tests__/__mocks__/reactFlowMock.js',
  },
  testMatch: ['**/__tests__/**/*.test.{js,jsx}'],
};
