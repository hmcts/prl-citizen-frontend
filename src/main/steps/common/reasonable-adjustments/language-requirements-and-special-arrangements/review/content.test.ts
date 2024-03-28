import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../../app/form/Form';
import {
  CommonContent,
  cy as commonContentCy,
  en as commonContentEn,
  generatePageContent,
} from '../../../common.content';

import { generateContent } from './content';

const en = {
  caption: 'Support you need during the case',
  title: 'Review your language requirements and special arrangements',
  content1: 'Tell us what support you need (optional)',
  content2: 'If your hearing is within 2 days',
  content3:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> to request any support you need for the hearing.',
  submitAndContinue: 'Sumbit and continue',
  change: commonContentEn.change,
};

const cy = {
  caption: 'Cymorth y mae arnoch angen yn ystod yr achos',
  title: "Adolygu eich gofynion ieithyddol a'ch trefniadau arbennig",
  content1: 'Dywedwch wrthym pa gymorth sydd ei angen arnoch (dewisol)',
  content2: "Os yw'ch gwrandawiad o fewn 2 ddiwrnod",
  content3:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> to request any support you need for the hearing. - welsh',
  submitAndContinue: 'Cyflwyno a pharhau',
  change: commonContentCy.change,
};

/* eslint-disable @typescript-eslint/ban-types */
describe('RA > language-requirements-and-special-arrangements > review > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/c100-rebuild/',
        session: {
          userCase: {
            id: '1166265a-ebe3-4141-862f-07caa95e7110',
            ra_languageReqAndSpecialArrangements: 'ra_languageReqAndSpecialArrangements',
            applicantsFL401: {
              firstName: 'test',
              user: {
                idamId: '1166265a-ebe3-4141-862f-07caa95e7110',
              },
            },
          },
          user: {
            idamId: '1166265a-ebe3-4141-862f-07caa95e7110',
            id: '1166265a-ebe3-4141-862f-07caa95e7110',
          },
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(
        generatePageContent({
          language: 'en',
          pageContent: generateContent,
          additionalData: commonContent.additionalData,
        }) as Record<string, never>
      )
    ).toBe(en.submitAndContinue);
  });

  test('should contain cancel link', () => {
    expect((form?.link?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)).toBe(
      'Cancel'
    );
  });

  test('generated content should have correct change link and languageReqAndSpecialArrangements', () => {
    expect(generatedContent.changeLink).toBe(
      '/applicant/reasonable-adjustments/language-requirements-and-special-arrangements'
    );
    expect(generatedContent.languageReqAndSpecialArrangements).toBe('ra_languageReqAndSpecialArrangements');
  });
});
