global.console = {
  // disable these logging methods in tests
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),

  // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
  info: console.info,
  debug: console.debug,
};