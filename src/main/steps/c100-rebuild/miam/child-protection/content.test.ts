import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { generateContent } from '../../miam/child-protection/content';

jest.mock('../../../../app/form/validation');

const en = {
  section: 'MIAM exemptions',
  title: 'What evidence of child protection concerns do you have?',
  needMoreDetails1: 'If you are seeking a MIAM exemption, you will need to give more details.',
  needMoreDetails2: 'The court needs this information to decide if you need to attend a MIAM.',
  optionHint: 'Select all that apply',
  localAuthority:
    'The children in the application, or another child in the household, is the subject of enquiries by a local authority under section 47 of the Children Act 1989 Act',
  localAuthorityHint:
    'This may mean that a local authority is carrying out enquiries because of concerns the children are suffering or might suffer significant harm. See <a href="https://www.legislation.gov.uk/ukpga/1989/41/section/17" class="govuk-link" target="_blank" aria-label="section 47 of the Children Act 1989 Act">section 47 of the Children Act 1989 Act</a> for further details.',
  childProtectionPlan:
    'The children in the application, or another child in the household, is the subject of a child protection plan put in place by the local authority',
  none: 'None of the above',
  errors: {
    miam_childProtectionEvidence: {
      required: 'Select what evidence of child safety concerns you have',
    },
  },
};

const cy = {
  section: 'Esemptiadau MIAM',
  title: 'Pa dystiolaeth o bryderon amddiffyn plant sydd gennych?',
  needMoreDetails1: 'Os ydych chi’n ceisio esemptiad rhag mynychu MIAM, bydd angen i chi roi mwy o fanylion.',
  needMoreDetails2: "Mae'r llys angen yr wybodaeth hon i benderfynu a oes angen i chi fynychu MIAM ai peidio.",
  optionHint: "Dewiswch bob un sy'n berthnasol i chi",
  localAuthority:
    'Mae’r plant yn y cais, neu blentyn arall ar yr aelwyd, yn destun ymholiadau gan awdurdod lleol o dan adran 47 Deddf Plant 1989',
  localAuthorityHint:
    'This may mean that a local authority is carrying out enquiries because of concerns the children are suffering or might suffer significant harm. See <a href="https://www.legislation.gov.uk/ukpga/1989/41/section/17" class="govuk-link" target="_blank" aria-label="section 47 of the Children Act 1989 Act">section 47 of the Children Act 1989 Act</a> for further details.',
  childProtectionPlan:
    'Mae’r plant yn y cais, neu blentyn arall ar yr aelwyd, yn destun cynllun amddiffyn plant a roddwyd ar waith gan yr awdurdod lleol',
  none: 'Dim un o’r uchod',
  errors: {
    miam_childProtectionEvidence: {
      required: 'Dewiswch pa dystiolaeth o bryderon diogelwch plant sydd gennych',
    },
  },
};

describe('miam child protection', () => {
  const commonContent = { language: 'en' } as CommonContent;
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

  test('should contain miam child protection involved fields', () => {
    const miam_domesticabuse_involvement_field = fields.miam_childProtectionEvidence as FormOptions;
    expect(miam_domesticabuse_involvement_field.type).toBe('checkboxes');
    expect((miam_domesticabuse_involvement_field.hint as LanguageLookup)(generatedContent)).toBe(en.optionHint);
    expect((miam_domesticabuse_involvement_field.section as LanguageLookup)(generatedContent)).toBe(en.section);
    expect((miam_domesticabuse_involvement_field.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.localAuthority
    );
    expect((miam_domesticabuse_involvement_field.values[0].hint as LanguageLookup)(generatedContent)).toBe(
      en.localAuthorityHint
    );
    expect((miam_domesticabuse_involvement_field.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.childProtectionPlan
    );
    expect((miam_domesticabuse_involvement_field.values[3].label as LanguageLookup)(generatedContent)).toBe(en.none);

    (miam_domesticabuse_involvement_field.validator as Validator)('localAuthority');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('localAuthority');
  });

  test('should contain Continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain SaveAndComeLater button', () => {
    expect(
      (form.saveAndComeLater.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
