import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Safety concerns',
  title: 'Your safety',
  line1:
    'The court needs to know if you have suffered, or are at risk of suffering, any form of domestic violence or abuse.',
  line2: 'The following questions will ask whether you have suffered, or are at risk of suffering, any form of harm.',
  line3: 'Find out about the signs of domestic violence or abuse',

  continue: 'Continue',
};

const cyContent = {
  section: 'Safety concerns',
  title: 'Your safety',
  line1:
    'The court needs to know if you have suffered, or are at risk of suffering, any form of domestic violence or abuse.',
  line2: 'The following questions will ask whether you have suffered, or are at risk of suffering, any form of harm.',
  line3: 'Find out about the signs of domestic violence or abuse',

  continue: 'Continue',
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
    expect(generatedContent.section).toEqual('Safety concerns');
    expect(generatedContent.title).toEqual('Your safety');
    expect(generatedContent.line1).toEqual(
      'The court needs to know if you have suffered, or are at risk of suffering, any form of domestic violence or abuse.'
    );
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
