import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { SummaryList } from '../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { CONSENT, MIAM_START, PROCEEDINGS_COURT_PROCEEDINGS, PROCEEDINGS_START } from '../../urls';

import { summaryCaseList, summaryList } from './utils';

const enContent = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    miamStart: 'What is a Mediation Information and Assessment Meeting (MIAM)?',
    applicationReceivedDate: 'When did you receive the application?',
    invalidApplicationReceivedDate: 'When did you receive the application?',
  },
  fieldType: {
    miamStart: 'string',
    applicationReceivedDate: 'Date',
    invalidApplicationReceivedDate: 'Date',
    proceedingsStart: 'String',
    proceedingsStartOrder: 'String',
    emergencyOrderOptions: 'YesOrNo',
    'emergencyOrder.caseNoDetails': 'String',
    'emergencyOrder.orderDateDetails': 'Date',
    'emergencyOrder.orderTimeDetails': 'String',
    'emergencyOrder.currentOrderDetails': 'YesOrNo',
    'emergencyOrder.issueOrderDetails': 'String',
  },
  errors: {},
};

const urls = {
  miamStart: MIAM_START,
  proceedingsStart: PROCEEDINGS_START,
  proceedingsStartOrder: PROCEEDINGS_START,
  emergencyOrderOptions: PROCEEDINGS_COURT_PROCEEDINGS,
  applicationReceivedDate: CONSENT,
  invalidApplicationReceivedDate: CONSENT,
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
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/miam/miam-start',
                    text: 'Edit',
                    visuallyHiddenText: 'What is a Mediation Information and Assessment Meeting (MIAM)?',
                  },
                ],
              },
              key: { text: 'What is a Mediation Information and Assessment Meeting (MIAM)?' },
              value: { html: 'Yes' },
            },
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/consent-to-application',
                    text: 'Edit',
                    visuallyHiddenText: 'When did you receive the application?',
                  },
                ],
              },
              key: { text: 'When did you receive the application?' },
              value: { html: '11 March 2022' },
            },
            {
              actions: {
                items: [
                  {
                    href: '/tasklistresponse/consent-to-application',
                    text: 'Edit',
                    visuallyHiddenText: 'When did you receive the application?',
                  },
                ],
              },
              key: { text: 'When did you receive the application?' },
              value: {},
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
        'en'
      );
      console.log(result);
      expect(summaryList(enContent, userCase, urls, 'applicationDetails', enContent.fieldType, 'en')).toStrictEqual(
        expected
      );
    });
  });

  describe('Return correct Summary Case List', () => {
    test.each([
      {
        userCase: {
          ...mockUserCase,
          caseStatus: { state: '' },
          applicantCaseName: 'test',
          caseTypeOfApplication: 'C100',
        },
        expected: {
          title: '',
          rows: [
            { key: { text: 'Case Name' }, value: { html: '<h4>Case Status</h4>' } },
            {
              key: { text: 'test' },
              value: {},
              actions: { items: [{ href: '#', text: '1234', visuallyHiddenText: '1234' }] },
            },
          ],
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(expected).toEqual(summaryCaseList([userCase], '', false));
    });
  });
});
