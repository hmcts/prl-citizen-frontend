import { CaseDate, CaseWithId } from '../../../../app/case/case';
import { CitizenSos, YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { AnyObject } from '../../../../app/controller/PostController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { covertToDateObject } from '../../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  atLeastOneFieldIsChecked,
  isDateInputInvalid,
  isFutureDate,
} from '../../../../app/form/validation';

export const en = {
  caption: 'Case number ',
  title: 'Add a statement of service',
  whowasserved: 'Who was served?',
  continue: 'Continue',
  add: 'Submit',
  uploadFiles: 'Your documents',
  remove: 'Remove',
  servedDate: 'When were they served?',
  servedDateHint: 'For example: 16 4 2021',
  uplodFileText1:
    'when uploading documents, name the files clearly. For example, position-statement.doc. Files must end with JPG,BMP,PNG,TIF,PDF,DOC,or DOCX.',
  uploadFileHeading: 'Upload a document',
  uploadButton: 'Upload file',
  noFilesUploaded: 'No files uploaded',
  errors: {
    partiesServedDate: {
      required: 'You must enter the date of service',
    },
    partiesServed: {
      required: 'You must select a respondent',
    },
    documents: {
      required: 'You must upload a statement of service',
      multipleFiles: `You can upload only one file.
            If you wish to upload a new file, delete the existing
            file and upload a new one`,
      fileSize: `The file you uploaded is too large.
            Maximum file size allowed is 20MB`,
      fileFormat: `The file you uploaded is in the wrong format.
            Upload your file again in the correct format`,
    },
  },
};

export const cy = {
  caption: 'Rhif yr achos',
  title: 'Llwytho’r datganiad cyflwyno',
  continue: 'Parhau',
  whowasserved: 'Ar bwy y cyflwynwyd?',
  add: 'Cyflwyno',
  servedDate: 'Pryd cawson nhw eu cyflwyno?',
  servedDateHint: 'Er enghraifft: 16 4 2021',
  uploadFiles: 'Eich dogfennau',
  remove: 'Dileu',
  uplodFileText1:
    'Pan fyddwch yn llwytho dogfennau, gwnewch yn siŵr eich bod yn enwi’r ffeiliau yn glir.  Er enghraifft, datganiad-safbwynt.doc. Rhaid i’r ffeiliau fod ar ffurf JPG, BMP, PNG,TIF, PDF, DOC neu DOCX.',
  uploadFileHeading: 'Llwytho dogfen',
  uploadButton: 'Llwytho ffeil',
  noFilesUploaded: "Dim ffeil wedi'i dewis",
  errors: {
    partiesServedDate: {
      required: "Mae'n rhaid i chi nodi'r dyddiad cyflwyno",
    },
    partiesServed: {
      required: "Mae'n rhaid i chi ddewis atebydd",
    },
    documents: {
      required: "Mae'n rhaid i chi lwytho datganiad cyflwyno",
      multipleFiles:
        "Dim ond un ffeil y gallwch ei llwytho. Os ydych yn dymuno llwytho ffeil newydd, dylech ddileu'r ffeil bresennol a llwytho un newydd.",
      fileSize: "Mae'r ffeil yr ydych wedi ei llwytho yn rhy fawr. Uchafswm maint y ffeil yw 20MB",
      fileFormat: "Mae'r ffeil a lwythwyd gennych yn y fformat anghywir. Llwythwch eich ffeil eto yn y fformat cywir.",
    },
  },
};

const languages = {
  en,
  cy,
};

let updatedForm: FormContent;

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

export const generateFormFields = (parties: { id: string; value: string }[]): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };
  const checkboxes: { name: string; label: string; value: string }[] = [];
  parties.forEach(p => {
    checkboxes.push({
      name: 'partiesServed',
      label: p.value,
      value: p.id,
    });
  });
  const fields = {
    partiesServed: {
      type: 'checkboxes',
      label: l => l.whowasserved,
      values: [...checkboxes],
      validator: atLeastOneFieldIsChecked,
    },
    partiesServedDate: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.servedDate,
      labelSize: 's',
      hint: l => l.servedDateHint,
      values: [
        {
          label: l => l.dateFormat['day'],
          name: 'day',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['month'],
          name: 'month',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['year'],
          name: 'year',
          classes: 'govuk-input--width-4',
          attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
        },
      ],
      parser: body => covertToDateObject('partiesServedDate', body as Record<string, unknown>),
      validator: value =>
        areDateFieldsFilledIn(value as CaseDate) ||
        isDateInputInvalid(value as CaseDate) ||
        isFutureDate(value as CaseDate),
    },
  };

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlycontinue,
  },
};

const getParties = (userCase: Partial<CaseWithId>) => {
  const parties: { id: string; value: string }[] = [];
  userCase?.respondents?.forEach(respondent => {
    if (respondent.value.response.citizenFlags?.isApplicationToBeServed !== YesOrNo.YES) {
      parties.push({
        id: respondent.id,
        value: respondent.value.firstName + ' ' + respondent.value.lastName,
      });
    }
  });
  return parties;
};

export const prepateStatementOfServiceRequest = (req: AppRequest<AnyObject>): CitizenSos => {
  const userCase = req.session.userCase;
  userCase.partiesServed = userCase.partiesServed!.filter(party => party !== '');
  return {
    partiesServed: userCase.partiesServed.toString(),
    partiesServedDate:
      userCase['partiesServedDate-year'] +
      '-' +
      userCase['partiesServedDate-month'] +
      '-' +
      userCase['partiesServedDate-day'],
    citizenSosDocs: userCase.statementOfServiceDocument,
    isOrder: 'order' === req.params.context ? 'Yes' : 'No',
  };
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  let parties: { id: string; value: string }[] = [];
  if (content.userCase) {
    parties = getParties(content.userCase);
  }
  return {
    ...translations,
    form: updateFormFields(form, generateFormFields(parties).fields),
    uploadedFiles: content.userCase?.applicantUploadFiles,
  };
};

export const getFormFields = (userCase: Partial<CaseWithId>): FormContent => {
  let parties: { id: string; value: string }[] = [];
  if (userCase) {
    parties = getParties(userCase);
  }
  return updateFormFields(form, generateFormFields(parties).fields);
};
