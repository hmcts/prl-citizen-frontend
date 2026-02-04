import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Why do you need a permission from the court to make this application?',
  line: 'Consult <a href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1" class="govuk-link" target="_blank" aria-label="the CB1 guidance">the CB1 guidance</a> if you are not sure if you need permission to apply',
  select_all_apply: 'Select all that apply',
  doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children',
  doNotHaveParentalResponsibilityLabelText: 'Provide details',
  section: 'parental responsibility means that you are responsible for the children and their property',
  courtOrderPrevent:
    'There is an order under section 91(14) Children Act 1989, a limited civil restraint order, a general civil restraint order or an extended civil restraint order in force which means you need permission to make this application',
  courtOrderPreventLabelText: 'Provide case number and name of the court',
  anotherReason: 'Another reason',
  anotherReasonLabelText: 'Provide details for why you need permission to make this application',
  uploadButton: 'Upload file',
  noFiles: 'No files uploaded',
  remove: 'Remove',
  errors: {
    sq_permissionsWhy: {
      required: 'Select why you need permission from the court to make this application.',
    },
    sq_doNotHaveParentalResponsibility_subfield: {
      required: "Provide details for 'I do not have parental responsibility for the children'",
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    sq_courtOrderPrevent_subfield: {
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    sq_anotherReason_subfield: {
      required: 'Provide details for another reason',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    sq_uploadDocument: {
      required: 'You must upload a document',
      multipleFiles: 'You can only upload one document',
      maxFileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
      invalidFileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      uploadError: 'Document could not be uploaded',
      deleteFile: 'Document could not be deleted',
    },
  },
};

const cy = {
  title: 'Pam bod angen caniatâd gan y llys i wneud y cais hwn?',
  line: 'Edrychwch <a href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1" class="govuk-link" target="_blank" aria-label="the CB1 guidance">arganllawiau CB1</a> os nad ydych yn siŵr a oes angen caniatâd arnoch i wneud cais',
  select_all_apply: "Dewiswch bob un sy'n berthnasol",
  doNotHaveParentalResponsibility: 'Does gen i ddim cyfrifoldeb rhiant dros y plant',
  doNotHaveParentalResponsibilityLabelText: 'Rhowch fanylion',
  section: "Ystyr cyfrifoldeb rhiant yw eich bod yn gyfrifol am y plant a'u heiddo",
  courtOrderPrevent:
    'There is an order under section 91(14) Children Act 1989, a limited civil restraint order, a general civil restraint order or an extended civil restraint order in force which means you need permission to make this application? (Need Welsh translation)',
  courtOrderPreventLabelText: 'Provide case number and name of the court (Need Welsh translation)',
  anotherReason: 'Rheswm arall',
  anotherReasonLabelText: 'Eglurwch pam bod angen caniatâd arnoch i wneud y cais hwn',
  uploadButton: 'Uwchlwytho ffeil',
  noFiles: 'Nid oes ffeiliau wedi cael eu huwchlwytho',
  remove: 'Remove',
  errors: {
    sq_permissionsWhy: {
      required: '(welsh translation)',
    },
    sq_doNotHaveParentalResponsibility_subfield: {
      required: 'Rhowch fanylion pam nad oes gennych gyfrifoldeb rhiant dros y plant',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    sq_courtOrderPrevent_subfield: {
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    sq_anotherReason_subfield: {
      required: 'Rhowch fanylion unrhyw reswm arall',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    sq_uploadDocument: {
      required: 'Mae’n rhaid i chi uwchlwytho dogfen',
      multipleFiles: 'Gallwch uwchlwytho un ddogfen yn unig',
      maxFileSize: "Mae'r ffeil yr ydych wedi ei llwytho yn rhy fawr. Uchafswm maint y ffeil yw 20MB",
      invalidFileFormat:
        "Mae'r ffeil a lwythwyd gennych yn y fformat anghywir. Llwythwch eich ffeil eto yn y fformat cywir.",
      uploadError: "Nid oedd modd uwchlwytho'r ddogfen",
      deleteError: "Nid oedd modd dileu'r ddogfen",
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('Screening questions > permissions-why', () => {
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

  test('should contain sq_permissionsWhy field', () => {
    const permissionsWhyField = fields.sq_permissionsWhy as FormOptions;
    expect(permissionsWhyField.type).toBe('checkboxes');
    expect(permissionsWhyField.labelHidden).toBe(true);
    expect((permissionsWhyField.label as LanguageLookup)(generatedContent)).toBe(en.title);
    expect((permissionsWhyField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((permissionsWhyField.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.doNotHaveParentalResponsibility
    );
    expect((permissionsWhyField.values[0].hint as LanguageLookup)(generatedContent)).toBe(en.section);
    expect((permissionsWhyField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.courtOrderPrevent);
    expect((permissionsWhyField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.anotherReason);
    const sq_doNotHaveParentalResponsibility_subfield = permissionsWhyField.values[0].subFields
      ?.sq_doNotHaveParentalResponsibility_subfield as FormOptions;
    expect(sq_doNotHaveParentalResponsibility_subfield.type).toBe('textarea');
    const sq_courtOrderPrevent_subfield = permissionsWhyField.values[1].subFields
      ?.sq_courtOrderPrevent_subfield as FormOptions;
    expect(sq_courtOrderPrevent_subfield.type).toBe('textarea');
    expect((sq_courtOrderPrevent_subfield.label as LanguageLookup)(generatedContent)).toBe(
      en.courtOrderPreventLabelText
    );
    expect(sq_courtOrderPrevent_subfield.attributes).toStrictEqual({
      rows: 4,
    });

    const response =
      fields.sq_permissionsWhy.values[0].subFields!.sq_doNotHaveParentalResponsibility_subfield.validator('Test');
    expect(response).toEqual(undefined);
    expect(isFieldFilledIn).toHaveBeenCalledWith('Test');
    expect(isTextAreaValid).toHaveBeenCalledWith('Test');

    const response2 = fields.sq_permissionsWhy.values[1].subFields!.sq_courtOrderPrevent_subfield.validator();
    expect(response2).toEqual(undefined);
    expect(isFieldFilledIn).toHaveBeenCalledWith('Test');
    expect(isTextAreaValid).toHaveBeenCalledWith('Test');

    const uploadField =
      generatedContent.form.fields['sq_permissionsWhy'].values[1].subFields!['sq_uploadDocument'];
    expect(uploadField.type).toBe('fileUpload');
    expect(uploadField['fileUploadConfig']).toBeDefined();

    expect(
      (
        fields.sq_permissionsWhy.values[0].subFields!.sq_doNotHaveParentalResponsibility_subfield
          .label as LanguageLookup
      )(generatedContent)
    ).toBe('Provide details');
    const sq_anotherReason_subfield = permissionsWhyField.values[2].subFields?.sq_anotherReason_subfield as FormOptions;
    expect(sq_anotherReason_subfield.type).toBe('textarea');
    expect((sq_anotherReason_subfield.label as LanguageLookup)(generatedContent)).toBe(en.anotherReasonLabelText);

    const anotherReasonValidator = fields.sq_permissionsWhy.values[2].subFields!.sq_anotherReason_subfield.validator();
    expect(anotherReasonValidator).toEqual(undefined);
    expect(isFieldFilledIn).toHaveBeenCalledWith('Test');
    expect(isTextAreaValid).toHaveBeenCalledWith('Test');
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
