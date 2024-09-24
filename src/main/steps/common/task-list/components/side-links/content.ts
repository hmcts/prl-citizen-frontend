import { CaseType, PartyType } from '../../../../../app/case/definition';
import { applyParms } from '../../../../../steps/common/url-parser';
import {
  APPLICANT_ADD_LEGAL_REPRESENTATIVE,
  REMOVE_LEGAL_REPRESENTATIVE_START,
  RESPONDENT_ADD_LEGAL_REPRESENTATIVE,
} from '../../../../../steps/urls';

const en = {
  [CaseType.C100]: {
    [PartyType.APPLICANT]: {
      hyperlinks: [
        {
          label: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
          link: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
          target: '_blank',
        },
        {
          label: 'Add a legal representative',
          link: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
          target: '',
        },
        {
          label: 'Remove a legal representative',
          link: applyParms(REMOVE_LEGAL_REPRESENTATIVE_START, { partyType: PartyType.APPLICANT }),
          target: '',
        },
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
          label: 'Understand what a Mediation Information & Assessment Meeting (MIAM) is',
          link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
          target: '_blank',
        },
        {
          label: 'Check if I am eligible for Legal Aid',
          link: 'https://www.gov.uk/check-legal-aid',
          target: '_blank',
        },
        {
          label: 'Check if I am eligible for Help with Fees',
          link: 'https://www.gov.uk/get-help-with-court-fees',
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
      ],
    },
    [PartyType.RESPONDENT]: {
      hyperlinks: [
        {
          label: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
          link: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
          target: '_blank',
        },
        {
          label: 'Add a legal representative',
          link: RESPONDENT_ADD_LEGAL_REPRESENTATIVE,
        },
        {
          label: 'Remove a legal representative',
          link: applyParms(REMOVE_LEGAL_REPRESENTATIVE_START, { partyType: PartyType.RESPONDENT }),
        },
        {
          label: 'Find my local court',
          link: '#',
        },
        {
          label: 'Find legal advice',
          link: '#',
        },
        {
          label: 'Know more about child arrangements',
          link: '#',
        },
        {
          label: 'Know more about attending court',
          link: '#',
        },
      ],
    },
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: {
      hyperlinks: [
        {
          label: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
          link: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
          target: '_blank',
        },
        {
          label: 'Add a legal representative',
          link: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
        },
        {
          label: 'Remove a legal representative',
          link: applyParms(REMOVE_LEGAL_REPRESENTATIVE_START, { partyType: PartyType.APPLICANT }),
        },
        {
          label: 'Find my local court',
          link: '#',
        },
        {
          label: 'Find legal advice',
          link: '#',
        },
        {
          label: 'Know more about child arrangements',
          link: '#',
        },
        {
          label: 'Know more about attending court',
          link: '#',
        },
      ],
    },
    [PartyType.RESPONDENT]: {
      hyperlinks: [
        {
          label: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
          link: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
          target: '_blank',
        },
        {
          label: 'Add a legal representative',
          link: RESPONDENT_ADD_LEGAL_REPRESENTATIVE,
        },
        {
          label: 'Remove a legal representative',
          link: applyParms(REMOVE_LEGAL_REPRESENTATIVE_START, { partyType: PartyType.RESPONDENT }),
        },
        {
          label: 'Find my local court',
          link: '#',
        },
        {
          label: 'Find legal advice',
          link: '#',
        },
        {
          label: 'Know more about child arrangements',
          link: '#',
        },
        {
          label: 'Know more about attending court',
          link: '#',
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
          label: 'Beth i’w ddisgwyl pan fyddwch yn dod i lys neu dribiwnlys – GOV.UK(www.gov.uk)',
          link: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
          target: '_blank',
        },
        {
          label: 'Ychwanegu cynrychiolydd cyfreithiol',
          link: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
          target: '',
        },
        {
          label: 'Dileu cynrychiolydd cyfreithiol',
          link: applyParms(REMOVE_LEGAL_REPRESENTATIVE_START, { partyType: PartyType.APPLICANT }),
          target: '',
        },
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
          label: 'Deall beth yw Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
          link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
          target: '_blank',
        },
        {
          label: 'Gwirio os wyf yn gymwys i gael Cymorth Cyfreithiol',
          link: 'https://www.gov.uk/check-legal-aid',
          target: '_blank',
        },
        {
          label: 'Gwirio os wyf yn gymwys i gael Help i Dalu Ffioedd',
          link: 'https://www.gov.uk/get-help-with-court-fees',
          target: '_blank',
        },
        {
          label: 'Rhagor o wybodaeth am y Cynllun Talebau Cyfryngu Teuluol',
          link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
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
      ],
    },
    [PartyType.RESPONDENT]: {
      hyperlinks: [
        {
          label: 'Beth i’w ddisgwyl pan fyddwch yn dod i lys neu dribiwnlys – GOV.UK(www.gov.uk)',
          link: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
          target: '_blank',
        },
        {
          label: 'Ychwanegu cynrychiolydd cyfreithiol',
          link: RESPONDENT_ADD_LEGAL_REPRESENTATIVE,
        },
        {
          label: 'Dileu cynrychiolydd cyfreithiol',
          link: applyParms(REMOVE_LEGAL_REPRESENTATIVE_START, { partyType: PartyType.RESPONDENT }),
        },
        {
          label: 'Dod o hyd i fy llys lleol',
          link: '#',
        },
        {
          label: 'Dod o hyd i gyngor cyfreithiol',
          link: '#',
        },
        {
          label: 'Gwybod mwy am drefniadau plant',
          link: '#',
        },
        {
          label: 'Gwybod mwy am fynychu’r llys',
          link: '#',
        },
      ],
    },
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: {
      hyperlinks: [
        {
          label: 'Beth i’w ddisgwyl pan fyddwch yn dod i lys neu dribiwnlys – GOV.UK(www.gov.uk)',
          link: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
          target: '_blank',
        },
        {
          label: 'Ychwanegu cynrychiolydd cyfreithiol',
          link: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
        },
        {
          label: 'Dileu cynrychiolydd cyfreithiol',
          link: applyParms(REMOVE_LEGAL_REPRESENTATIVE_START, { partyType: PartyType.APPLICANT }),
        },
        {
          label: 'Dod o hyd i fy llys lleol',
          link: '#',
        },
        {
          label: 'Dod o hyd i gyngor cyfreithiol',
          link: '#',
        },
        {
          label: 'Gwybod mwy am drefniadau plant',
          link: '#',
        },
        {
          label: 'Gwybod mwy am fynychu’r llys',
          link: '#',
        },
      ],
    },
    [PartyType.RESPONDENT]: {
      hyperlinks: [
        {
          label: 'Beth i’w ddisgwyl pan fyddwch yn dod i lys neu dribiwnlys – GOV.UK(www.gov.uk)',
          link: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
          target: '_blank',
        },
        {
          label: 'Ychwanegu cynrychiolydd cyfreithiol',
          link: RESPONDENT_ADD_LEGAL_REPRESENTATIVE,
        },
        {
          label: 'Dileu cynrychiolydd cyfreithiol',
          link: applyParms(REMOVE_LEGAL_REPRESENTATIVE_START, { partyType: PartyType.RESPONDENT }),
        },
        {
          label: 'Dod o hyd i fy llys lleol',
          link: '#',
        },
        {
          label: 'Dod o hyd i gyngor cyfreithiol',
          link: '#',
        },
        {
          label: 'Gwybod mwy am drefniadau plant',
          link: '#',
        },
        {
          label: 'Gwybod mwy am fynychu’r llys',
          link: '#',
        },
      ],
    },
  },
};

export const languages = {
  en,
  cy,
};
