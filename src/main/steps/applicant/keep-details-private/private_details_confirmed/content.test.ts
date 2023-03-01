import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import { en as english, cy as welsh } from '../../../common/keep-details-private/private_details_confirmed/content';


import { generateContent } from './content';

const enContent = {
  ...english,
  section: 'Keeping your contact details private',
  line3:
    'The court will hold this information securely. These contact details will only be shared if there is a court order to do so.',
  continue: 'Save and continue',
};

const cyContent = {
  ...welsh,
  section: 'Keeping your contact details private',
  line3:
    'The court will hold this information securely. These contact details will only be shared if there is a court order to do so.',
  continue: 'Save and continue',
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('The court will keep your contact details private');
    expect(generatedContent.line2).toEqual('What the court will do');
    expect(generatedContent.line3).toEqual(
      'The court will hold this information securely. These contact details will only be shared if there is a court order to do so.'
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

  test('should contain Save and continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
