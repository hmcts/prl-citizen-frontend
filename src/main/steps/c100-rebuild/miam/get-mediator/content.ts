import { TranslationFn } from '../../../../app/controller/GetController';

const en = () => ({
  title: 'You must attend a MIAM',
  paragraph: `You’re legally required to attend a MIAM before making a child arrangements application.`,
  whatNextLabel: `What you need to do next`,
  stepsLabel: 'Follow these steps before continuing with your application:',
  step1: 'Enter your postcode to find your nearest MIAM mediator',
  steps: [
    'Book an initial meeting with the mediator',
    'Attend the MIAM',
    'Ask the mediator for a signed document confirming your attendance at the MIAM',
  ],
  paragraph1: `<a href="https://helpwithchildarrangements.service.justice.gov.uk" 
                class="govuk-link" rel="external" target="_blank">
                Read the child arrangements guide on GOV.UK (opens in a new tab)</a> 
                to see if there’s a more suitable option 
                than going to court.`,
  formActionUrl: 'https://www.familymediationcouncil.org.uk/find-local-mediator/',
  minimumDistance: '5',
  findButtonText: 'Find a mediator',
});

const cy = () => ({
  title: 'Mae’n rhaid i chi fynychu MIAM',
  paragraph: "Mae yna ofyniad cyfreithiol arnoch i fynychu MIAM cyn gwneud cais am drefniadau plant.",
  whatNextLabel: `Beth sydd angen i chi wneud nesaf`,
  stepsLabel: 'Dilynwch y camau hyn cyn parhau â’ch cais:',
  step1: 'Rhowch eich cod post i ddod o hyd i’ch cyfryngwr MIAM agosaf',
  steps: [
    "Trefnwch gyfarfod cychwynnol gyda'r cyfryngwr",
    'Mynychwch y MIAM',
    'Gofynnwch i’r cyfryngwr am ddogfen wedi’i llofnodi sy’n cadarnhau eich presenoldeb yn y MIAM',
  ],
  paragraph1: `<a href="https://helpwithchildarrangements.service.justice.gov.uk" 
                class="govuk-link" rel="external" target="_blank">
                Darllenwch y cyfarwyddyd ar drefniadau plant ar GOV.UK (yn agor mewn tab newydd)</a> i weld os oes opsiwn mwy addas na mynd i’r llys.`,
  formActionUrl: 'https://www.familymediationcouncil.org.uk/find-local-mediator/',
  minimumDistance: '5',
  findButtonText: 'Dod o hyd i gyfryngwr',
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
