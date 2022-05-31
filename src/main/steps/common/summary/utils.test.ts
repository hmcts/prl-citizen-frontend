import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { MIAM_START } from '../../urls';

import { summaryList } from './utils';

const enContent = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    miamStart: 'What is a Mediation Information and Assessment Meeting (MIAM)?',
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
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/respondent/miam/miam-start',
                    text: 'edit',
                    visuallyHiddenText: 'What is a Mediation Information and Assessment Meeting (MIAM)?',
                  },
                ],
              },
              key: { text: 'What is a Mediation Information and Assessment Meeting (MIAM)?' },
              value: { text: 'Yes' },
            },
          ],
          title: 'applicationDetails',
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(summaryList(enContent, userCase, urls, 'applicationDetails')).toStrictEqual(expected);
    });
  });
});
