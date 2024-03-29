import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need help travelling to, or moving around court buildings',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  parkingspace: 'Parking space close to the venue',
  parkingSpaceDetails: 'Describe why you need this',
  stepfree: 'Step free / wheelchair access',
  wheelchair: 'Use of venue wheelchair',
  toilet: 'Accessible toilet',
  lift: 'Help using a lift',
  differentchair: 'A different type of chair',
  differentChairDetails: 'Describe what you need',
  differentChairDetailsHint: 'For example, a chair with back support',
  building: 'Guiding in the building',
  other: 'Other',
  otherDetails: 'Describe what you need',
  nosupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    travellingToCourt: {
      required: 'Please select an answer',
    },
    parkingDetails: {
      required: 'Please describe parking space details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    differentChairDetails: {
      required: 'Please describe different chair details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    travellingOtherDetails: {
      required: 'Please describe your need in detail',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  parkingspace: "Lle parcio yn agos i'r lleoliad",
  parkingSpaceDetails: 'Disgrifiwch pam fod arnoch angen hyn',
  stepfree: 'Dim grisiau / mynediad ar gyfer cadair olwyn',
  wheelchair: 'Y gallu i ddefnyddio cadair olwyn a geir yn y lleoliad',
  toilet: 'Toiledau hygyrch',
  lift: 'Help i ddefnyddio lifft',
  differentchair: 'Math gwahanol o gadair',
  differentChairDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  differentChairDetailsHint: 'Er enghraifft, cadair â chymorth cefn',
  building: 'Cymorth i fynd o amgylch yr adeilad',
  other: 'Arall',
  otherDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    travellingToCourt: {
      required: 'Dewiswch ateb, os gwelwch yn dda',
    },
    parkingDetails: {
      required: 'Rhowch fanylion y lle parcio',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    differentChairDetails: {
      required: 'Rhowch fanylion y math gwahanol o gadair',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    travellingOtherDetails: {
      required: 'Disgrifiwch eich anghenion yn fanwl',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('I need help travelling to, or moving around court buildings');
    expect(generatedContent.section).toEqual('Reasonable adjustments');
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.parkingspace).toEqual('Parking space close to the venue');
    expect(generatedContent.stepfree).toEqual('Step free / wheelchair access');
    expect(generatedContent.wheelchair).toEqual('Use of venue wheelchair');
    expect(generatedContent.toilet).toEqual('Accessible toilet');
    expect(generatedContent.lift).toEqual('Help using a lift');
    expect(generatedContent.differentchair).toEqual('A different type of chair');
    expect(generatedContent.building).toEqual('Guiding in the building');
    expect(generatedContent.other).toEqual('Other');
    expect(generatedContent.nosupport).toEqual('No, I do not need any extra support at this time');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain courthearing field', () => {
    const travellingtoCourtField = fields.travellingToCourt as FormOptions;
    expect(travellingtoCourtField.type).toBe('checkboxes');
    expect((travellingtoCourtField.section as Function)(generatedContent)).toBe(en.section);
    expect((travellingtoCourtField.hint as Function)(generatedContent)).toBe(en.optionHint);
    expect((travellingtoCourtField.section as Function)(generatedContent)).toBe(en.section);
    expect((travellingtoCourtField.values[0].label as Function)(generatedContent)).toBe(en.parkingspace);
    expect((travellingtoCourtField.values[0].subFields?.parkingDetails.label as Function)(generatedContent)).toBe(
      en.parkingSpaceDetails
    );
    (travellingtoCourtField.values[0].subFields?.parkingDetails.validator as Function)('test');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test');
    expect((travellingtoCourtField.values[1].label as Function)(generatedContent)).toBe(en.stepfree);
    expect((travellingtoCourtField.values[2].label as Function)(generatedContent)).toBe(en.wheelchair);
    expect((travellingtoCourtField.values[3].label as Function)(generatedContent)).toBe(en.toilet);
    expect((travellingtoCourtField.values[4].label as Function)(generatedContent)).toBe(en.lift);
    expect((travellingtoCourtField.values[5].label as Function)(generatedContent)).toBe(en.differentchair);
    expect(
      (travellingtoCourtField.values[5].subFields?.differentChairDetails.label as Function)(generatedContent)
    ).toBe(en.differentChairDetails);
    expect((travellingtoCourtField.values[5].subFields?.differentChairDetails.hint as Function)(generatedContent)).toBe(
      en.differentChairDetailsHint
    );
    (travellingtoCourtField.values[5].subFields?.differentChairDetails.validator as Function)('test');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test');
    expect((travellingtoCourtField.values[6].label as Function)(generatedContent)).toBe(en.building);
    expect((travellingtoCourtField.values[7].label as Function)(generatedContent)).toBe(en.other);
    expect(
      (travellingtoCourtField.values[7].subFields?.travellingOtherDetails.label as Function)(generatedContent)
    ).toBe(en.otherDetails);
    (travellingtoCourtField.values[7].subFields?.travellingOtherDetails.validator as Function)('test');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test');
    expect(
      (travellingtoCourtField.values[8].divider as LanguageLookup)(
        generatePageContent({ language: 'en' }) as Record<string, never>
      )
    ).toBe('or');
    expect((travellingtoCourtField.values[9].label as Function)(generatedContent)).toBe(en.nosupport);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
