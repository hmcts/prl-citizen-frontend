import { TranslationFn } from '../../../../app/controller/GetController';

const en = () => ({
  title: 'You must attend a MIAM',
  paragraph: `You have not provided a valid reason for not attending a MIAM.
                You’re legally required to attend one if you want to 
                go to court to resolve a dispute involving the children.`,
  stepsLabel: 'You need to follow these steps before continuing with your application:',
  step1: 'Enter your postcode to find a mediator',
  steps: [
    'Book initial meeting with the mediator',
    'Attend the MIAM',
    'Ask the mediator for a document confirming your attendance',
  ],
  paragraph1: `Alternatively you can 
                <a href="https://helpwithchildarrangements.service.justice.gov.uk" 
                class="govuk-link" rel="external" target="_blank">read the child 
                arrangements guide</a> to see if there’s a more suitable option 
                than going to court.`,
  formActionUrl: 'https://www.familymediationcouncil.org.uk/find-local-mediator/',
  minimumDistance: '5',
  findButtonText: 'Find a mediator',
});

const cy = () => ({
  title: 'Rhaid i chi fynychu MIAM',
  paragraph:
    "Nid ydych wedi darparu rheswm dilys dros beidio â mynychu MIAM. Mae gofyniad cyfreithiol i chi fynychu un os ydych eisiau mynd i'r llys i ddatrys anghydfod yn ymwneud â'r plant.",
  stepsLabel: 'Mae angen i chi ddilyn y camau hyn cyn parhau â’ch cais:',
  step1: 'Rhoi eich cod post i ddod o hyd i gyfryngwr',
  steps: [
    "Trefnu cyfarfod cychwynnol gyda'r cyfryngwr",
    'Mynychu’r MIAM',
    'Gofyn i’r cyfryngwr am ddogfen sy’n cadarnhau eich presenoldeb',
  ],
  paragraph1: `Alternatively you can 
                <a href="https://helpwithchildarrangements.service.justice.gov.uk" 
                class="govuk-link" rel="external" target="_blank">read the child 
                arrangements guide</a> to see if there’s a more suitable option 
                than going to court. - Welsh`,
  formActionUrl: 'https://www.familymediationcouncil.org.uk/find-local-mediator/',
  minimumDistance: '5',
  findButtonText: 'Find a mediator',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
  };
};
