import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'Special arrangements',
  headingTitle: 'Do you or the children need special arrangements at court?',
  line1:
    'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court.',
  select_all_apply: 'Select all that apply to you',
  separateWaitingRoom: 'Separate waiting room',
  separateExitEntrance: 'Separate exits and entrances',
  screenWithOtherPeople: 'Screens so you and the other people in the case cannot see each other',
  screenWithOtherPeopleHint: 'This needs to be approved by a judge',
  separateToilets: 'Separate toilets',
  visitCourtBeforeHearing: 'Visit to court before the hearing',
  videoLinks: 'Video links',
  videoLinksHint: 'This needs to be approved by a judge',
  specialArrangementsOther: 'Other',
  specialArrangementsOther_subfield: 'Provide details of what you or the children need',
  noSafetyRequirements: 'No, I do not have any safety requirements at this time',
  errors: {
    ra_specialArrangementsOther_subfield: {
      required: 'Give details of the special arrangements you or the children need',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
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
  separateWaitingRoom: 'Ystafell aros ar wahân',
  separateExitEntrance: "Drysau ar wahân i fynd i mewn ac allan o'r llys",
  screenWithOtherPeople: 'Sgriniau i atal chi a’r bobl eraill yn yr achos rhag gweld eich gilydd',
  screenWithOtherPeopleHint: 'Mae angen i farnwr gymeradwyo hyn',
  separateToilets: 'Toiledau ar wahân',
  visitCourtBeforeHearing: "Ymweld â'r llys cyn y gwrandawiad",
  videoLinks: 'Cyswllt fideo',
  videoLinksHint: 'Mae angen i farnwr gymeradwyo hyn',
  specialArrangementsOther: 'Arall',
  specialArrangementsOther_subfield: 'Darparwch fanylion am yr hyn rydych chi neu’r plant ei angen',
  noSafetyRequirements: 'Nac oes, nid oes arnaf angen unrhyw ofynion o ran diogelwch ar hyn o bryd',
  errors: {
    ra_specialArrangementsOther_subfield: {
      required: "Rhowch fanylion y trefniadau arbennig sydd eu hangen arnoch chi neu'r plant",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
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
    const specialArrangementsOtherSubFields = specialArrangementsField.values[6].subFields
      ?.ra_specialArrangementsOther_subfield as FormOptions;

    expect(specialArrangementsField.type).toBe('checkboxes');
    expect(specialArrangementsOtherSubFields.type).toBe('textarea');
    expect((specialArrangementsOtherSubFields?.label as Function)(generatedContent)).toBe(
      en.specialArrangementsOther_subfield
    );

    expect((specialArrangementsField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((specialArrangementsField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.separateWaitingRoom);
    expect((specialArrangementsField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.separateExitEntrance
    );
    expect((specialArrangementsField.values[2].label as LanguageLookup)(generatedContent)).toBe(
      en.screenWithOtherPeople
    );
    expect((specialArrangementsField.values[2].hint as LanguageLookup)(generatedContent)).toBe(
      en.screenWithOtherPeopleHint
    );
    expect((specialArrangementsField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.separateToilets);
    expect((specialArrangementsField.values[4].label as LanguageLookup)(generatedContent)).toBe(
      en.visitCourtBeforeHearing
    );
    expect((specialArrangementsField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.videoLinks);
    expect((specialArrangementsField.values[5].hint as LanguageLookup)(generatedContent)).toBe(en.videoLinksHint);
    expect((specialArrangementsField.values[6].label as LanguageLookup)(generatedContent)).toBe(
      en.specialArrangementsOther
    );
    expect((specialArrangementsField.values[8].label as LanguageLookup)(generatedContent)).toBe(
      en.noSafetyRequirements
    );

    expect(specialArrangementsField.values[8].exclusive).toBe(true);

    (specialArrangementsField.validator as Function)('separateWaitingRoom');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('separateWaitingRoom');

    (specialArrangementsOtherSubFields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
  });

  test('should contain correct values when not c100 journey', () => {
    commonContent.additionalData!.req.originalUrl = 'applicant/reasonable-adjustments/special-arrangements';
    generatedContent = generateContent(commonContent);
    const specialArrangementsField = generatedContent.form.fields.ra_specialArrangements as FormOptions;

    expect(specialArrangementsField.values[0].value).toBe('waitingroom');
    expect(specialArrangementsField.values[1].value).toBe('separateexitentry');
    expect(specialArrangementsField.values[2].value).toBe('screens');
    expect(specialArrangementsField.values[3].value).toBe('separatetoilets');
    expect(specialArrangementsField.values[4].value).toBe('visitToCourt');
    expect(specialArrangementsField.values[5].value).toBe('videolinks');
    expect(specialArrangementsField.values[6].value).toBe('other');
    expect(specialArrangementsField.values[8].value).toBe('noSafetyrequirements');
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
