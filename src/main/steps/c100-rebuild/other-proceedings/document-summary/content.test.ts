import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  headingTitle:
    'You have uploaded details of your past and current proceedings. These will be reviewed by the court once you submit the application.',
  Edit: 'Edit',
  uploadList: 'What you have uploaded',
};

const cy = {
  headingTitle:
    "Rydych wedi llwytho manylion eich achosion yn y gorffennol a'ch achosion presennol. Bydd y rhain yn cael eu hadolygu gan y llys ar ôl i chi gyflwyno’r cais.",
  Edit: 'Golygu',
  uploadList: 'Yr hyn yr ydych wedi ei lwytho',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('other proceedings > documentSummary > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          orderType: 'careOrder',
        },
      },
    },
    userCase: {
      op_otherProceedings: {
        order: {
          otherOrders: [
            {
              orderDetail: 'OtherOrder1',
              orderCopy: 'Yes',
              orderDocument: {
                id: '7a9092e3-69e0-43d6-9334-b63f6351b7c1',
                url: '',
                filename: '',
                binaryUrl: '',
              },
            },
          ],
        },
      },
    },
  } as unknown as CommonContent;

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent({ ...commonContent }));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
  test('should contain SaveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
