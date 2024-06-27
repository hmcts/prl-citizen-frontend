/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'Respond to allegations of harm and violence',
  title: 'Respond to the allegations',
  content1:
    'Give your response to each of the points made by the applicant. Try to explain what happened as best you can.',
  content2: 'You will have the chance to give a more detailed statement later in court.',
  content3: 'Include any evidence that is relevant to the allegations.',
  responseToAohLabel: 'Your response',
  responseToAohHint: 'Include times, dates and details of what happened.',
  errors: {
    aoh_responseToAllegations: {
      required: 'You must give details if you want to respond to the allegations',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  caption: 'Ymateb i honiadau o niwed a thrais',
  title: 'Ymateb i’r honiadau',
  content1:
    'Rhowch eich ymateb i bob un o’r pwyntiau a wnaed gan y ceisydd. Ceisiwch egluro beth ddigwyddodd y gorau y gallwch chi.',
  content2: 'Cewch gyfle i roi datganiad manylach yn nes ymlaen yn y llys.',
  content3: 'Dylech gynnwys unrhyw dystiolaeth sy’n berthnasol i’r honiadau.',
  responseToAohLabel: 'Eich ymateb',
  responseToAohHint: 'Dylech gynnwys amseroedd, dyddiadau a manylion beth ddigwyddodd.',
  errors: {
    aoh_responseToAllegations: {
      required: 'Mae’n rhaid i chi roi manylion os ydych eisiau ymateb i’r honiadau',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

describe('tasklistresponse > respond-to-allegations-of-harm > your-response > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
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
    languageAssertions('en', en, () => generatedContent);
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain correct fields', () => {
    const responseToAllegationsField = fields.aoh_responseToAllegations as FormFields;
    expect((responseToAllegationsField.label as Function)(generatedContent)).toBe(en.responseToAohLabel);
    expect((responseToAllegationsField.hint as Function)(generatedContent)).toBe(en.responseToAohHint);
    (responseToAllegationsField.validator as Function)('test');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test');
    expect(isTextAreaValid).toHaveBeenCalledWith('test');
  });

  test('should contain cancel link', () => {
    expect(form.link.text(generatePageContent({ language: 'en' }))).toBe('Cancel');
    expect(form.link.href).toBe('/tasklistresponse/start');
  });

  test('should contain onlyContinue button', () => {
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });
});
