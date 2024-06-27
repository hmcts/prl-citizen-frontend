import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import {
  CommonContent,
  cy as commonContentCy,
  en as commonContentEn,
  generatePageContent,
} from '../../../common/common.content';
import { languages as willingToRespondLanguages } from '../willing-to-respond/content';
import { languages as yourResponseLanguages } from '../your-response/content';

import { generateContent } from './content';

const en = {
  ...commonContentEn,
  caption: 'Respond to allegations of harm and violence',
  title: 'Check your answers',
  content1: 'Case number:',
  wishToRespondLabel: "Do you wish to respond to the applicant's allegations of harm and violence?",
  responseToAohLabel: yourResponseLanguages.en.responseToAohLabel,
  yes: willingToRespondLanguages.en.yes,
  no: willingToRespondLanguages.en.no,
  submit: 'Submit',
};

const cy: typeof en = {
  ...commonContentCy,
  caption: 'Ymateb i honiadau o niwed a thrais',
  title: 'Ymateb i’r honiadau',
  content1: 'Rhif yr achos:',
  wishToRespondLabel: 'Ydych chi eisiau ymateb i honiadau o niwed a thrais y ceisydd?',
  responseToAohLabel: yourResponseLanguages.cy.responseToAohLabel,
  yes: willingToRespondLanguages.cy.yes,
  no: willingToRespondLanguages.cy.no,
  submit: 'Cyflwyno',
};

describe('tasklistresponse > respond-to-allegations-of-harm >  review > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generatedContent);
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain cancel link', () => {
    expect(form.link.text(generatePageContent({ language: 'en' }))).toBe('Cancel');
    expect(form.link.href).toBe('/tasklistresponse/start');
  });

  test('should contain submit button', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    expect((form.submit?.text as Function)(generatedContent)).toBe(en.submit);
  });
});
