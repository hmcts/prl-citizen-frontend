import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'Reasonable adjustments',
  headingTitle: 'I need help travelling to, or moving around court buildings',
  //line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  parkingSpace: 'Parking space close to the venue',
  parkingSpace_subfield: 'Describe why you need this',
  wheelchairAccess: 'Step free / wheelchair access',
  venueWheelchair: 'Use of venue wheelchair',
  accessToilet: 'Accessible toilet',
  helpUsingLift: 'Help using a lift',
  differentTypeChair: 'A different type of chair',
  differentTypeChair_subfield: 'Describe why you need',
  differentTypeChairSubFieldHint: 'For example, a chair with back support',
  guideBuilding: 'Guiding in the building',
  travellingCourtOther: 'Other',
  travellingCourtOther_subfield: 'Describe what you need',
  travellingCourtNoOption: 'No, I do not need any support at this time',
  errors: {
    ra_parkingSpace_subfield: {
      required: 'Describe why you need a parking space close to the venue',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_differentTypeChair_subfield: {
      required: 'Describe what type of chair you need',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_travellingCourtOther_subfield: {
      required: 'Describe what help you need if travelling to, or moving around court buildings',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_travellingCourt: {
      required: 'Select what help you need if travelling to, or moving around court buildings',
    },
  },
};

const cy = {
  caption: 'Addasiadau rhesymol',
  headingTitle: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
  //line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  parkingSpace: "Lle parcio yn agos i'r lleoliad",
  parkingSpace_subfield: 'Disgrifiwch pam fod arnoch angen hyn',
  wheelchairAccess: 'Dim gris / mynediad ar gyfer cadair olwyn',
  venueWheelchair: 'Y gallu i ddefnyddio cadair olwyn a geir yn y lleoliad',
  accessToilet: 'Toiledau hygyrch',
  helpUsingLift: 'Help i ddefnyddio lifft',
  differentTypeChair: 'Math gwahanol o gadair',
  differentTypeChair_subfield: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  differentTypeChairSubFieldHint: 'Er enghraifft, cadair â chymorth cefn',
  guideBuilding: 'Cymorth i fynd o amgylch yr adeilad',
  travellingCourtOther: 'Arall',
  travellingCourtOther_subfield: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  travellingCourtNoOption: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  errors: {
    ra_parkingSpace_subfield: {
      required: "Disgrifiwch pam fod arnoch angen lle parcio yn agos i'r lleoliad",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_differentTypeChair_subfield: {
      required: 'Disgrifiwch pa fath o gadair sydd ei hangen arnoch',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_travellingCourtOther_subfield: {
      required:
        "Disgrifiwch pa help sydd ei angen arnoch os ydych chi'n teithio i adeiladau'r llys, neu symud o gwmpas adeiladau'r llys",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_travellingCourt: {
      required:
        "Dewiswch pa gymorth sydd ei angen arnoch os ydych chi'n teithio i adeiladau'r llys, neu symud o gwmpas adeiladau'r llys",
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > applying-with > content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        originalUrl: '/c100-rebuild/reasonable-adjustments/needs-in-court',
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

  test('should contain travellingCourt field', () => {
    const travellingCourtField = fields.ra_travellingCourt as FormOptions;
    const parkingSpace_subfields = travellingCourtField.values[0].subFields?.ra_parkingSpace_subfield as FormOptions;

    expect(travellingCourtField.type).toBe('checkboxes');
    expect(parkingSpace_subfields.type).toBe('textarea');
    expect((parkingSpace_subfields?.label as Function)(generatedContent)).toBe(en.parkingSpace_subfield);

    (travellingCourtField.validator as Function)('parkingSpace');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('parkingSpace');

    (parkingSpace_subfields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    const differentTypeChairSubFields = travellingCourtField.values[5].subFields
      ?.ra_differentTypeChair_subfield as FormOptions;

    expect(travellingCourtField.type).toBe('checkboxes');
    expect(differentTypeChairSubFields.type).toBe('textarea');
    expect((differentTypeChairSubFields?.label as Function)(generatedContent)).toBe(en.differentTypeChair_subfield);
    expect((differentTypeChairSubFields?.hint as Function)(generatedContent)).toBe(en.differentTypeChairSubFieldHint);

    (differentTypeChairSubFields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    const travellingCourtOther_subfields = travellingCourtField.values[7].subFields
      ?.ra_travellingCourtOther_subfield as FormOptions;

    expect(travellingCourtOther_subfields.type).toBe('textarea');
    expect((travellingCourtOther_subfields?.label as Function)(generatedContent)).toBe(
      en.travellingCourtOther_subfield
    );

    (travellingCourtOther_subfields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    expect(travellingCourtField.type).toBe('checkboxes');
    //expect(friendFamilyMemberSubFields.type).toBe('textarea');

    expect((travellingCourtField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((travellingCourtField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.parkingSpace);
    expect((travellingCourtField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.wheelchairAccess);
    expect((travellingCourtField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.venueWheelchair);
    expect((travellingCourtField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.accessToilet);
    expect((travellingCourtField.values[4].label as LanguageLookup)(generatedContent)).toBe(en.helpUsingLift);
    expect((travellingCourtField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.differentTypeChair);
    expect((travellingCourtField.values[6].label as LanguageLookup)(generatedContent)).toBe(en.guideBuilding);
    expect((travellingCourtField.values[7].label as LanguageLookup)(generatedContent)).toBe(en.travellingCourtOther);
    expect((travellingCourtField.values[9].label as LanguageLookup)(generatedContent)).toBe(en.travellingCourtNoOption);

    expect(travellingCourtField.values[9].exclusive).toBe(true);
  });

  test('should contain correct values when not c100 journey', () => {
    commonContent.additionalData!.req.originalUrl = 'applicant/reasonable-adjustments/needs-in-court';
    generatedContent = generateContent(commonContent);
    const travellingCourtField = generatedContent.form.fields.ra_travellingCourt as FormOptions;

    expect(travellingCourtField.values[0].value).toBe('parkingspace');
    expect(travellingCourtField.values[1].value).toBe('stepfree');
    expect(travellingCourtField.values[2].value).toBe('wheelchair');
    expect(travellingCourtField.values[3].value).toBe('toilet');
    expect(travellingCourtField.values[4].value).toBe('lift');
    expect(travellingCourtField.values[5].value).toBe('differentchair');
    expect(travellingCourtField.values[6].value).toBe('building');
    expect(travellingCourtField.values[7].value).toBe('other');
    expect(travellingCourtField.values[9].value).toBe('nosupport');
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
