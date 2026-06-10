import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'Special arrangements',
  headingTitle: 'Do you or the children need special arrangements at court?',
  line1:
    'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court.',
  select_all_apply: 'Select all that apply to you',
  separateWaitingRoom: 'a separate waiting room in the court building',
  separateExitEntrance: 'a separate entrance and exit from the court building',
  screenWithOtherPeople:
    'to be shielded by a privacy screen in the courtroom (a privacy screen would mean the respondent would not be able to see you while in the courtroom).',
  videoLinks:
    "to join the hearing by video link rather than in person (it is the judge's decision whether to allow a hearing by video link).",
  noSafetyRequirements: 'No, I do not have any safety requirements at this time',
  courtGuidanceText: 'Court staff may get in touch with you about the requirements',
  errors: {
    ra_specialArrangements: {
      required: 'Select whether you or the children need special arrangements at court',
    },
  },
};

const cy = {
  caption: 'Trefniadau arbennig',
  headingTitle: "Ydych chi neu'r plant angen trefniadau arbennig yn y llys?",
  line1:
    "Efallai y bydd angen trefniadau penodol arnoch chi neu'r plant pan fyddwch chi'n dod i'r llys. Rhaid i rai o’r addasiadau hyn gael eu cymeradwyo gan farnwr neu GLlTEF. Os yw eich anghenion yn newid, gallwch drafod hyn gyda'r llys.",
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  separateWaitingRoom: 'ystafell aros ar wahân yn yr adeilad llys',
  separateExitEntrance: 'mynedfa ac allanfa ar wahân o’r adeilad llys',
  screenWithOtherPeople:
    'cael eich cysgodi gan sgrin breifatrwydd yn ystafell y llys (byddai sgrin breifatrwydd yn golygu na fyddai’r atebydd yn gallu eich gweld tra byddech yn yr ystafell llys).',
  videoLinks:
    'ymuno â’r gwrandawiad drwy gyswllt fideo yn hytrach na bod yno wyneb yn wyneb (penderfyniad y barnwr yw p’un a ddylid caniatáu gwrandawiad drwy gyswllt fideo ai peidio).',
  noSafetyRequirements: 'Nac oes, nid oes arnaf angen unrhyw ofynion o ran diogelwch ar hyn o bryd',
  courtGuidanceText: 'Efallai y bydd staff y llys yn cysylltu â chi ynghylch eich gofynion.',
  errors: {
    ra_specialArrangements: {
      required: "Dewiswch p'un a oes angen trefniadau arbennig arnoch chi neu'r plant yn y llys",
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > applying-with > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/c100-rebuild/reasonable-adjustments/special-arrangements',
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain specialArrangements field', () => {
    const specialArrangementsField = fields.ra_specialArrangements as FormOptions;

    expect(specialArrangementsField.type).toBe('checkboxes');
    expect(specialArrangementsField.labelHidden).toBe(true);
    expect((specialArrangementsField.label as LanguageLookup)(generatedContent)).toBe(en.headingTitle);

    expect((specialArrangementsField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((specialArrangementsField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.separateWaitingRoom);
    expect((specialArrangementsField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.separateExitEntrance
    );
    expect((specialArrangementsField.values[2].label as LanguageLookup)(generatedContent)).toBe(
      en.screenWithOtherPeople
    );
    expect((specialArrangementsField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.videoLinks);
    expect((specialArrangementsField.values[5].label as LanguageLookup)(generatedContent)).toBe(
      en.noSafetyRequirements
    );
    expect(specialArrangementsField.values[5].exclusive).toBe(true);

    const courtGuidanceField = fields.ra_specialArrangementsCourtGuidanceText as FormOptions;

    expect(courtGuidanceField.type).toBe('label');
    expect((courtGuidanceField.label as LanguageLookup)(generatedContent)).toBe(en.courtGuidanceText);
  });

  test('should contain correct values when not c100 journey', () => {
    commonContent.additionalData!.req.originalUrl = 'applicant/reasonable-adjustments/special-arrangements';
    generatedContent = generateContent(commonContent);
    const specialArrangementsField = generatedContent.form.fields.ra_specialArrangements as FormOptions;

    expect(specialArrangementsField.values[0].value).toBe('waitingroom');
    expect(specialArrangementsField.values[1].value).toBe('separateexitentry');
    expect(specialArrangementsField.values[2].value).toBe('screens');
    expect(specialArrangementsField.values[3].value).toBe('videolinks');
    expect(specialArrangementsField.values[5].value).toBe('noSafetyrequirements');
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
