import { childrenDetails } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  pageTitle: 'Parental responsibility for',
  labelText:
    '<label class="govuk-label" for="parentalResponsibility"> State everyone who has parental responsibility for  and how they have parental responsibility.</label>',
  hintText: `<div id="parentalResponsibility-hint" class="govuk-hint "><p>For example 'child's mother', or 'child's father who was married to the mother when the child was born.</p>
 <p><a target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">See section E of leaflet CB1 for more information</a></p></div>`,
  errors: {
    parentalResponsibility: {
      required: 'Enter an answer',
    },
  },
});

const cy = () => ({
  pageTitle: 'Parental responsibility for  - welsh',
  labelText:
    '<label class="govuk-label" for="parentalResponsibility"> State everyone who has parental responsibility for  and how they have parental responsibility. - welsh</label',
  hintText: `<div id="parentalResponsibility-hint" class="govuk-hint "><p>For example 'child's mother', or 'child's father who was married to the mother when the child was born.</p>
  <p><a target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">See section E of leaflet CB1 for more information</a></p> - welsh</div>`,
  errors: {
    parentalResponsibility: {
      required: 'Enter an answer  - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    childCaption: {
      type: 'html',
      label: label => label.labelText,
    },
    childhintText: {
      type: 'html',
      label: label => label.hintText,
    },
    parentalResponsibility: {
      type: 'input',
      classes: 'govuk-input govuk-!-margin-top-4',
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const sessionDataOfChildren = content.additionalData?.req.session;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ChilrenData: childrenDetails[] =
    sessionDataOfChildren['userCase'].hasOwnProperty('children') && sessionDataOfChildren['userCase']['children']
      ? sessionDataOfChildren['userCase']['children']
      : ([] as childrenDetails[]);
  const { childId } = content.additionalData?.req.query;
  const findChildData = ChilrenData.filter(child => child['id'] === childId)?.[0];
  const parentialResponsibilityStatement = findChildData['parentialResponsibility']?.['statement'];
  form.fields['parentalResponsibility']['value'] = parentialResponsibilityStatement;
  const translations = languages[content.language]();
  const firstName = findChildData['firstname'];
  const lastName = findChildData['lastname'];
  translations['firstName'] = firstName;
  translations['lastName'] = lastName;
  return {
    ...translations,
    form,
  };
};
