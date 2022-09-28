import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  caption: 'Keeping your contact details private',
  headingTitle: 'The court will keep your contact details private',
  p1: 'You have told us you want to keep these contact details private',
  heading3: 'What the court will do',
  p2: 'The court will hold this information securely and will not share it with anyone except Cafcass (Children and Family Court Advisory and Support Service) or Cafcass CYMRU unless it is by order of the court.',
  listOfCofidentialInfromations: [
    { key: 'address', value: 'Address' },
    { key: 'homephone', value: 'Home phone number' },
    { key: 'mobilephone', value: 'Mobile phone number' },
    { key: 'email', value: 'Email' },
  ],
});

const cy = () => ({
  caption: 'Keeping your contact details private  - welsh',
  headingTitle: 'The court will keep your contact details private- welsh ',
  p1: 'You have told us you want to keep these contact details private - welsh',
  heading3: 'What the court will do - welsh',
  p2: 'The court will hold this information securely and will not share it with anyone except Cafcass (Children and Family Court Advisory and Support Service) or Cafcass CYMRU unless it is by order of the court. - welsh',
  listOfCofidentialInfromations: [
    { key: 'address', value: 'Address - welsh' },
    { key: 'homephone', value: 'Home phone number - welsh' },
    { key: 'mobilephone', value: 'Mobile phone number - welsh' },
    { key: 'email', value: 'Email - welsh' },
  ],
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const applicantId = content.additionalData?.req.query.applicantId
    ? (content.additionalData.req.query.applicantId as string)
    : ('' as string);
  const userId = applicantId as string;
  const selectedOptionsContactDetailPrivate = content.userCase?.appl_allApplicants?.filter(
    user => user['id'] === userId
  )[0]?.['contactDetailsPrivate'] as [];

  const translations = languages[content.language]();

  if (selectedOptionsContactDetailPrivate.length > 0) {
    const shownToggledConfidentialOptions = [] as [];

    for (const items of translations['listOfCofidentialInfromations'] as []) {
      for (const subItems of selectedOptionsContactDetailPrivate as unknown as string) {
        if ((items['key'] as string) === (subItems as string)) {
          shownToggledConfidentialOptions.push(items['value'] as never);
        }
      }
    }
    translations['listOfCofidentialInfromations'] = shownToggledConfidentialOptions as [];
  }

  const selectedOptionsContactDetailPrivateAlterative = content.userCase?.appl_allApplicants?.filter(
    user => user['id'] === userId
  )[0]?.['contactDetailsPrivateAlternative'] as [];
  if (selectedOptionsContactDetailPrivateAlterative.length > 0) {
    const shownToggledConfidentialOptions = [] as [];
    for (const items of translations['listOfCofidentialInfromations'] as []) {
      for (const subItems of selectedOptionsContactDetailPrivateAlterative as unknown as string) {
        if ((items['key'] as string) === (subItems as string)) {
          shownToggledConfidentialOptions.push(items['value']);
        }
      }
    }
    translations['listOfCofidentialInfromations'] = shownToggledConfidentialOptions as [];
  }
  const applicantData = content.userCase?.appl_allApplicants?.filter(user => user['id'] === userId)[0];
  const applicantName = (applicantData?.['applicantFirstName'] + ' ' + applicantData?.['applicantLastName']) as string;
  translations['applicantName'] = applicantName;

  return {
    ...translations,
    form,
  };
};
