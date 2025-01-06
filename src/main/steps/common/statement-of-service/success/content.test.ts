/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CaseType } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  bannerTitle: 'Statement of service submitted to the court',
  heading: 'What happens next',
  content1: 'The court will contact you with details of what happens next.',
  content2: 'If Cafcass are involved in the case, they will provide the court with a safeguarding letter.',
  returnToCaseOverview: 'Close and return to the case overview',
};

const cy: typeof en = {
  bannerTitle: 'Cyflwynwyd y datganiad cyflwyno i’r llys',
  heading: 'Beth fydd yn digwydd nesaf',
  content1: 'Bydd y llys yn cysylltu â chi gyda manylion am yr hyn fydd yn digwydd nesaf.',
  content2: "Os bydd Cafcass yn rhan o'r achos, byddant yn darparu llythyr diogelu  i’r llys.",
  returnToCaseOverview: 'Cau a dychwelyd i drosolwg o’r achos',
};

describe('statement-of-service > success > content', () => {
  let commonContent = { language: 'en' } as unknown as CommonContent;
  commonContent = {
    ...commonContent,
    additionalData: {
      req: {
        session: {
          userCase: {
            caseTypeOfApplication: CaseType.C100,
          },
        },
      },
    },
  };
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain onlyContinue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form?.onlyContinue?.text as Function)(generatedContent)).toBe(en.returnToCaseOverview);
  });

  test('should return correct english content for FL401 case', () => {
    commonContent = {
      ...commonContent,
      additionalData: {
        req: {
          session: {
            userCase: {
              caseTypeOfApplication: CaseType.FL401,
            },
          },
        },
      },
    };
    // eslint-disable-next-line jest/expect-expect
    en.content2 = '';

    languageAssertions('en', en, () => generateContent(commonContent));
  });
});
