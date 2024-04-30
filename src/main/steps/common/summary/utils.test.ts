import mockUserCase from '../../../../test/unit/utils/mockUserCase';
//import { State } from '../../../app/case/definition';
import { SummaryList } from '../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { CONSENT, MIAM_START, PROCEEDINGS_COURT_PROCEEDINGS, PROCEEDINGS_START } from '../../urls';

import { summaryList } from './utils';

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
    optitle: 'Provide details of court cases you or the children have been involved in',
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
        userCase: {
          ...mockUserCase,
        },
        expected: {
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
              key: {
                text: 'What is a Mediation Information and Assessment Meeting (MIAM)?',
              },
              value: {
                html: 'Yes',
              },
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
              key: {
                text: 'When did you receive the application?',
              },
              value: {
                html: '11 March 2022',
              },
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
              key: {
                text: 'When did you receive the application?',
              },
              value: {
                html: '11 March 2022',
              },
            },
          ],
          title: 'applicationDetails',
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      const result: SummaryList | undefined = summaryList(enContent, userCase, urls, 'applicationDetails', 'en');
      console.log(result?.rows);
      expect(result).toStrictEqual(expected);
    });
  });
});
