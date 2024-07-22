import { CaseType, PartyType } from '../../../../../app/case/definition';
import { APPLICANT_ADD_LEGAL_REPRESENTATIVE, RESPONDENT_ADD_LEGAL_REPRESENTATIVE } from '../../../../../steps/urls';

const en = {
  [CaseType.C100]: {
    [PartyType.APPLICANT]: {
      hyperlinks: [
        {
          label: 'Know more about child arrangements',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
          target: '_blank',
        },
        {
          label: 'Know more about attending court',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
          target: '_blank',
        },
        {
          label: 'Check if I am eligible for Legal Aid',
          link: 'https://www.gov.uk/check-legal-aid',
          target: '_blank',
        },
        {
          label: 'Find out about The Family Mediation Voucher scheme',
          link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
          target: '_blank',
        },
        {
          label: 'Find legal advice',
          link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
          target: '_blank',
        },
        {
          label: 'Read how to represent myself in court',
          link: 'https://www.gov.uk/represent-yourself-in-court',
          target: '_blank',
        },
        {
          label: 'Find information about my court',
          link: 'https://www.gov.uk/find-court-tribunal',
          target: '_blank',
        },
      ],
    },
    [PartyType.RESPONDENT]: {
      hyperlinks: [
        {
          label: 'Know more about child arrangements',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
          target: '_blank',
        },
        {
          label: 'Know more about attending court',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
          target: '_blank',
        },
        {
          label: 'Check if I am eligible for Legal Aid',
          link: 'https://www.gov.uk/check-legal-aid',
          target: '_blank',
        },
        {
          label: 'Find out about The Family Mediation Voucher scheme',
          link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
          target: '_blank',
        },
        {
          label: 'Find legal advice',
          link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
          target: '_blank',
        },
        {
          label: 'Read how to represent myself in court',
          link: 'https://www.gov.uk/represent-yourself-in-court',
          target: '_blank',
        },
        {
          label: 'Find information about my court',
          link: 'https://www.gov.uk/find-court-tribunal',
          target: '_blank',
        },
      ],
    },
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: {
      hyperlinks: [
        {
          label: 'Add a legal representative',
          link: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
          target: '_blank',
        },
        {
          label: 'Make an application about your case',
          link: 'https://www.gov.uk/injunction-domestic-violence',
          target: '_blank',
        },
        {
          label: 'Know more about domestic abuse',
          link: 'https://www.gov.uk/injunction-domestic-violence',
          target: '_blank',
        },
        {
          label: 'Find legal advice',
          link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
          target: '_blank',
        },
        {
          label: 'Read how to represent myself in court',
          link: 'https://www.gov.uk/represent-yourself-in-court',
          target: '_blank',
        },
        {
          label: 'Find information about my court',
          link: 'https://www.gov.uk/find-court-tribunal',
          target: '_blank',
        },
      ],
    },
    [PartyType.RESPONDENT]: {
      hyperlinks: [
        {
          label: 'Add a legal representative',
          link: RESPONDENT_ADD_LEGAL_REPRESENTATIVE,
          target: '_blank',
        },
        {
          label: 'Make an application about your case',
          link: 'https://www.gov.uk/injunction-domestic-violence',
          target: '_blank',
        },
        {
          label: 'Know more about domestic abuse',
          link: 'https://www.gov.uk/injunction-domestic-violence',
          target: '_blank',
        },
        {
          label: 'Know more about attending court',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
          target: '_blank',
        },
        {
          label: 'Find legal advice',
          link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
          target: '_blank',
        },
        {
          label: 'Read how to represent myself in court',
          link: 'https://www.gov.uk/represent-yourself-in-court',
          target: '_blank',
        },
        {
          label: 'Find information about my court',
          link: 'https://www.gov.uk/find-court-tribunal',
          target: '_blank',
        },
        {
          label: 'Set aside or change an application',
          link: 'https://www.gov.uk/government/publications/form-fl403-application-to-vary-extend-or-discharge-an-order-in-existing-proceedings',
          target: '_blank',
        },
      ],
    },
  },
};

