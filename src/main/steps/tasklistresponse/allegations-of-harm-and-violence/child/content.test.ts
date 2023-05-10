import { CommonContent } from '../../../../steps/common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const EN = 'en';
const CY = 'cy';
const commonContent = {
  language: EN,
} as CommonContent;

const enContent = {
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
};

const cyContent = {
  applyForAnInjunctionHyperLink: 'https://www.gov.uk/injunction-domestic-violence - welsh',
  applyForAnInjunctionLabel: 'Apply for an injunction - welsh',
  howToReportChildAbuseHyperLink: 'https://www.gov.uk/report-child-abuse - welsh',
  howToReportChildAbuseLabel: 'How to report child abuse - welsh',
  nationalSocietyPreventionCrueltyHyperLink: 'https://www.nspcc.org.uk - welsh',
  nationalSocietyPreventionCrueltyChildrenLabel: 'NSPCC: Cymdeithas Genedlaethol er Atal Creulondeb i Blant',
  childlineHyperLink: 'https://www.childline.org.uk - welsh',
  childlineLabel: 'Childline - welsh',
  supportDirectoryHyperLink: 'https://www.gov.uk/guidance/domestic-abuse-how-to-get-help - welsh',
  supportDirectoryLabel: 'GOV.UK Support directory - welsh',
  supportNavHyperLink: 'https://supportnav.org.uk - welsh',
  supportNavLabel: 'SupportNav - welsh',
  reportIncident: 'Report an incident - welsh',
  emergencyCall: 'Always call 999 if there’s an emergency or if you think a child’s in danger. - welsh',
  support: 'Get support - welsh',
};

describe('safety concerns guidance', () => {
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent });

    expect(generatedContent).toEqual(enContent);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({
      ...commonContent,
      language: CY,
    });

    expect(generatedContent).toEqual(cyContent);
  });
});
