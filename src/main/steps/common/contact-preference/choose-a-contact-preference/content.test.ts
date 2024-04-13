import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { PartyDetails, applicantContactPreferencesEnum } from '../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');
let caseNumber;

const en = {
  caption: `Case number ${caseNumber}`,
  title: 'Contact Preferences',
  paragraphs: [
    'You can choose to receive case updates by email or post.',
    'If you receive updates by email, the updates will also be available to view in your dashboard.',
    'This includes updates on:',
  ],
  bullets: ['court orders', 'hearings', 'decisions in your case'],
  contactPreferenceLabel: 'How would you prefer to be contacted?',
  contactPreferenceHintText: 'Select one of these options.',
  labelDigital: 'Digital',
  labelDitigalHintText: 'All communication from the court will be sent by email.',
  labelPost: 'Post',
  labelPostHintText: 'All communication from the court will be sent by post.',
  errors: {
    preferredModeOfContact: {
      required: 'Please select a contact preference',
    },
  },
};

const cy = {
  caption: `Rhif yr achos ${caseNumber}`,
  title: 'Dewisiadau cyswllt',
  paragraphs: [
    'Gallwch ddewis cael diweddariadau ynghylch yr achos drwy e-bost neu drwy’r post.',
    'Os byddwch yn dewis cael diweddariadau drwy e-bost, byddwch hefyd yn gallu gweld y diweddariadau yn eich dangosfwrdd.',
    'Mae hyn yn cynnwys diweddariadau ar:',
  ],
  bullets: ['gorchmynion llys', 'gwrandawiadau', 'penderfyniadau ynghylch eich achos'],
  contactPreferenceLabel: 'Sut hoffech inni gysylltu â chi?',
  contactPreferenceHintText: 'Dewiswch un o’r opsiynau hyn.',
  labelDigital: 'Digidol',
  labelDitigalHintText: 'Fe anfonir pob cyfathrebiad gan y llys drwy e-bost.',
  labelPost: 'Drwy’r post',
  labelPostHintText: 'Fe anfonir pob cyfathrebiad gan y llys drwy’r post.',
  continue: 'Cadw a pharhau',
  errors: {
    preferredModeOfContact: {
      required: 'Dewiswch sut hoffech inni gysylltu â chi',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('contact preferences common content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    commonContent.additionalData = {
      req: {
        session: {
          user: {
            id: '1234',
          },
          userCase: {
            applicants: [
              {
                contactPreferences: applicantContactPreferencesEnum.POST,
              },
            ],
          },
        },
      },
    };
    commonContent.userCase = {
      ...commonContent.userCase,
      caseTypeOfApplication: 'FL401',
    };
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

  test('should contain contact-preference details form fields', () => {
    const { partyContactPreference } = fields as Record<string, FormFields>;

    expect(partyContactPreference.type).toBe('radios');
    expect(partyContactPreference.values[0].label(generatedContent)).toBe(en.labelDigital);
    expect((partyContactPreference.label as Function)(generatedContent)).toBe(en.contactPreferenceLabel);
    expect((partyContactPreference.hint as Function)(generatedContent)).toBe(en.contactPreferenceHintText);
    expect(partyContactPreference.values[0].value).toBe('email');
    expect((partyContactPreference.values[0].hint as Function)(generatedContent)).toBe(en.labelDitigalHintText);
    expect(partyContactPreference.values[1].label(generatedContent)).toBe(en.labelPost);
    expect((partyContactPreference.values[1].hint as Function)(generatedContent)).toBe(en.labelPostHintText);
    expect(partyContactPreference.values[1].value).toBe('post');

    (partyContactPreference.validator as Function)(applicantContactPreferencesEnum.DIGITAL);
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith(applicantContactPreferencesEnum.DIGITAL);
  });

  test('partyContactPreference should not be disabled when email present', () => {
    commonContent.userCase = {
      ...commonContent.userCase,
      applicantsFL401: {
        email: 'test@test.com',
      } as unknown as PartyDetails,
      caseTypeOfApplication: 'FL401',
    };
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
    const { partyContactPreference } = fields as Record<string, FormFields>;
    expect(partyContactPreference.values[0].disabled).toBe(undefined);
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and continue');
  });
});
