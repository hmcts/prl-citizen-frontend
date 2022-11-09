import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: '',
  title: 'Safety concerns',
  line1: 'The court needs to know if anyone who spends time with the children poses a risk to their safety or yours.',
  line2:
    'We use ‘children’ as a general term to avoid repetition. In this service it applies to whether it is about a child or children.',
  line3:
    'The questions in this section will determine if you or the children have experienced - or are at risk of experiencing - any form of harm.',
  line4:
    'Harm to a child means ill treatment, or damage to their health or development. This could include damage suffered from seeing another person being harmed.',
  line5: 'Why do we need this information and what will we do with it?',
  line6:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children.',
  line7:
    'If you can provide this information now, it will make it easier for the court and support services to make sure your case is handled correctly.',
  line8:
    'If you dont want to provide details of the abuse right now, you will be able to do so when you speak to the Children and Family Court Advisory Support Service (Cafcass).',
  line9:
    'An advisor from Cafcass or Cafcass Cymru will look at your answers during safeguarding checks, and may need to ask you some more questions.',
  line10:
    'As part of this process they will get in touch with organisations such as the police and local authorities, for any information about you, the other people in the case and the children.',
  line11:
    'They will provide this information to the court before your first hearing. The judge will take their assessment into account when deciding what is best for the children.',
  line12:
    'The information you provide in this section will also be shared with the applicant, so they can respond to what you have said.',

  continue: 'Continue',
};

const cyContent = {
  section: '',
  title: 'Safety concerns',
  line1: 'The court needs to know if anyone who spends time with the children poses a risk to their safety or yours.',
  line2:
    'We use ‘children’ as a general term to avoid repetition. In this service it applies to whether it is about a child or children.',
  line3:
    'The questions in this section will determine if you or the children have experienced - or are at risk of experiencing - any form of harm.',
  line4:
    'Harm to a child means ill treatment, or damage to their health or development. This could include damage suffered from seeing another person being harmed.',
  line5: 'Why do we need this information and what will we do with it?',
  line6:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children.',
  line7:
    'If you can provide this information now, it will make it easier for the court and support services to make sure your case is handled correctly.',
  line8:
    'If you dont want to provide details of the abuse right now, you will be able to do so when you speak to the Children and Family Court Advisory Support Service (Cafcass).',
  line9:
    'An advisor from Cafcass or Cafcass Cymru will look at your answers during safeguarding checks, and may need to ask you some more questions.',
  line10:
    'As part of this process they will get in touch with organisations such as the police and local authorities, for any information about you, the other people in the case and the children.',
  line11:
    'They will provide this information to the court before your first hearing. The judge will take their assessment into account when deciding what is best for the children.',
  line12:
    'The information you provide in this section will also be shared with the applicant, so they can respond to what you have said.',

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
    expect(generatedContent.section).toEqual('');
    expect(generatedContent.title).toEqual('Safety concerns');
    expect(generatedContent.line1).toEqual(
      'The court needs to know if anyone who spends time with the children poses a risk to their safety or yours.'
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
