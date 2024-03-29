import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
import { miam_collapse_content_cy, miam_collapse_content_en } from './miam-details-content';

const enContent = {
  title: 'Have you attended a Mediation Information and Assessment Meeting (MIAM)?',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  miamDetailsLabel: 'What is a Mediation Information and Assessment Meeting (MIAM)?',
  miamSubFields: miam_collapse_content_en,
  onlyContinue: 'Continue',
  errors: {
    miamStart: {
      required: 'Select yes if you have attended a Mediation Information and Assessment Meeting (MIAM)',
    },
  },
};

const cyContent = {
  title: 'A ydych chi wedi mynychu Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)?',
  one: 'Do',
  two: 'Naddo',
  three: 'Nid wyf yn gwybod',
  miamDetailsLabel: 'Beth yw Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)?',
  miamSubFields: miam_collapse_content_cy,
  onlyContinue: 'Parhau',
  errors: {
    miamStart: {
      required: 'Dewiswch do os ydych chi wedi mynychu Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
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
    expect(generatedContent.title).toEqual('Have you attended a Mediation Information and Assessment Meeting (MIAM)?');
    expect(generatedContent.miamDetailsLabel).toEqual('What is a Mediation Information and Assessment Meeting (MIAM)?');
    expect(generatedContent.one).toEqual('Yes');
    expect(generatedContent.two).toEqual('No');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain startAlternative field', () => {
    const miamStartField = fields.miamStart as FormOptions;
    const miamDetailsField = fields.miamDetails as FormInput;

    expect((miamDetailsField.label as Function)(generatedContent)).toBe(enContent.miamDetailsLabel);
    expect((miamDetailsField.detailsHtml as Function)(generatedContent)).toBe(enContent.miamSubFields);

    expect(miamStartField.type).toBe('radios');
    expect(miamStartField.classes).toBe('govuk-radios');
    (miamStartField.validator as Function)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');

    expect((miamStartField.values[0].label as Function)(generatedContent)).toBe(enContent.one);
    expect((miamStartField.values[1].label as Function)(generatedContent)).toBe(enContent.two);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
