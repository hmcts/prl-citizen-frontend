import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { applicantContactPreferencesEnum } from '../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Contact Preferences for',
  serviceName: 'Child Arrangements',
  paragraphs: [
    'You can choose to receive case updates by email or post.',
    'If you receive updates by email, the updates will also be available to view in your dashboard.',
    'This includes updates on:',
  ],
  listOfBullets: ['court orders', 'hearings', 'decisions in your case'],
  contactPreferenceLabel: 'How would you prefer to be contacted?',
  contactPreferenceHintText: 'Select one (or both) of these options.',
  labelDigital: 'Digital',
  labelDitigalHintText: 'All communication from the court will be sent by email.',
  labelPost: 'Post',
  labelPostHintText: 'All communication from the court will be sent by post.',
  errors: {
    applicantContactPreferences: {
      required: 'Please select a contact preference',
    },
  },
};

const cy = () => ({
  title: 'Dewisiadau cyswllt ar gyfer',
  serviceName: 'Trefniadau plant',
  paragraphs: [
    'Gallwch ddewis cael diweddariadau ynghylch yr achos drwy e-bost neu drwy’r post.',
    'Os byddwch yn dewis cael diweddariadau drwy e-bost, byddwch hefyd yn gallu gweld y diweddariadau yn eich dangosfwrdd.',
    'Mae hyn yn cynnwys diweddariadau ar:',
  ],
  listOfBullets: ['gorchmynion llys', 'gwrandawiadau', 'penderfyniadau ynghylch eich achos'],
  contactPreferenceLabel: 'Sut hoffech inni gysylltu â chi?',
  contactPreferenceHintText: 'Dewiswch un o’r opsiynau hyn (neu’r ddau).',
  labelDigital: 'Digidol',
  labelDitigalHintText: 'Fe anfonir pob cyfathrebiad gan y llys drwy e-bost.',
  labelPost: 'Drwy’r post',
  labelPostHintText: 'Fe anfonir pob cyfathrebiad gan y llys drwy’r post.',
  errors: {
    applicantContactPreferences: {
      required: 'Dewiswch sut hoffech inni gysylltu â chi',
    },
  },
});

/* eslint-disable @typescript-eslint/ban-types */
describe('Contact Preference > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      appl_allApplicants: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
          applicantContactDetail: {
            applicantContactPreferences: ['Digital'],
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          applicantId: '7483640e-0817-4ddc-b709-6723f7925474',
        },
      },
    },
  } as unknown as CommonContent;
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
    languageAssertions(
      'en',
      {
        ...en,
        title: `${en.title} dummy Test`,
      },
      () => generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions(
      'cy',
      {
        ...cy,
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain contact-preference details form fields', () => {
    const { applicantContactPreferences } = fields as Record<string, FormFields>;

    expect(applicantContactPreferences.type).toBe('checkboxes');
    expect((applicantContactPreferences.values[0].label as Function)(generatedContent)).toBe(en.labelDigital);
    expect(applicantContactPreferences.values[0].value).toBe(en.labelDigital);
    expect((applicantContactPreferences.values[1].label as Function)(generatedContent)).toBe(en.labelPost);
    expect(applicantContactPreferences.values[1].value).toBe(en.labelPost);

    (applicantContactPreferences.validator as Function)(applicantContactPreferencesEnum.DIGITAL);
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith(applicantContactPreferencesEnum.DIGITAL);
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
