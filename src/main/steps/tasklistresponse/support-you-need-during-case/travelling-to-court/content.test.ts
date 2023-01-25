import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

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
    },
    differentChairDetails: {
      required: 'Please describe different chair details',
    },
    travellingOtherDetails: {
      required: 'Please describe your need in detail',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
  optionHint: "Dewiswch bob un sy'n berthnasol i chi",
  summaryText: 'Contacts for help',
  parkingspace: "Lle parcio yn agos i'r lleoliad",
  parkingSpaceDetails: 'Describe why you need this',
  stepfree: 'Dim grisiau / mynediad ar gyfer cadair olwyn',
  wheelchair: 'Y gallu i ddefnyddio cadair olwyn a geir yn y lleoliad',
  toilet: 'Toiledau hygyrch',
  lift: 'Help i ddefnyddio lifft',
  differentchair: 'Math gwahanol o gadair',
  differentChairDetails: 'Describe what you need',
  differentChairDetailsHint: 'For example, a chair with back support',
  building: 'Cymorth i fynd o amgylch yr adeilad',
  other: 'Arall',
  otherDetails: 'Describe what you need',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Continue',
  errors: {
    travellingToCourt: {
      required: 'Please select an answer',
    },
    parkingDetails: {
      required: 'Please describe parking space details',
    },
    differentChairDetails: {
      required: 'Please describe different chair details',
    },
    travellingOtherDetails: {
      required: 'Please describe your need in detail',
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
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
