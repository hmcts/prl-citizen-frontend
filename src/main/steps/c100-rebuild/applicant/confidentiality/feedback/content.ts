import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Keeping your contact details private for',
  headingTitle: 'The court will keep your contact details private',
  p1: 'You have told us you want to keep these contact details private',
  heading3: 'What the court will do',
  p2: 'The court will hold this information securely and will not share it with anyone except Cafcass (Children and Family Court Advisory and Support Service) or Cafcass CYMRU unless it is by order of the court.',
  listOfCofidentialInfromations: [
    { key: 'address', value: 'Address' },
    { key: 'telephone', value: 'Telephone number' },
    { key: 'email', value: 'Email' },
  ],
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  caption: 'Cadw eich manylion cyswllt yn breifat ar gyfer',
  headingTitle: 'Bydd y llys yn cadw eich manylion cyswllt yn breifat ar gyfer.',
  p1: "Rydych wedi dweud wrthym eich bod eisiau cadw'r manylion cyswllt yma yn breifat:",
  heading3: 'Beth fydd y llys yn ei wneud',
  p2: "Bydd y llys yn cadw'r wybodaeth hon yn ddiogel ac ni fydd yn ei rhannu ag unrhyw un ac eithrio Cafcass (Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd) neu Cafcass CYMRU oni bai ei fod trwy orchymyn y llys.",
  listOfCofidentialInfromations: [
    { key: 'address', value: 'Cyfeiriad' },
    { key: 'telephone', value: 'Ffôn' },
    { key: 'email', value: 'E-bost' },
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
  const applicantId = content.additionalData?.req.params?.applicantId ?? '';
  const userId = applicantId as string;
  const selectedOptionsContactDetailPrivate = content.userCase?.appl_allApplicants?.filter(
    user => user['id'] === userId
  )[0]?.['contactDetailsPrivate'] as [];

  const translations = languages[content.language]();

  if (selectedOptionsContactDetailPrivate.length > 0) {
    const shownToggledConfidentialOptions = [] as [];

    for (const items of translations['listOfCofidentialInfromations'] as []) {
      for (const subItems of selectedOptionsContactDetailPrivate as unknown as string) {
        prepareOptions(items, subItems, shownToggledConfidentialOptions);
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
        prepareOptions(items, subItems, shownToggledConfidentialOptions);
      }
    }
    translations['listOfCofidentialInfromations'] = shownToggledConfidentialOptions as [];
  }
  const applicantData = content.userCase?.appl_allApplicants?.filter(user => user['id'] === userId)[0];
  const applicantName = (applicantData?.['applicantFirstName'] + ' ' + applicantData?.['applicantLastName']);
  translations['applicantName'] = applicantName;

  return {
    ...translations,
    form,
  };
};
function prepareOptions(items: never, subItems: string, shownToggledConfidentialOptions) {
  if ((items['key'] as string) === (subItems)) {
    shownToggledConfidentialOptions.push(items['value']);
  }
}

