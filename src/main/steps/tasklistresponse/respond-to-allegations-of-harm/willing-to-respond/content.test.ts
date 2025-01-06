/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  caption: 'Respond to allegations of harm and violence',
  title: 'The allegations',
  content1: 'Before responding, review the allegations made by the applicant:',
  content2: 'Allegations of harm and violence (C1A) (Opens in new tab)',
  content3:
    'If you do not agree with the allegations made by the applicant, you can respond and give your point of view. All the people in this application will be able to see your comments.',
  content4: "If you choose not to respond to the allegations now, you'll still be able to respond in court.",
  yes: 'Yes',
  no: 'No',
  wishToRespondLabel: "Do you wish to respond to the applicant's allegations of harm?",
  errors: {
    aoh_wishToRespond: {
      required: 'Select yes if you want to respond now',
    },
  },
};

const cy: typeof en = {
  caption: 'Ymateb i honiadau o niwed a thrais',
  title: 'Yr honiadau',
  content1: 'Cyn ymateb, adolygwch yr honiadau a wnaed gan y ceisydd:',
  content2: 'Allegations of harm and violence (C1A) (Opens in new tab) - welsh',
  content3:
    'Os nad ydych yn cytuno â’r honiadau a wnaed gan y ceisydd, gallwch ymateb a rhoi ei barn chi. Bydd pawb sy’n rhan o’r cais hwn yn gallu gweld eich sylwadau.',
  content4: 'Os byddwch yn dewis peidio ag ymateb i’r honiadau nawr, byddwch dal yn gallu ymateb yn y llys.',
  yes: 'Ydw',
  no: 'Nac ydyw',
  wishToRespondLabel: 'Ydych chi eisiau ymateb i honiadau o niwed y ceisydd?',
  errors: {
    aoh_wishToRespond: {
      required: 'Dewiswch ‘Ydw’ os ydych eisiau ymateb nawr',
    },
  },
};

describe('tasklistresponse > respond-to-allegations-of-harm > willing-to-respond > content', () => {
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
    const wishToRespondField = fields.aoh_wishToRespond as FormOptions;
    expect((wishToRespondField.label as Function)(generatedContent)).toBe(en.wishToRespondLabel);
    expect((wishToRespondField.values[0].label as Function)(generatedContent)).toBe(en.yes);
    expect((wishToRespondField.values[1].label as Function)(generatedContent)).toBe(en.no);
    expect(wishToRespondField.validator).toBe(isFieldFilledIn);
  });

  test('should contain cancel link', () => {
    expect(form.link.text(generatePageContent({ language: 'en' }))).toBe('Cancel');
    expect(form.link.href).toBe('/tasklistresponse/start');
  });

  test('should contain onlyContinue button', () => {
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
