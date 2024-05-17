import { TranslationFn } from '../../../../app/controller/GetController';

const en = () => ({
  applyForAnInjunctionHyperLink: 'https://www.gov.uk/injunction-domestic-violence',
  applyForAnInjunctionLabel: 'Apply for an injunction',
  guidanceHelpHyperLink: 'https://www.gov.uk/guidance/domestic-abuse-how-to-get-help',
  guidanceHelpLabel: 'Guidance to get help',
  reportDomesticAbuseHyperLink: 'https://www.gov.uk/report-domestic-abuse',
  reportDomesticAbuseLabel: 'How to report domestic abuse',
  legalOptionsWomenHyperLink: 'https://www.flows.org.uk',
  legalOptionsWomenLabel: 'FLOWS: Finding Legal Options for Women Survivors',
  womensAidHyperLink: 'https://www.womensaid.org.uk',
  womensAidLabel: "Women's Aid",
  nationalDomesticViolenceHyperLink: 'https://www.nationaldahelpline.org.uk',
  nationalDomesticViolenceLabel: 'National Domestic Violence Helpline',
  mensAdviceLineHyperLink: 'https://mensadviceline.org.uk',
  mensAdviceLineLabel: "Men's Advice Line",
  reportIncident: 'Report an incident',
  emergencyCall: 'Always call 999 if there’s an emergency or if you think a child’s in danger.',
  support: 'Get support',
});

const cy = () => ({
  applyForAnInjunctionHyperLink: 'https://www.gov.uk/injunction-domestic-violence',
  applyForAnInjunctionLabel: 'Gwneud cais am waharddeb',
  guidanceHelpHyperLink: 'https://www.gov.uk/guidance/domestic-abuse-how-to-get-help',
  guidanceHelpLabel: 'Canllawiau i gael help',
  reportDomesticAbuseHyperLink: 'https://www.gov.uk/report-domestic-abuse',
  reportDomesticAbuseLabel: 'Sut i riportio achos o gam-drin domestig',
  legalOptionsWomenHyperLink: 'https://www.flows.org.uk',
  legalOptionsWomenLabel: 'FLOWS: Finding Legal Options for Women Survivors',
  womensAidHyperLink: 'https://www.womensaid.org.uk',
  womensAidLabel: 'Cymorth i Fenywod',
  nationalDomesticViolenceHyperLink: 'https://www.nationaldahelpline.org.uk',
  nationalDomesticViolenceLabel: 'Llinell Gymorth Genedlaethol Trais Domestig',
  mensAdviceLineHyperLink: 'https://mensadviceline.org.uk',
  mensAdviceLineLabel: 'Llinell Gyngor i Ddynion',
  reportIncident: 'Riportio digwyddiad',
  emergencyCall: "Ffoniwch 999 bob amser os oes argyfwng neu os ydych chi'n meddwl eich bod mewn perygl.",
  support: 'Cael cefnogaeth',
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
