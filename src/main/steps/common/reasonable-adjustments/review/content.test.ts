import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common.content';

import { generateContent, summaryList } from './content';

const en = {
  title: 'Check your answers to hearing requirements',
  subTitle: 'Your hearing needs and requirements',
  sectionTitles: {
    aboutYou: 'About you',
    supportYouNeed: 'Support you need during your case',
  },
  edit: 'Edit',
  keys: {
    ra_typeOfHearing: 'Would you be able to take part in hearings by video and phone?',
    ra_noVideoAndPhoneHearing_subfield: 'Please provide the details',
    ra_languageNeeds: 'Do you have any language requirements?',
    ra_needInterpreterInCertainLanguage_subfield: 'Please provide language details',
    ra_specialArrangements: 'Do you or the children need special safety arrangements at court?',
    ra_intermediaryRequirements: 'Are you aware of whether an intermediary will be required?',
    ra_disabilityRequirements:
      'If attending the court, do you or any of the parties involved have a disability for which you require special assistance or special facilities?',
    ra_assistanceRequired_subfield: 'Give details in the box below.',
    ra_intermediaryRequired_subfield: 'Give details in the box below.',
  },
  errors: {},
};

const cy = {
  title: 'Gwirio eich atebion ynghylch gofynion gwrandawiad',
  subTitle: 'Eich anghenion a gofynion o ran clywed',
  sectionTitles: {
    aboutYou: 'Amdanoch chi',
    supportYouNeed: 'Cefnogaeth sydd ei hangen arnoch yn ystod eich achos',
  },
  edit: 'Golygu',
  keys: {
    ra_typeOfHearing: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
    ra_noVideoAndPhoneHearing_subfield: 'Rhowch fanylion',
    ra_languageNeeds: 'A oes gennych chi unrhyw ofynion ieithyddol?',
    ra_needInterpreterInCertainLanguage_subfield: 'Rhowch fanylion eich gofynion ieithyddol',
    ra_specialArrangements: 'Ydych chi neu’r plant angen i’r llys wneud unrhyw drefniadau diogelwch arbennig?',
    ra_intermediaryRequirements: "Dewiswch p'un a fydd angen cyfryngwr ai peidio",
    ra_disabilityRequirements:
      'Os byddwch yn mynychu’r llys, a oes gennych chi neu unrhywun o’r partïon cysylltiedig anabledd y bydd angen cymorth neu gyfleusterau arbennig arnoch ar ei gyfer?',
    ra_assistanceRequired_subfield: 'Os Oes, nodwch beth yw’r anghenion hynny',
    ra_intermediaryRequired_subfield: 'Os Oes, nodwch beth yw’r anghenion hynny',
  },
  errors: {},
};

describe('RA > review > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/c100-rebuild/reasonable-adjustments/guidance',
        session: {
          userCase: {
            ra_disabilityRequirements: 'Yes',
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
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });

  test('should generate correct summary list', () => {
    expect(
      summaryList('C7ConsolidatedReview', 'en', {
        ra_typeOfHearing: ['languageNeeds'],
        ra_noVideoAndPhoneHearing_subfield: 'ra_noVideoAndPhoneHearing_subfield',
      })
    ).toStrictEqual({
      rows: [
        {
          actions: {
            items: [
              {
                href: '/respondent/reasonable-adjustments/attending-court',
                text: 'Edit',
                visuallyHiddenText: 'Would you be able to take part in hearings by video and phone?',
              },
            ],
          },
          key: { text: 'Would you be able to take part in hearings by video and phone?' },
          value: { text: 'undefined' },
        },
        {
          actions: {
            items: [
              {
                href: '/respondent/reasonable-adjustments/attending-court',
                text: 'Edit',
                visuallyHiddenText: 'Please provide the details',
              },
            ],
          },
          key: {
            text: 'Please provide the details',
          },
          value: {
            text: 'ra_noVideoAndPhoneHearing_subfield',
          },
        },
      ],
      subTitle: 'Support you need during your case',
      title: '',
    });
  });

  test('should generate correct summary list for welsh', () => {
    expect(
      summaryList('C7ConsolidatedReview', 'cy', {
        ra_typeOfHearing: ['languageNeeds'],
      })
    ).toStrictEqual({
      rows: [
        {
          actions: {
            items: [
              {
                href: '/respondent/reasonable-adjustments/attending-court',
                text: 'Golygu',
                visuallyHiddenText: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
              },
            ],
          },
          key: { text: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?' },
          value: { text: 'undefined' },
        },
      ],
      title: '',
      subTitle: 'Cefnogaeth sydd ei hangen arnoch yn ystod eich achos',
    });
  });

  test('should generate correct summary list when RA needs not present', () => {
    expect(summaryList('mockContext', 'en', {})).toStrictEqual({
      rows: [],
      title: '',
      subTitle: '',
    });
  });
});
