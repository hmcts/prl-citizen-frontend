import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { MIAM_START } from '../../urls';

import { SummaryList, summaryList } from './utils';

const enContent = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    miamStart: 'What is a Mediation Information and Assessment Meeting (MIAM)?',
  },
  fieldType: {
    miamStart: 'string',
  },
  errors: {},
};

const urls = {
  miamStart: MIAM_START,
};

describe('common > summary > utils', () => {
  describe('SummaryList', () => {
    test.each([
      {
        userCase: mockUserCase,
        expected: {
          title: 'applicationDetails',
          rows: [
            {
              key: {
                text: 'What is a Mediation Information and Assessment Meeting (MIAM)?',
              },
              value: {
                html: 'Yes',
              },
              actions: {
                items: [
                  {
                    href: '/respondent/miam/miam-start',
                    text: 'Edit',
                    visuallyHiddenText: 'What is a Mediation Information and Assessment Meeting (MIAM)?',
                  },
                ],
              },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      const result: SummaryList | undefined = summaryList(
        enContent,
        userCase,
        urls,
        'applicationDetails',
        enContent.fieldType,
        'en',
        undefined
      );
      console.log('======>' + JSON.stringify(result));
      expect(
        summaryList(enContent, userCase, urls, 'applicationDetails', enContent.fieldType, 'en', undefined)
      ).toStrictEqual(expected);
    });
  });
});
