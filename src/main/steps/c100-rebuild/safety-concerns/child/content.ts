import { TranslationFn } from '../../../../app/controller/GetController';

const en = () => ({
  applyForAnInjunctionHyperLink: 'https://www.gov.uk/injunction-domestic-violence',
  applyForAnInjunctionLabel: 'Apply for an injunction',
  howToReportChildAbuseHyperLink: 'https://www.gov.uk/report-child-abuse',
  howToReportChildAbuseLabel: 'How to report child abuse',
  nationalSocietyPreventionCrueltyHyperLink: 'https://www.nspcc.org.uk',
  nationalSocietyPreventionCrueltyChildrenLabel: 'NSPCC: National Society for the Prevention of Cruelty to Children',
  childlineHyperLink: 'https://www.childline.org.uk',
  childlineLabel: 'Childline',
  supportDirectoryHyperLink: 'https://www.gov.uk/guidance/domestic-abuse-how-to-get-help',
  supportDirectoryLabel: 'GOV.UK Support directory',
  supportNavHyperLink: 'https://supportnav.org.uk',
  supportNavLabel: 'SupportNav',
  reportIncident: 'Report an incident',
  emergencyCall: 'Always call 999 if there’s an emergency or if you think a child’s in danger.',
  support: 'Get support',
});

const cy = () => ({
  applyForAnInjunctionHyperLink: 'https://www.gov.uk/injunction-domestic-violence',
  applyForAnInjunctionLabel: "Gwneud cais am waharddeb",
  howToReportChildAbuseHyperLink: 'https://www.gov.uk/report-child-abuse',
  howToReportChildAbuseLabel: "Sut i riportio achos o gam-drin plant",
  nationalSocietyPreventionCrueltyHyperLink: 'https://www.nspcc.org.uk',
  nationalSocietyPreventionCrueltyChildrenLabel:
    "NSPCC: Cymdeithas Genedlaethol er Atal Creulondeb i Blant",
  childlineHyperLink: 'https://www.childline.org.uk',
  childlineLabel: 'Childline',
  supportDirectoryHyperLink: 'https://www.gov.uk/guidance/domestic-abuse-how-to-get-help',
  supportDirectoryLabel: "GOV.UK - Cyfeiriadur cymorth",
  supportNavHyperLink: 'https://supportnav.org.uk',
  supportNavLabel: 'SupportNav',
  reportIncident: "Riportio digwyddiad",
  emergencyCall: "Ffoniwch 999 bob amser os oes argyfwng neu os ydych chi'n meddwl bod plentyn mewn perygl.",
  support: "Cael cefnogaeth",
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
