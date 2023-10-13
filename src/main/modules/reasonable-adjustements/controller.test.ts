import { RAProvider } from './index';

describe('CC', () => {
  test('RAC', () => {
    const ctrl = RAProvider.controller;
    console.info(ctrl.launch);
    expect(1).toBe(1);
  });
});
