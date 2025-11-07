// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'whatwg-fetch';

// Mock localStorage for Firebase
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(() => null),
    clear: jest.fn(() => null),
    removeItem: jest.fn(() => null),
    key: jest.fn(() => null),
    length: 0,
  },
  writable: true,
});

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(() => null),
    clear: jest.fn(() => null),
    removeItem: jest.fn(() => null),
    key: jest.fn(() => null),
    length: 0,
  },
  writable: true,
});

// Mock location for Firebase
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    protocol: 'http:',
    hostname: 'localhost',
    port: '3000',
  },
  writable: true,
});

// Polyfill Response for Firebase antd other modules that use it
global.Response = class Response {
  constructor(body, init) {
    this.body = body;
    this.init = init;
  }
  // Add any methods or properties that are used by your code
  json() {
    return Promise.resolve(JSON.parse(this.body));
  }
  text() {
    return Promise.resolve(this.body);
  }
  // Add other methods like arrayBuffer, blob, formData, etc. if needed
};

// Polyfill setImmediate for gRPC
global.setImmediate = (callback) => setTimeout(callback, 0);

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }

  observe(target) {
    // Trigger the callback for all entries
    this.callback([{ isIntersecting: true, target }], this);
  }

  unobserve() {
    // Do nothing
  }

  disconnect() {
    // Do nothing
  }
};
