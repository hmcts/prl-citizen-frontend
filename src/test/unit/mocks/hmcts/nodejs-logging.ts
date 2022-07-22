export const mockLogger = {
  error: jest.fn(),
  info: jest.fn(),
};

export const Logger = { getLogger: jest.fn().mockReturnValue(mockLogger) };
