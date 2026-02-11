/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Why do you need a permission from the court to make this application?',
  line: 'Consult <a href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1" class="govuk-link" target="_blank" aria-label="the CB1 guidance">the CB1 guidance</a> if you are not sure if you need permission to apply',
  select_all_apply: 'Select all that apply',
  doNotHaveParentalResponsibility: 'I do not have parental responsibility for the children',
  doNotHaveParentalResponsibilityLabelText: 'Provide details',
  section: 'parental responsibility means that you are responsible for the children and their property',
  courtOrderPrevent:
    'There is an order under section 91(14) Children Act 1989, a limited civil restraint order, a general civil restraint order or an extended civil restraint order in force which means you need permission to make this application',
  courtOrderPreventHint:
    "Permission is required if there is an order in place stating that an application cannot be made without the court's permission.",
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
      multipleFiles: 'You can only upload one document',
      maxFileSize: 'The file you uploaded is too large. Maximum file size allowed is 20MB',
      invalidFileFormat: 'The file you uploaded is in the wrong format. Upload your file again in the correct format',
      uploadError: 'Document could not be uploaded',
      deleteFile: 'Document could not be deleted',
    },
  },
});

export const cy = () => ({
  title: 'Pam bod angen caniatâd gan y llys i wneud y cais hwn?',
  line: 'Edrychwch <a href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1" class="govuk-link" target="_blank" aria-label="the CB1 guidance">arganllawiau CB1</a> os nad ydych yn siŵr a oes angen caniatâd arnoch i wneud cais',
  select_all_apply: "Dewiswch bob un sy'n berthnasol",
  doNotHaveParentalResponsibility: 'Does gen i ddim cyfrifoldeb rhiant dros y plant',
  doNotHaveParentalResponsibilityLabelText: 'Rhowch fanylion',
  section: "Ystyr cyfrifoldeb rhiant yw eich bod yn gyfrifol am y plant a'u heiddo",
  courtOrderPrevent:
    "Mae gorchymyn o dan adran 91(14) Deddf Plant 1989, gorchymyn atal sifil cyfyngedig, gorchymyn atal sifil cyffredinol, neu orchymyn atal sifil estynedig mewn grym sy'n golygu bod angen caniatâd arnaf i wneud y cais hwn",
  courtOrderPreventHint: '(welsh translation)',
  courtOrderPreventLabelText: "Rhowch rif yr achos ac enw'r llys",
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
      multipleFiles: 'Gallwch uwchlwytho un ddogfen yn unig',
      maxFileSize: "Mae'r ffeil yr ydych wedi ei llwytho yn rhy fawr. Uchafswm maint y ffeil yw 20MB",
      invalidFileFormat:
        "Mae'r ffeil a lwythwyd gennych yn y fformat anghywir. Llwythwch eich ffeil eto yn y fformat cywir.",
      uploadError: "Nid oedd modd uwchlwytho'r ddogfen",
      deleteError: "Nid oedd modd dileu'r ddogfen",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    sq_permissionsWhy: {
      id: 'sq_permissionsWhy',
      type: 'checkboxes',
      label: l => l.title,
      labelHidden: true,
      hint: l => l.select_all_apply,
      values: [
        {
          name: 'sq_permissionsWhy',
          label: l => l.doNotHaveParentalResponsibility,
          value: 'doNotHaveParentalResponsibility',
          hint: l => l.section,
          subFields: {
            sq_doNotHaveParentalResponsibility_subfield: {
              type: 'textarea',
              labelSize: null,
              label: l => l.doNotHaveParentalResponsibilityLabelText,
              attributes: {
                rows: 4,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          name: 'sq_permissionsWhy',
          label: l => l.courtOrderPrevent,
          value: 'courtOrderPrevent',
          hint: l => l.courtOrderPreventHint,
          subFields: {
            sq_courtOrderPrevent_subfield: {
              type: 'textarea',
              labelSize: null,
              label: l => l.courtOrderPreventLabelText,
              attributes: {
                rows: 4,
              },
              validator: value => isTextAreaValid(value),
            },
            sq_uploadDocument: {
              type: 'upload',
              label: l => l.courtOrderPreventFileUploadLabel,
              labelHidden: true,
              attributes: {
                accept: '.pdf,.doc,.docx,.jpg,.png',
                multiple: false,
              },
            },
          },
        },
        {
          name: 'sq_permissionsWhy',
          label: l => l.anotherReason,
          value: 'anotherReason',
          subFields: {
            sq_anotherReason_subfield: {
              type: 'textarea',
              labelSize: null,
              label: l => l.anotherReasonLabelText,
              attributes: {
                rows: 4,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
      ],
      validator: atLeastOneFieldIsChecked,
    },
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();

  return {
    ...translations,
    form,
  };
};
