import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { PartyType } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  title: 'The court will keep your contact details private',
  section: 'Keeping your contact details private',
  line1: 'You have told us you want to keep these contact details private:',
  address: 'Address',
  email: 'Email',
  line2: 'What the court will do',
  line3:
    'The court will hold this information securely and will not share it with anyone except Cafcass (Children and Family Court Advisory and Support Service) or Cafcass Cymru unless it is by order of the court.',
  [PartyType.APPLICANT]: {
    continue: 'Save and continue',
    phoneNumber: 'Telephone number',
  },
  [PartyType.RESPONDENT]: {
    continue: 'Continue',
    phoneNumber: 'Phone Number',
  },
};

const cyContent = {
  title: 'Bydd y llys yn cadw eich manylion cyswllt yn breifat',
  section: 'Cadw eich manylion cyswllt yn breifat',
  line1: "Rydych wedi dweud wrthym eich bod eisiau cadw'r manylion cyswllt yma yn breifat:",
  address: 'Cyfeiriad',
  email: 'E-bost',
  line2: 'Beth fydd y llys yn ei wneud',
  line3:
    'Bydd y llys yn cadw’r wybodaeth hon yn ddiogel. Bydd y manylion cyswllt hyn ond yn cael eu rhannu os bydd gorchymyn llys i wneud hynny.',
  [PartyType.APPLICANT]: {
    continue: 'Cadw a pharhau',
    phoneNumber: 'Rhif ffôn',
  },
  [PartyType.RESPONDENT]: {
    continue: 'Parhau',
    phoneNumber: 'Rhif ffôn',
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = {
    language: 'en',
    userIdamId: '123',
    userCase: {
      applicants: [
        {
          value: {
            user: {
              idamId: '123',
            },
          },
        },
      ],
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
