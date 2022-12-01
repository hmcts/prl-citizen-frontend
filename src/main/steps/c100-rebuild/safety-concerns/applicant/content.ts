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
  applyForAnInjunctionHyperLink: 'https://www.gov.uk/injunction-domestic-violence - welsh',
  applyForAnInjunctionLabel: 'Apply for an injunction - welsh',
  guidanceHelpHyperLink: 'https://www.gov.uk/guidance/domestic-abuse-how-to-get-help - welsh',
  guidanceHelpLabel: 'Guidance to get help - welsh',
  reportDomesticAbuseHyperLink: 'https://www.gov.uk/report-domestic-abuse - welsh',
  reportDomesticAbuseLabel: 'How to report domestic abuse - welsh',
  legalOptionsWomenHyperLink: 'https://www.flows.org.uk - welsh',
  legalOptionsWomenLabel: 'FLOWS: Finding Legal Options for Women Survivors - welsh',
  womensAidHyperLink: 'https://www.womensaid.org.uk - welsh',
  womensAidLabel: "Women's Aid - welsh",
  nationalDomesticViolenceHyperLink: 'https://www.nationaldahelpline.org.uk - welsh',
  nationalDomesticViolenceLabel: 'National Domestic Violence Helpline - welsh',
  mensAdviceLineHyperLink: 'https://mensadviceline.org.uk - welsh',
  mensAdviceLineLabel: "Men's Advice Line - welsh",
  reportIncident: 'Report an incident - welsh',
  emergencyCall: 'Always call 999 if there’s an emergency or if you think a child’s in danger.- welsh',
  support: 'Get support - welsh',
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
