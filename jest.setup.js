import '@testing-library/jest-dom';

// Polyfills for Node environments used by some libs (e.g., pg)
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Mock fetch for jsdom environment
if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          SQLSchema: {},
          GQLSchema: { types: '', resolvers: '' },
        }),
    })
  );
}
