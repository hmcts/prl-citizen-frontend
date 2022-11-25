import { getSectionSummaryList } from './lib';

/* eslint-disable @typescript-eslint/ban-types */
describe('Lib Test', () => {
  test('matching the lib boilerplate for the respective fields', () => {
    const rowSpecimenData = [
      {
        key: 'miam',
        keyHtml: '',
        value: 'maim_attendance',
        valueHtml: '',
        changeUrl: '/c100/miam_attendance',
        classes: '',
      },
      {
        key: 'miam',
        keyHtml: '',
        value: 'maim_exemption',
        valueHtml: '',
        changeUrl: '/c100/miam_exemption',
        classes: '',
      },
    ];

    const pagedata = getSectionSummaryList(rowSpecimenData, {});
    pagedata.forEach(Element => {
      expect(Element.key).not.toBe(undefined);
      expect(Element.classes).toBe(undefined);
      expect(Element.actions).not.toBe(undefined);
    });
  });
});
