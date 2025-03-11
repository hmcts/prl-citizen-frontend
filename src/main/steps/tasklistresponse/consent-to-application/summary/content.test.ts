import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

// eslint-disable-next-line jest/no-export
export const enContent = {
  title: 'Check your answers to consent to the application',
  subTitle: 'Your consent to the application',
  sectionTitles: {
    consentDetails: '',
  },
  keys: {
    doYouConsent: 'Do you provide your consent to the application?',
    reasonForNotConsenting: 'Give your reasons for not consenting to the application.',
    applicationReceivedDate: 'When did you receive the application?',
    courtPermission: 'Is the applicant required to seek permission from the court before making applications?',
    courtOrderDetails: 'Provide details of the court order in place.',
  },
};

const cyContent: typeof enContent = {
  title: 'Check your answers to consent to the application (welsh)',
  subTitle: 'Cydsynio i’r cais',
  sectionTitles: {
    consentDetails: '',
  },
  keys: {
    doYouConsent: 'A ydych chi’n cydsynio i’r cais?',
    reasonForNotConsenting: 'Rhowch eich rhesymau dros beidio â chydsynio i’r cais.',
    applicationReceivedDate: "Pryd gawsoch chi'r cais?",
    courtPermission: "A oes angen i'r ceisydd ofyn am ganiatâd gan y llys cyn gwneud ceisiadau?",
    courtOrderDetails: 'Rhowch fanylion y gorchymyn llys sydd mewn grym',
  },
};

describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    commonContent.userCase = {
      ...mockUserCase,
      doYouConsent: YesOrNo.YES,
      courtPermission: YesOrNo.NO,
    };
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });
  test('should return correct english content', () => {
    generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.subTitle).toEqual(enContent.subTitle);
    expect(generatedContent.keys).toEqual(enContent.keys);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({
      ...commonContent,
      language: 'cy',
    });
    expect(generatedContent.subTitle).toEqual(cyContent.subTitle);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.keys).toEqual(cyContent.keys);
  });
  test('should contain continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });
});
