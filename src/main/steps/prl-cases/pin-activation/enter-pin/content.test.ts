import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Access your case',
  paragraph:
    'Access and manage your case using your case number and access code. These will be in the letter, email or pack sent by the court.',
  caseNumberLabel: 'Enter your case number',
  caseNumberHintText: 'This is a 16-digit number',
  accessCodeLabel: 'Enter your access code',
  accessCodeHintText: 'This has 8 characters',
  saveAndContinue: 'Save and continue',
  errors: {
    caseCode: {
      required: 'Enter your case code',
      invalid: 'The case code must be made up of 16 digits',
      notNumeric: 'Case code must be numeric',
      invalidCaseCode: 'Enter your case code',
    },
    accessCode: {
      required: 'Enter your access code',
      invalid: 'The access code must be made up of 8 characters and must be alphanumeric',
      accesscodeAlreadyLinked: 'Provided access code is already linked to the case.',
      invalidAccessCode: 'Enter your access code',
    },
  },
};

const cy = {
  title: 'Cael mynediad i’ch achos',
  paragraph:
    'Defnyddiwch eich rhif achos a’ch cod mynediad i gael mynediad i’ch achos a’i reoli. Bydd y rhain wedi’u nodi yn y llythyr, yr e-bost neu’r pecyn a anfonwyd gan y llys',
  caseNumberLabel: 'Nodwch eich rhif achos ',
  caseNumberHintText: 'Mae’r rhif hwn yn cynnwys 16 digid',
  accessCodeLabel: 'Nodwch eich cod mynediad',
  accessCodeHintText: 'Mae hwn yn cynnwys 8 nod',
  saveAndContinue: 'Cadw a pharhau',
  errors: {
    caseCode: {
      required: 'Rhowch eich cod achos',
      invalid: 'Mae’n rhaid i god yr achos gynnwys 16 digid',
      notNumeric: 'Rhaid i’ch cod achos fod yn rhif',
      invalidCaseCode: 'Rhowch eich cod achos',
    },
    accessCode: {
      required: 'Nodwch eich cod mynediad',
      invalid: 'Mae’n rhaid i’r cod mynediad gynnwys 8 nod a bod yn gyfuniad o rifau a llythrennau',
      accesscodeAlreadyLinked: 'Mae’r cod mynediad a ddarparwyd eisoes yn gysylltiedig â’r achos.',
      invalidAccessCode: 'Nodwch eich cod mynediad',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('Enter pin content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
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
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain  field', () => {
    const caseCodeField = fields.caseCode as FormOptions;
    expect(caseCodeField.type).toBe('text');
    expect((caseCodeField.label as Function)(generatedContent)).toBe(en.caseNumberLabel);
    expect((caseCodeField.hint as Function)(generatedContent)).toBe(en.caseNumberHintText);
    //expect(caseCodeField.labelSize as string).toBe('s');
    (caseCodeField.validator as Validator)('caseCode');
    expect(isFieldFilledIn).toHaveBeenCalledWith('caseCode');
    const accessCodeField = fields.accessCode as FormOptions;
    expect(accessCodeField.type).toBe('text');
    expect((accessCodeField.label as Function)(generatedContent)).toBe(en.accessCodeLabel);
    expect((accessCodeField.hint as Function)(generatedContent)).toBe(en.accessCodeHintText);
    //expect(accessCodeField.labelSize as string).toBe('s');
    (accessCodeField.validator as Validator)('accessCodeField');
    expect(isFieldFilledIn).toHaveBeenCalledWith('accessCodeField');
  });
  test('should contain submit button', () => {
    expect((form.accessCodeCheck.text as Function)(generatedContent)).toBe('Save and continue');
  });
});
