import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { FieldPrefix } from '../../../app/case/case';
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
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      const role = 'APPLICANT' as FieldPrefix;
      const result: SummaryList | undefined = summaryList(
        enContent,
        userCase,
        urls,
        'applicationDetails',
        enContent.fieldType,
        'en',
        role
      );
      console.log(' result ======>' + JSON.stringify(result));
      expect(
        summaryList(enContent, userCase, urls, 'applicationDetails', enContent.fieldType, 'en', role)
      ).toStrictEqual(expected);
    });
  });
});
