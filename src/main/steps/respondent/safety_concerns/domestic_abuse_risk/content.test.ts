import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Safety concerns',
  title: 'Have you suffered or are you at risk of suffering domestic violence or abuse?',
  line1: 'Only include abuse by the people in this application or someone connected to them.',
  line2: 'Domestic violence or abuse includes incidents or a pattern of incidents of abusive or violent behaviour.',
  line3: 'This may include:',
  line4: 'controlling, threatening or coercive behaviour',
  line5: 'violence',
  line6: 'abuse',
  line7:
    'The incidents must have taken place between people who are aged 16 or over, who are current (or former) intimate partners or family members.',
  line8: 'Domestic violence or abuse can occur no matter what their gender or sexuality of the people involved.',
  line9: 'Examples include:',
  line10: 'psychological abuse',
  line11: 'financial abuse',
  line12: 'emotional abuse',
  line13: 'physical abuse',
  line14: 'sexual abuse',
  line15:
    'It also includes culturally specific forms of abuse, including forced marriage, honour-based violence and dowry-related abuse.',
  one: 'Yes',
  two: 'No',
  saveAndContinue: 'Save and Continue',
};

const cyContent = {
  section: 'Pryderon diogelwch',
  title: 'Have you suffered or are you at risk of suffering domestic violence or abuse?',
  line1: 'Only include abuse by the people in this application or someone connected to them.',
  line2: 'Domestic violence or abuse includes incidents or a pattern of incidents of abusive or violent behaviour.',
  line3: 'This may include:',
  line4: 'controlling, threatening or coercive behaviour',
  line5: 'violence',
  line6: 'abuse',
  line7:
    'The incidents must have taken place between people who are aged 16 or over, who are current (or former) intimate partners or family members.',
  line8: 'Domestic violence or abuse can occur no matter what their gender or sexuality of the people involved.',
  line9: 'Examples include:',
  line10: 'cam-drin seicolegol',
  line11: 'cam-drin ariannol',
  line12: 'cam-drin emosiynol',
  line13: 'cam-drin corfforol',
  line14: 'cam-drin rhywiol',
  line15:
    'It also includes culturally specific forms of abuse, including forced marriage, honour-based violence and dowry-related abuse.',
  one: 'Yes',
  two: 'No',
  saveAndContinue: 'Save and Continue',
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('doemstic_abuse_risk content', () => {
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
    expect(generatedContent.title).toEqual(
      'Have you suffered or are you at risk of suffering domestic violence or abuse?'
    );
    expect(generatedContent.section).toEqual('Safety concerns');
    expect(generatedContent.line1).toEqual(
      'Only include abuse by the people in this application or someone connected to them.'
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

  test('should contain detailsKnown field', () => {
    const safetyConcerns = fields.safetyConcerns as FormOptions;
    expect(safetyConcerns.type).toBe('radios');
    expect(safetyConcerns.classes).toBe('govuk-radios');
    expect((safetyConcerns.label as Function)(generatedContent)).toBe(undefined);
    expect((safetyConcerns.section as Function)(generatedContent)).toBe(enContent.section);
    expect((safetyConcerns.values[0].label as Function)(generatedContent)).toBe(enContent.one);
    expect((safetyConcerns.values[1].label as Function)(generatedContent)).toBe(enContent.two);
    expect((safetyConcerns.values[2].label as Function)(generatedContent)).toBe(undefined);

    (safetyConcerns.validator as Function)(generatedContent);
    expect(isFieldFilledIn).toHaveBeenCalled();
  });

  test('should onlyContinue continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and Continue');
  });
});
