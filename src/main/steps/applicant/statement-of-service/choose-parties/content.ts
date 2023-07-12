//import { isObject } from 'lodash';

import { Case, CaseDate, CaseWithId } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
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
  errors: {
    partiesServedDate: {
      required: 'Please select the date on which the party/parties is/are served',
    },
    partiesServed: {
      required: 'Please select the party/parties that is/are served',
    },
  },
};

export const cy = {
  caption: 'Case number ',
  title: 'Add a statement of service',
  continue: 'Continue',
  whowasserved: 'Who was served?',
  add: 'Submit',
  servedDate: 'When were they served?',
  servedDateHint: 'For example: 16 4 2021',
  uploadFiles: 'Your documents',
  remove: 'Remove',
  uplodFileText1:
    'when uploading documents, name the files clearly. For example, position-statement.doc. Files must end with JPG,BMP,PNG,TIF,PDF,DOC,or DOCX.',
  uploadFileHeading: 'Upload a document',
  errors: {
    partiesServedDate: {
      required: 'Please select the date on which the party/parties is/are served',
    },
    partiesServed: {
      required: 'Please select the party/parties that is/are served',
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
    partiesServed: {
      type: 'checkboxes',
      label: l => l.whowasserved,
      values: [...checkboxes],
      validator: atLeastOneFieldIsChecked,
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
  userCase?.applicants?.forEach(applicant => {
    if (applicant.value.response.citizenFlags?.isApplicationToBeServed !== YesOrNo.YES) {
      parties.push({
        id: applicant.id,
        value: applicant.value.firstName + ' ' + applicant.value.lastName,
      });
    }
  });
  return parties;
};

export const prepateStatementOfServiceRequest = (
  req: AppRequest<AnyObject>,
  formData: Partial<Case>
): Partial<CaseWithId> => {
  const userCase = req.session.userCase;
  userCase.partiesServed = formData.partiesServed as string[];
  if (userCase.partiesServed && formData.partiesServedDate) {
    const date = formData.partiesServedDate as unknown;
    const date2 = date as { day: string; month: string; year: string };
    userCase.partiesServed = userCase.partiesServed.filter(party => party !== '');

    for (const partyId of userCase.partiesServed) {
      markSosFlag(userCase, partyId);
    }

    if (userCase.applicants && userCase.applicants[0]) {
      const partyNames = userCase.partiesServed.toString();
      if (getParties(userCase).length === 0) {
        if (userCase.applicants[0].value.response.citizenFlags) {
          userCase.applicants[0].value.response.citizenFlags.isStatementOfServiceProvided = 'Yes';
        } else {
          userCase.applicants[0].value.response.citizenFlags = {
            isStatementOfServiceProvided: 'Yes',
          };
        }
      }
      userCase.applicants[0].value.citizenSosObject = {
        partiesServed: partyNames,
        partiesServedDate: date2.year + '-' + date2.month + '-' + date2.day,
        citizenSosDocs: userCase.docIdList,
      };
      userCase.docIdList = [];
    }
  }
  return userCase;
};

const markSosFlag = (userCase: Partial<CaseWithId>, partyId: string) => {
  if (userCase.applicants) {
    for (const party of userCase.applicants) {
      if (partyId === party.id && party.value.response) {
        if (party.value.response.citizenFlags) {
          party.value.response.citizenFlags.isStatementOfServiceProvided = 'Yes';
        } else {
          party.value.response.citizenFlags = {
            isStatementOfServiceProvided: 'Yes',
          };
        }
      }
    }
  }

  if (userCase.respondents) {
    for (const party of userCase.respondents) {
      if (partyId === party.id && party.value.response) {
        if (party.value.response.citizenFlags) {
          party.value.response.citizenFlags.isStatementOfServiceProvided = 'Yes';
        } else {
          party.value.response.citizenFlags = {
            isStatementOfServiceProvided: 'Yes',
          };
        }
      }
    }
  }
  return userCase;
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
  };
};

export const getFormFields = (userCase: Partial<CaseWithId>): FormContent => {
  let parties: { id: string; value: string }[] = [];
  if (userCase) {
    parties = getParties(userCase);
  }
  return updateFormFields(form, generateFormFields(parties).fields);
};
