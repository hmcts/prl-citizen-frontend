import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
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
    },
    ra_differentTypeChair_subfield: {
      required: 'Describe what type of chair you need',
    },
    ra_travellingCourtOther_subfield: {
      required: 'Describe what help you need if travelling to, or moving around court buildings',
    },
    ra_travellingCourt: {
      required: 'Select what help you need if travelling to, or moving around court buildings',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
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
      required: 'Describe why you need a parking space close to the venue - welsh',
    },
    ra_differentTypeChair_subfield: {
      required: 'Describe what type of chair you need - welsh',
    },
    ra_travellingCourtOther_subfield: {
      required: 'Describe what help you need if travelling to, or moving around court buildings - welsh',
    },
    ra_travellingCourt: {
      required: 'Select what help you need if travelling to, or moving around court buildings - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > applying-with > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
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

    expect(travellingCourtField.values[9].behaviour).toBe('exclusive');
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