const cy: typeof en = {
  [CaseType.C100]: {
    [PartyType.APPLICANT]: {
      hyperlinks: [
        {
          label: 'Gwybod mwy am drefniadau plant',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
          target: '_blank',
        },
        {
          label: 'Gwybod mwy am fynychu’r llys',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
          target: '_blank',
        },
        {
          label: 'Gwirio os wyf yn gymwys i gael Cymorth Cyfreithiol',
          link: 'https://www.gov.uk/check-legal-aid',
          target: '_blank',
        },
        {
          label: 'Deall beth yw Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
          link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
          target: '_blank',
        },
        {
          label: 'Dod o hyd i gyngor cyfreithiol',
          link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
          target: '_blank',
        },
        {
          label: 'Darllen mwy am sut i gynrychioli fy hun yn y llys',
          link: 'https://www.gov.uk/represent-yourself-in-court',
          target: '_blank',
        },
        {
          label: 'Find information about my court (in welsh)',
          link: 'https://www.gov.uk/find-court-tribunal',
          target: '_blank',
        },
      ],
    },
    [PartyType.RESPONDENT]: {
      hyperlinks: [
        {
          label: 'Gwybod mwy am drefniadau plant',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
          target: '_blank',
        },
        {
          label: 'Gwybod mwy am fynychu’r llys',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
          target: '_blank',
        },
        {
          label: 'Gwirio os wyf yn gymwys i gael Cymorth Cyfreithiol',
          link: 'https://www.gov.uk/check-legal-aid',
          target: '_blank',
        },
        {
          label: 'Deall beth yw Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
          link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
          target: '_blank',
        },
        {
          label: 'Dod o hyd i gyngor cyfreithiol',
          link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
          target: '_blank',
        },
        {
          label: 'Darllen mwy am sut i gynrychioli fy hun yn y llys',
          link: 'https://www.gov.uk/represent-yourself-in-court',
          target: '_blank',
        },
        {
          label: 'Find information about my court (in welsh)',
          link: 'https://www.gov.uk/find-court-tribunal',
          target: '_blank',
        },
      ],
    },
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: {
      hyperlinks: [
        {
          label: 'Ychwanegu cynrychiolydd cyfreithiol',
          link: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
          target: '_blank',
        },
        {
          label: 'Make an application about your case (in welsh)',
          link: 'https://www.gov.uk/injunction-domestic-violence',
          target: '_blank',
        },
        {
          label: 'Know more about domestic abuse (in welsh)',
          link: 'https://www.gov.uk/injunction-domestic-violence',
          target: '_blank',
        },
        {
          label: 'Dod o hyd i gyngor cyfreithiol',
          link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
          target: '_blank',
        },
        {
          label: 'Darllen mwy am sut i gynrychioli fy hun yn y llys',
          link: 'https://www.gov.uk/represent-yourself-in-court',
          target: '_blank',
        },
        {
          label: 'Find information about my court (in welsh)',
          link: 'https://www.gov.uk/find-court-tribunal',
          target: '_blank',
        },
      ],
    },
    [PartyType.RESPONDENT]: {
      hyperlinks: [
        {
          label: 'Ychwanegu cynrychiolydd cyfreithiol',
          link: RESPONDENT_ADD_LEGAL_REPRESENTATIVE,
          target: '_blank',
        },
        {
          label: 'Make an application about your case (in welsh)',
          link: 'https://www.gov.uk/injunction-domestic-violence',
          target: '_blank',
        },
        {
          label: 'Know more about domestic abuse (in welsh)',
          link: 'https://www.gov.uk/injunction-domestic-violence',
          target: '_blank',
        },
        {
          label: 'Know more about attending court (in welsh)',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
          target: '_blank',
        },
        {
          label: 'Dod o hyd i gyngor cyfreithiol',
          link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
          target: '_blank',
        },
        {
          label: 'Darllen mwy am sut i gynrychioli fy hun yn y llys',
          link: 'https://www.gov.uk/represent-yourself-in-court',
          target: '_blank',
        },
        {
          label: 'Find information about my court (in welsh)',
          link: 'https://www.gov.uk/find-court-tribunal',
          target: '_blank',
        },
        {
          label: 'Set aside or change an application (in welsh)',
          link: 'https://www.gov.uk/government/publications/form-fl403-application-to-vary-extend-or-discharge-an-order-in-existing-proceedings',
          target: '_blank',
        },
      ],
    },
  },
};

export const languages = {
  en,
  cy,
};
