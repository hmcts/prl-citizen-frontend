import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import { en as english, cy as welsh } from '../../../common/keep-details-private/details_known/content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */

const en = {
  ...english,
  title: 'Does the other person named in your application (the respondent) know any of your contact details?',
  line2:
    'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
};

const cy = {
  ...welsh,
  title:
    'Ydych chi eisiau cadw eich manylion cyswllt yn breifat oddi wrth y bobl eraill a enwir yn y cais (yr atebwyr)?',
  line2:
    "Bydd eich cais yn cael ei rannu gyda'r unigolyn arall yn yr achos (yr atebydd). Mae hyn yn cynnwys eich manylion cyswllt, oni bai eich bod yn gofyn i'r llys beidio â rhannu'r manylion hyn.",
};

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

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual(
      'Does the other person named in your application (the respondent) know any of your contact details?'
    );
    expect(generatedContent.section).toEqual('Keeping your contact details private');
  });

  test('should contain detailsKnown field', () => {
    const detailsKnownField = fields.detailsKnown as FormOptions;
    expect(detailsKnownField.type).toBe('radios');
    expect(detailsKnownField.classes).toBe('govuk-radios');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
