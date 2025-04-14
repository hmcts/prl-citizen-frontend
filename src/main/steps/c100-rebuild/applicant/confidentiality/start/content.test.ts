/* eslint-disable import/no-unresolved */
import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { CaseWithId } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { Validator, atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';
import { ANYTYPE } from '../common/index';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const name = 'Test1 Test2';

const en = {
  caption: 'Keeping your contact details private for',
  title: 'Do you want to keep your contact details private from other people named in the application?',
  paragraph1: 'The information you give us will be shared with the respondents. This includes your contact details.',
  paragraph2: `For example, if you believe the other people in the case pose a risk to you or the children,
  you can ask the court to keep your contact details private.`,
  one: 'Yes',
  two: 'No',
  contact_details_private:
    'Specify which contact details you want to keep private.\n Make sure you only select details the respondents do not know already',
  address: 'Address',
  telephoneNumber: 'Telephone number',
  Email: 'Email',
};

const cy = {
  caption: 'Cadw eich manylion cyswllt yn breifat ar gyfer',
  title: `A yw’r bobl eraill a enwir yn y cais (yr atebwyr) yn gwybod beth yw  manylion cyswllt ${name}?`,
  paragraph1:
    "Bydd yr wybodaeth a roddwch i ni yn cael ei rhannu gyda'r atebwyr. Mae hyn yn cynnwys eich manylion cyswllt.",
  paragraph2:
    "Er enghraifft, os ydych chi'n credu bod y bobl eraill yn yr achos yn peri risg i chi neu'r plant, gallwch ofyn i'r llys gadw eich manylion cyswllt yn breifat.",
  one: 'Ydw',
  two: 'Nac ydw',
  contact_details_private:
    "Nodwch pa fanylion cyswllt rydych chi eisiau eu cadw'n breifat.\n Gwnewch yn siŵr eich bod ond yn dewis manylion nad yw'r atebwyr eisoes yn gwybod amdanynt.",
  address: 'Cyfeiriad',
  telephoneNumber: 'Rhif ffôn',
  Email: 'E-bost',
};
describe('applicant personal details > applying-with > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      appl_allApplicants: [
        {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          applicantFirstName: 'Test1',
          applicantLastName: 'Test2',
          detailsKnown: 'Yes',
          startAlternative: '',
          start: 'Yes',
          contactDetailsPrivate: ['email'],
          contactDetailsPrivateAlternative: [],
        },
        {
          id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
          applicantFirstName: 'Test2',
          applicantLastName: 'Test2',
          detailsKnown: 'Yes',
          startAlternative: '',
          start: 'Yes',
          contactDetailsPrivate: ['email'],
          contactDetailsPrivateAlternative: [],
        },
      ],
    },
  } as unknown as CommonContent;

  const additionalData = {
    req: {
      params: {
        applicantId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
      },
    },
  };

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
    languageAssertions('en', en, () => generateContent({ ...commonContent, additionalData }));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy', additionalData }));
  });
  test('should contain applyingWith field', () => {
    const applyingWithField = fields.start as FormOptions;
    const subFields = applyingWithField.values[0].subFields?.contactDetailsPrivate as FormOptions;

    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((applyingWithField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    expect(subFields.type).toBe('checkboxes');
    expect((subFields.hint as LanguageLookup)(generatedContent)).toBe(en.contact_details_private);
    expect((subFields.values[0].label as LanguageLookup)(generatedContent)).toBe(en.address);
    expect((subFields.values[1].label as LanguageLookup)(generatedContent)).toBe(en.telephoneNumber);
    expect((subFields.values[2].label as LanguageLookup)(generatedContent)).toBe(en.Email);

    subFields.validator!('', { start: 'Yes' as YesOrNo }) as unknown as Validator;
    expect(atLeastOneFieldIsChecked).toHaveBeenCalled();
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

  test('rendering form fields - toggled check as yes', () => {
    const userCase = {
      appl_allApplicants: [
        {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          applicantFirstName: 'Test1',
          applicantLastName: 'Test2',
          detailsKnown: 'Yes',
          startAlternative: '',
          start: 'Yes',
          contactDetailsPrivate: ['address', 'telephone', 'email'],
          contactDetailsPrivateAlternative: [],
        },
      ],
    } as unknown as CaseWithId;
    const generatedContentFields: ANYTYPE = generateContent({ ...commonContent, additionalData, userCase });
    expect(generatedContentFields).not.toBeNull();
    expect(generatedContentFields).not.toBe([]);
    expect(generatedContentFields.Email).toBe('Email');
    expect(generatedContentFields.address).toBe('Address');
    expect(generatedContentFields.applicantName).toEqual('Test1 Test2');
    expect(generatedContentFields.caption).toBe('Keeping your contact details private for');
    expect(generatedContentFields.form.fields._ctx.value).toBe('appl_start');
    expect(generatedContentFields['form'].fields['start'].values[0].attributes.checked).toBe(true);
  });

  test('rendering form fields - toggled check as no', () => {
    const userCase = {
      appl_allApplicants: [
        {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          applicantFirstName: 'Test1',
          applicantLastName: 'Test2',
          detailsKnown: 'Yes',
          startAlternative: '',
          start: 'No',
          contactDetailsPrivate: ['address', 'telephone', 'email'],
          contactDetailsPrivateAlternative: [],
        },
      ],
    } as unknown as CaseWithId;
    const generatedContentFields: ANYTYPE = generateContent({ ...commonContent, additionalData, userCase });
    expect(generatedContentFields).not.toBeNull();
    expect(generatedContentFields).not.toBe([]);
    expect(generatedContentFields.Email).toBe('Email');
    expect(generatedContentFields.address).toBe('Address');
    expect(generatedContentFields.applicantName).toEqual('Test1 Test2');
    expect(generatedContentFields.caption).toBe('Keeping your contact details private for');
    expect(generatedContentFields.form.fields._ctx.value).toBe('appl_start');
    expect(generatedContentFields['form'].fields['start'].values[1].attributes.checked).toBe(true);
  });

  test('rendering form fields - not checked', () => {
    const userCase = {
      appl_allApplicants: [
        {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          applicantFirstName: 'Test1',
          applicantLastName: 'Test2',
          detailsKnown: 'Yes',
          startAlternative: '',
          start: '',
          contactDetailsPrivate: ['address', 'telephone', 'email'],
          contactDetailsPrivateAlternative: [],
        },
      ],
    } as unknown as CaseWithId;
    const generatedContentFields: ANYTYPE = generateContent({ ...commonContent, userCase, additionalData: undefined });
    expect(generatedContentFields).not.toBeNull();
    expect(generatedContentFields).not.toBe([]);
    expect(generatedContentFields.Email).toBe('Email');
    expect(generatedContentFields.address).toBe('Address');
    expect(generatedContentFields.caption).toBe('Keeping your contact details private for');
    expect(generatedContentFields.form.fields._ctx.value).toBe('appl_start');
  });
});
