import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  pageTitle: 'Which of the decisions you’re asking the court to resolve relate to',
  hintText: 'Select all that apply.',
  labelText: 'Decide who the children live with and when',
  select_all_apply: 'Select all that apply',
  whoLiveWithChild: 'Decide who the children live with and when',
  errors: {
    isDecisionTaken: {
      required: 'Select at least a decision',
    },
  },
};

const cy = {
  pageTitle: 'Which of the decisions you’re asking the court to resolve relate to - welsh',
  hintText: 'Select all that apply. - welsh',
  labelText: 'Decide who the children live with and when - welsh',
  select_all_apply: 'Select all that apply - welsh',
  whoLiveWithChild: 'Decide who the children live with and when',
  errors: {
    isDecisionTaken: {
      required: 'Select at least a decision  - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('child details > child-matters', () => {
  const commonContent = {
    language: 'en',
    userCase: {},
    additionalData: {
      req: {
        query: {
          childId: '801e636c-719a-4e73-97aa-bffbd8033138',
        },
        session: {
          userCase: {
            children: [
              {
                id: '801e636c-719a-4e73-97aa-bffbd8033138',
                firstname: 'Test',
                lastname: 'Test',
                personalDetails: {
                  DateoBirth: '',
                  isDateOfBirthKnown: '',
                  ApproximateDateOfBirth: '',
                  Sex: '',
                },
                childMatter: {
                  isDecisionTaken: '',
                },
                parentialResponsibility: {
                  statement: '',
                },
              },
            ],
          },
        },
      },
    },
  } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return name of the applicant', () => {
    expect(generateContent(commonContent).firstName).toBe('Test');
    expect(generateContent(commonContent).lastName).toBe('Test');
  });
});
