import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child arrangements',
  title: 'You do not have to attend a MIAM',
  safetyConcerns:
    'As there are (or have been) safety concerns about the children, you do not have to attend a Mediation Information and Assessment Meeting (MIAM).',
  giveDetails: 'You will be asked to give details of the proceedings in the following screens.',
};

const cy = {
  serviceName: 'Child arrangements - welsh',
  title: 'Nid oes rhaid ichi fynychu MIAM',
  safetyConcerns:
    'Gan fod pryderon diogelwch (neu fod problemau diogelwch wedi bod) mewn perthynas â’r plant, nid oes rhaid i chi fynychu Cyfarfod Asesu Gwybodaeth am Gyfryngu (MIAM).',
  giveDetails: 'Gofynnir i chi roi manylion yr achos yn y sgriniau canlynol.',
};

describe('applicant personal details > applying-with > content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Continue button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent | undefined;
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
