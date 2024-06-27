import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { PartyType } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  title: 'The court will not keep your contact details private',
  section: 'Keeping your contact details private',
  line1:
    'You have told us you do not want to keep your contact details private from the other people in this application.',
  [PartyType.APPLICANT]: {
    continue: 'Save and continue',
  },
  [PartyType.RESPONDENT]: {
    continue: 'Continue',
  },
};

const cyContent = {
  title: 'Ni fydd y llys yn cadw eich manylion cyswllt yn breifat',
  section: 'Cadw eich manylion cyswllt yn breifat',
  line1:
    'Rydych wedi dweud wrthym nad ydych eisiau cadw eich manylion cyswllt yn breifat oddi wrth yr unigolyn a wnaeth gais i’r llys (y ceisydd). ',
  [PartyType.APPLICANT]: {
    continue: 'Cadw a pharhau',
  },
  [PartyType.RESPONDENT]: {
    continue: 'Parhau',
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
    languageAssertions('en', { ...enContent, ...enContent['applicant'] }, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', { ...cyContent, ...cyContent['applicant'] }, () =>
      generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
