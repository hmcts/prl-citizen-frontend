import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common.content';

import { generateContent } from './content';

const en = {
  caption: 'Support you need during the case',
  title: 'Tell us if you need support',
  title2: 'Tell us if your support needs have changed',
  content1: 'Some people need support during their case. This includes if a case goes to court.',
  content2: 'You can ask for:',
  list: [
    {
      content: 'language requirements, for example if you need an interpreter in a particular language',
    },
    {
      content:
        'support for people with a health condition or disability (known as ‘reasonable adjustments’), for example access and mobility needs',
    },
    {
      content: 'special arrangements for you to feel safe at court, for example a separate waiting room',
    },
  ],
  content3: 'Requesting support',
  content4:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> if you have a hearing within 2 days and you need support.',
  content5: 'Support before a court hearing',
  content6:
    'If you need support before a hearing, you can ask for it at any point during your case. For example, if you need documents in an alternative format like braille.',
  content7: 'Support at a court hearing',
  content8:
    'If you’re asked to attend a hearing, you can ask for support if you need help to take part. We’ll let you know if you need to attend and you can tell us what support you’ll need.',
  content9: 'Support for somebody else',
  content10:
    'If somebody else who’s also attending the hearing needs support, you can <a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">contact the court (opens in a new tab)</a>.',
  content11: 'What happens next',
  content12:
    'Once you’ve submitted your request for support, it’ll be reviewed by HMCTS staff or a judge. We’ll contact you if we need more information.',
  startNow: 'Start now',
};

const cy = {
  caption: 'Cefnogaeth y mae arnoch ei angen yn ystod eich achos',
  title: 'Dywedwch wrthym os oes arnoch angen cefnogaeth',
  title2: 'Dywedwch wrthym os yw eich anghenion cefnogaeth wedi newid',
  content1: "Mae rhai pobl angen cefnogaeth yn ystod eu hachos. Mae hyn yn cynnwys os bydd achos yn mynd i'r llys.",
  content2: 'Gallwch ofyn am:',
  list: [
    {
      content: 'ofynion ieithyddol, er enghraifft os oes angen cyfieithydd arnoch mewn iaith benodol',
    },
    {
      content:
        'cymorth i bobl â chyflwr iechyd neu anabledd (a elwir yn ‘addasiadau rhesymol’), er enghraifft, anghenion mynediad a symudedd',
    },
    {
      content: 'trefniadau arbennig i chi deimlo’n ddiogel yn y llys, er enghraifft, ystafell aros ar wahân',
    },
  ],
  content3: 'Gofyn am gymorth',
  content4:
    '<a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">Contact the court (opens in a new tab)</a> if you have a hearing within 2 days and you need support. - welsh',
  content5: 'Cymorth cyn gwrandawiad llys',
  content6:
    'Os oes arnoch angen cymorth cyn gwrandawiad, gallwch ofyn amdano ar unrhyw adeg yn ystod eich achos. Er enghraifft, os oes angen dogfennau arnoch mewn fformat amgen fel braille.',
  content7: 'Cymorth mewn gwrandawiad llys',
  content8:
    'Os gofynnir i chi fynychu gwrandawiad, gallwch ofyn am gymorth os oes angen help arnoch i gymryd rhan. Byddwn yn rhoi gwybod i chi os oes angen i chi fynychu a gallwch ddweud wrthym pa gymorth y bydd ei angen arnoch.',
  content9: 'Cymorth i rywun arall',
  content10:
    'If somebody else who’s also attending the hearing needs support, you can <a class="govuk-link" rel="external" href="https://www.gov.uk/find-court-tribunal" target="_blank">contact the court (opens in a new tab)</a>. - welsh',
  content11: 'Beth fydd yn digwydd nesaf',
  content12:
    'Unwaith y byddwch wedi cyflwyno eich cais am gymorth, bydd yn cael ei adolygu gan staff GLlTEF neu farnwr. Byddwn yn cysylltu â chi os byddwn angen mwy o wybodaeth.',
  startNow: 'Dechrau nawr',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('RA > intro > content', () => {
  const commonContent = {
    language: 'en',
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
        generatePageContent({ language: 'en', pageContent: generateContent }) as Record<string, never>
      )
    ).toBe(en.startNow);
  });

  test('should have correct title when RA data present', () => {
    const raContent = generateContent({
      language: 'en',
      additionalData: {
        req: {
          session: {
            userCase: {
              ra_existingFlags: {
                details: ['MOCK_RA_FLAG'],
              },
            },
          },
        },
      },
    } as unknown as CommonContent);
    expect(raContent.title).toBe(en.title2);
  });
});
