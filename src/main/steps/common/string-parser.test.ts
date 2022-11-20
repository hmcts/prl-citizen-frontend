import { interpolate } from './string-parser';

describe('String Parser', () => {
  test('should return correct string', async () => {
    const string = 'Who does {firstName} {lastName} currently live with?';
    const valueObject = {
      firstName: 'Jane',
      lastName: 'Jones',
    };

    const parser = interpolate(string, valueObject);

    expect(parser).toEqual('Who does Jane Jones currently live with?');
  });
});
