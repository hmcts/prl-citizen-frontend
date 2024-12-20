import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CaseWithId } from '../../../../app/case/case';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  c100: {
    title: "Keeping {name}'s details safe",
    understandSafety:
      "We understand how important it is to feel safe, and know that {name}'s details will be kept private.",
    detailsKeptConfidential:
      "{name}'s details will be kept confidential and will only be used by the court, as well as by Cafcass or Cafcass Cymru. They will not be shared with anyone else.",
    helpKeepDetailsPrivate:
      "To help us to keep {name}'s details safe, do not include their details in any other communications during the case.",
  },
  applicantRespondent: {
    title: 'Keeping your details safe',
    understandSafety:
      'We understand how important it is to feel safe, and know that your details will be kept private.',
    detailsKeptConfidential:
      'Your details will be kept confidential and will only be used by the court, as well as by Cafcass or Cafcass Cymru. They will not be shared with anyone else.',
    helpKeepDetailsPrivate:
      'To help us to keep your details safe, do not include them in any other communications during the case.',
  },
  continue: 'Continue',
  cancel: 'Cancel',
};

const cy = {
  c100: {
    title: 'Cadw manylion {name} yn ddiogel',
    understandSafety:
      'Rydym yn deall pa mor bwysig yw hi i deimlo’n ddiogel, a gwybod y bydd manylion {name} yn cael eu cadw’n breifat.',
    detailsKeptConfidential:
      'Bydd manylion {name} yn cael eu cadw’n gyfrinachol a dim ond y llys yn ogystal â Cafcass neu Cafcass Cymru fydd yn eu defnyddio. Ni fyddant yn cael eu rhannu ag unrhyw un arall.',
    helpKeepDetailsPrivate:
      'Er mwyn ein helpu ni i gadw manylion {name} yn ddiogel, peidiwch â chynnwys eu manylion mewn unrhyw gyfathrebiadau eraill yn ystod yr achos.',
  },
  applicantRespondent: {
    title: 'Cadw eich manylion yn ddiogel',
    understandSafety:
      'Rydym yn deall pa mor bwysig yw hi i deimlo’n ddiogel, a gwybod y bydd eich manylion yn cael eu cadw’n breifat.',
    detailsKeptConfidential:
      'Bydd eich manylion yn cael eu cadw’n gyfrinachol a dim ond y llys yn ogystal â Cafcass neu Cafcass Cymru fydd yn eu defnyddio. Ni fyddant yn cael eu rhannu ag unrhyw un arall.',
    helpKeepDetailsPrivate:
      "Er mwyn ein helpu ni i gadw eich manylion yn ddiogel, peidiwch â'u cynnwys mewn unrhyw gyfathrebiadau eraill yn ystod yr achos.",
  },
  continue: 'Parhau',
  cancel: 'Canslo',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('C8 Refuge > keeping details safe > content', () => {
  const commonContent = {
    language: 'en',
  } as CommonContent;
  const additionalData = {
    req: {
      originalUrl: '/c100-rebuild/',
      params: {
        root: 'c100-rebuild',
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
      },
    },
  };
  const userCase = {
    appl_allApplicants: [
      {
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
        applicantFirstName: 'Test',
        applicantLastName: 'Test',
      },
    ],
  } as unknown as CaseWithId;
  let generatedContent;
  let form;

  describe('c100-rebuild journey', () => {
    beforeEach(() => {
      generatedContent = generateContent({ ...commonContent, additionalData, userCase });
      form = generatedContent.form as FormContent;
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct english content', () => {
      languageAssertions('en', en, () => generatedContent);
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct welsh content', () => {
      languageAssertions('cy', cy, () =>
        generateContent({ ...commonContent, additionalData, userCase, language: 'cy' })
      );
    });

    test('should contain continue button', () => {
      expect((form.onlyContinue?.text as Function)(generatedContent)).toBe(en.continue);
    });

    test('should contain saveAndComeLater button', () => {
      expect(
        (form?.saveAndComeLater?.text as LanguageLookup)(
          generatePageContent({ language: 'en', additionalData, userCase }) as Record<string, never>
        )
      ).toBe('Save and come back later');
    });
  });

  describe('applicant/respondent journey', () => {
    beforeEach(() => {
      generatedContent = generateContent({ ...commonContent, additionalData: {}, userCase: {} });
      form = generatedContent.form as FormContent;
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct english content', () => {
      languageAssertions('en', en, () => generatedContent);
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct welsh content', () => {
      languageAssertions('cy', cy, () =>
        generateContent({ ...commonContent, additionalData: {}, userCase: {}, language: 'cy' })
      );
    });

    test('should contain continue button', () => {
      expect((form.onlyContinue?.text as Function)(generatedContent)).toBe(en.continue);
    });
  });
});
