import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Safety concerns',
  title: 'Your safety',
  line1: 'What you told us',
  line2: 'You have not suffered or are not at risk of suffering: ',
  line3: 'psychological abuse',
  line4: 'financial abuse',
  line5: 'emotional abuse',
  line6: 'physical abuse',
  line7: 'sexual abuse',
  line8:
    'Based on your answer, we will not ask you any more questions about domestic violence or abuse. You can continue your response.',
  line9: 'Are you unsure about the answer you gave?',
  line10: 'Have a look at the following information if you are unsure about your answer.',
  line11: '*These links are a placeholder and will changes',
  line12: 'Find out about the signs of domestic violence or abuse',
  line13: 'Lorem ipsum about Womens aid',
  line14: 'If you are a man and have concerns for your safety',
  line15: 'National Domestic Violence Helpline',
  line16: 'If you want to change your answer, go back to the previous screen.',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  goBack: 'Go back',
};

const cyContent = {
  section: 'Safety concerns',
  title: 'Your safety',
  line1: 'What you told us',
  line2: 'You have not suffered or are not at risk of suffering: ',
  line3: 'psychological abuse',
  line4: 'financial abuse',
  line5: 'emotional abuse',
  line6: 'physical abuse',
  line7: 'sexual abuse',
  line8:
    'Based on your answer, we will not ask you any more questions about domestic violence or abuse. You can continue your response.',
  line9: 'Are you unsure about the answer you gave?',
  line10: 'Have a look at the following information if you are unsure about your answer.',
  line11: 'These links are a placeholder and will changes',
  line12: 'Find out about the signs of domestic violence or abuse',
  line13: 'Lorem ipsum about Womens aid',
  line14: 'If you are a man and have concerns for your safety',
  line15: 'National Domestic Violence Helpline',
  line16: 'If you want to change your answer, go back to the previous screen.',
  summaryText: 'Contacts for help',
  continue: 'Continue',
  goBack: 'Go back',
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('doemstic_abuse_risk content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Your safety');
    expect(generatedContent.section).toEqual('Safety concerns');
    expect(generatedContent.line1).toEqual('What you told us');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should onlyContinue continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Continue');
  });
});
