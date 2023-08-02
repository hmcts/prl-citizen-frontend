import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CaseType, SectionStatus, State, YesOrNo } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';
import {
  APPLICANT,
  APPLICANT_CA_DA_REQUEST,
  FIND_OUT_ABOUT_CAFCASS,
  FIND_OUT_ABOUT_CAFCASS_CYMRU,
  FIND_OUT_ABOUT_CAFCASS_CYMRU_WELSH,
  FIND_OUT_ABOUT_CAFCASS_WELSH,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  RESPONDENT_VIEW_ALL_DOCUMENTS,
  RESPOND_TO_APPLICATION,
} from '../../urls';

import { generateContent, getC100Banners, getFl401Banners, getRespondent, getRespondentName } from './content';
import { respondent_cy, respondent_en } from './section-titles';
import { respondent_tasklist_items_cy, respondent_tasklist_items_en } from './tasklist-items';
import { getRespondentPartyDetailsCa } from './utils';
//import { buildProgressBarStages } from '../../../app/utils/progress-bar-utils';

const c100Case = {
  id: '12',
  state: State.CASE_SUBMITTED_PAID,
  citizenResponseC7DocumentList: [
    {
      id: 'string',
      value: {
        partyName: 'string',
        createdBy: '1',
        dateCreated: new Date(),
        citizenDocument: {
          document_url: 'string',
          document_filename: 'string',
          document_binary_url: 'string',
          document_hash: 'string',
        },
      },
    },
  ],
  respondents: [
    {
      id: '1',
      value: {
        email: 'abc',
        gender: 'male',
        address: {
          AddressLine1: '',
          AddressLine2: '',
          PostTown: '',
          County: '',
          PostCode: '',
        },
        dxNumber: '123',
        landline: '987654321',
        lastName: 'Smith',
        firstName: 'John',
        dateOfBirth: '',
        otherGender: '',
        phoneNumber: '',
        placeOfBirth: '',
        previousName: '',
        solicitorOrg: {
          OrganisationID: '',
          OrganisationName: '',
        },
        sendSignUpLink: '',
        solicitorEmail: '',
        isAddressUnknown: '',
        solicitorAddress: {
          County: '',
          Country: '',
          PostCode: '',
          PostTown: '',
          AddressLine1: '',
          AddressLine2: '',
          AddressLine3: '',
        },
        isDateOfBirthKnown: '',
        solicitorReference: '',
        solicitorTelephone: '',
        isPlaceOfBirthKnown: '',
        isDateOfBirthUnknown: '',
        isAddressConfidential: '',
        isCurrentAddressKnown: '',
        relationshipToChildren: '',
        representativeLastName: '',
        representativeFirstName: '',
        canYouProvidePhoneNumber: '',
        canYouProvideEmailAddress: '',
        isAtAddressLessThan5Years: '',
        isPhoneNumberConfidential: '',
        isEmailAddressConfidential: '',
        respondentLivedWithApplicant: '',
        doTheyHaveLegalRepresentation: '',
        addressLivedLessThan5YearsDetails: '',
        otherPersonRelationshipToChildren: [''],
        isAtAddressLessThan5YearsWithDontKnow: '',
        response: {
          citizenFlags: {
            isAllDocumentsViewed: 'No',
            isResponseInitiated: 'Yes',
          },
        },
        user: {
          email: 'abc',
          idamId: '12345',
        },
      },
    },
  ],
  caseTypeOfApplication: CaseType.C100,
};

const userDetail = {
  accessToken: '1234',
  id: '12345',
  email: 'abc',
  givenName: 'John',
  familyName: 'Smith',
};

const en = () => ({
  title: 'Respondent tasklist',
  caseNumber: 'Case number #',
  respondentName: '',
  want: 'I want to...',
  findMyLocalCourt: 'Find my local court',
  findLegalAdvice: 'Find legal advice',
  knowMoreAboutChildArrangements: 'Know more about child arrangements',
  knowMoreAboutAttendingCourt: 'Know more about attending court',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'To Do',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
    [SectionStatus.VIEW]: 'VIEW',
  },
  sectionTitles: respondent_en,
  taskListItems: respondent_tasklist_items_en,
  newOrderBanner: {
    bannerHeading: 'You have a new order from the court',
    bannerContent: [
      {
        line1: 'The court has made a decision about your case. The order tells you what the court has decided.',
      },
    ],
    bannerLinks: [
      {
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}`,
        text: 'View the order (PDF)',
      },
    ],
  },
  finalOrderBanner: {
    bannerHeading: 'You have a final order',
    bannerContent: [
      {
        line1: 'The court has made a final decision about your case. The order tells you what the court has decided. ',
      },
    ],
    bannerLinks: [
      {
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}`,
        text: 'View the order (PDF)',
      },
    ],
  },
  caRespondentServedBanner: {
    bannerHeading: 'Respond to an application about a child',
    bannerContent: [
      {
        line1: 'Another person (the applicant) has applied to the court to make a decision about a child.',
        line2:
          'You should respond within 14 days of receiving the application unless the court has asked you to respond sooner.',
      },
    ],
    bannerLinks: [
      {
        href: `${APPLICANT}${APPLICANT_CA_DA_REQUEST}`,
        text: 'Check the application (PDF)',
      },
      {
        href: RESPOND_TO_APPLICATION + '/updateFlag',
        text: 'Respond to the application',
      },
    ],
  },
  cafcassBanner: {
    bannerHeading: 'Cafcass will contact you **',
    bannerContent: [
      {
        line1:
          'The Children and Family Court advisory and Support Service (Cafcass or Cafcass Cymru) will contact you to consider the needs of the children.',
      },
    ],
    bannerLinks: [
      {
        href: FIND_OUT_ABOUT_CAFCASS,
        text: 'Find out about Cafcass',
      },
      {
        href: FIND_OUT_ABOUT_CAFCASS_CYMRU,
        text: 'Find out about Cafcass Cymru ',
      },
    ],
  },
  daRespondentBanner: {
    bannerHeading:
      'You have been named as the respondent in a domestic abuse application and have an order from the court',
    bannerContent: [
      {
        line1:
          'This means that another person (the applicant) has applied to a court for protection from domestic abuse.',
        line2: 'The court has considered their concerns. The order tells you what the court has decided.',
      },
    ],
    bannerLinks: [
      {
        href: RESPONDENT_ORDERS_FROM_THE_COURT,
        text: 'Read the order (PDF)',
      },
      {
        href: `${APPLICANT}${APPLICANT_CA_DA_REQUEST}`,
        text: 'Read the application (PDF)',
      },
    ],
  },
  viewDocumentBanner: {
    bannerHeading: 'You have a new document to view',
    bannerContent: [
      {
        line1: 'A new document has been added to your case.',
      },
    ],
    bannerLinks: [
      {
        href: RESPONDENT_VIEW_ALL_DOCUMENTS,
        text: 'See all documents',
      },
    ],
  },
});

const cy = () => ({
  title: 'Respondent tasklist - welsh',
  caseNumber: 'Rhif yr achos #',
  respondentName: '',
  want: 'Rwyf eisiau ...',
  findMyLocalCourt: 'Find my local court',
  findLegalAdvice: 'Dod o hyd i gyngor cyfreithiol',
  knowMoreAboutChildArrangements: 'Know more about child arrangements',
  knowMoreAboutAttendingCourt: 'Gwybod mwy am fynychu’r llys',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi’i gwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.READY_TO_VIEW]: 'Yn barod i’w gweld',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Ddim ar gael eto',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD (in Welsh)',
    [SectionStatus.VIEW]: 'VIEW (in Welsh)',
  },
  sectionTitles: respondent_cy,
  taskListItems: respondent_tasklist_items_cy,
  newOrderBanner: {
    bannerHeading: 'Mae gennych orchymyn newydd gan y llys',
    bannerContent: [
      {
        line1:
          'Mae’r llys wedi gwneud penderfyniad ynghylch eich achos. Mae’r gorchymyn yn dweud wrthych beth y mae’r llys wedi penderfynu. ',
      },
    ],
    bannerLinks: [
      {
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}`,
        text: 'Gweld y gorchymyn (PDF)',
      },
    ],
  },
  finalOrderBanner: {
    bannerHeading: 'Mae gennych orchymyn terfynol',
    bannerContent: [
      {
        line1:
          'Mae’r llys wedi gwneud penderfyniad terfynol ynghylch eich achos. Mae’r gorchymyn yn dweud wrthych beth y mae’r llys wedi penderfynu.  ',
      },
    ],
    bannerLinks: [
      {
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}`,
        text: 'Gweld y gorchymyn (PDF)',
      },
    ],
  },
  caRespondentServedBanner: {
    bannerHeading: 'Ymateb i gais ynghylch plentyn',
    bannerContent: [
      {
        line1: 'Mae person arall (y ceisydd) wedi gwneud cais i’r llys wneud penderfyniad ynghylch plentyn.',
        line2: 'Dylech ymateb o fewn 14 diwrnod o dderbyn y cais oni bai bod y llys wedi gofyn i chi ymateb yn gynt.',
      },
    ],
    bannerLinks: [
      {
        href: `${APPLICANT}${APPLICANT_CA_DA_REQUEST}`,
        text: 'Gwirio’r cais (PDF)',
      },
      {
        href: RESPOND_TO_APPLICATION + '/updateFlag',
        text: "Ymateb i'r cais",
      },
    ],
  },
  cafcassBanner: {
    bannerHeading: 'Bydd Cafcass yn cysylltu â chi **',
    bannerContent: [
      {
        line1:
          'Bydd y Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd (Cafcass neu Cafcass Cymru) yn cysylltu â chi i ystyried anghenion y plant.',
      },
    ],
    bannerLinks: [
      {
        href: FIND_OUT_ABOUT_CAFCASS_WELSH,
        text: 'Gwybodaeth am Cafcass',
      },
      {
        href: FIND_OUT_ABOUT_CAFCASS_CYMRU_WELSH,
        text: 'Gwybodaeth am Cafcass Cymru ',
      },
    ],
  },
  daRespondentBanner: {
    bannerHeading:
      'Rydych wedi cael eich enwi fel yr atebydd mewn cais cam-drin domestig ac mae gennych orchymyn gan y llys',
    bannerContent: [
      {
        line1:
          'Mae hyn yn golygu bod unigolyn arall (y ceisydd) wedi gwneud cais i’r llys am orchymyn amddiffyn rhag cam-drin domestig.',
        line2:
          'Mae’r llys wedi ystyried eu pryderon. Mae’r gorchymyn hwn yn dweud wrthych beth mae’r llys wedi penderfynu.',
      },
    ],
    bannerLinks: [
      {
        href: RESPONDENT_ORDERS_FROM_THE_COURT,
        text: 'Darllen y gorchymyn (PDF)',
      },
      {
        href: `${APPLICANT}${APPLICANT_CA_DA_REQUEST}`,
        text: 'Darllen y gorchymyn (PDF)',
      },
    ],
  },
  viewDocumentBanner: {
    bannerHeading: 'Mae gennych ddogfen newydd i edrych arni',
    bannerContent: [
      {
        line1: 'Mae dogfen newydd wedi’i hychwanegu i’ch achos.',
      },
    ],
    bannerLinks: [
      {
        href: RESPONDENT_VIEW_ALL_DOCUMENTS,
        text: 'See all documents',
      },
    ],
  },
});

const languages = {
  en,
  cy,
};

const enContent = {
  title: 'Respondent tasklist',
  respondentName: ' ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'To Do',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
    [SectionStatus.VIEW]: 'VIEW',
  },
  sectionTitles: respondent_en,
  taskListItems: respondent_tasklist_items_en,
  iWantTo: 'I want to...',
  hyperlinks: [
    {
      label: 'Add a legal representative',
      link: '/respondent/add-legal-representative',
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
};

const cyContent = {
  title: 'Rhestr Tasgau’r Atebydd',
  respondentName: ' ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi’i gwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.READY_TO_VIEW]: 'Yn barod i’w gweld',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Ddim ar gael eto',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
    [SectionStatus.VIEW]: 'GWELD',
  },
  sectionTitles: respondent_cy,
  taskListItems: respondent_tasklist_items_cy,
  iWantTo: 'Rwyf eisiau ...',
  hyperlinks: [
    {
      label: 'Ychwanegu cynrychiolydd cyfreithiol',
      link: '/respondent/add-legal-representative',
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
};

describe('task-list > content', () => {
  const commonContent = {
    language: 'en',
    userCase: c100Case,
    additionalData: {
      req: {
        session: {
          user: { id: '' },
          userCase: {
            ...mockUserCase,
            respondentsFL401: {
              firstName: '',
              lastName: '',
            },
            applicantsFL401: {
              firstName: '',
              lastName: '',
            },
            caseTypeOfApplication: 'FL401',
          },
        },
      },
    },
  } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('en', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test.skip.each([
    {
      userCase: mockUserCase,
      expected: [
        {
          items: [
            {
              href: '/respondent/keep-details-private/details_known/' + mockUserCase.id,
              id: 'keep-your-details-private',
              status: 'TO_DO',
              text: 'Keep your details private',
            },
            {
              href: '/respondent/confirm-contact-details/checkanswers',
              id: 'confirm-or-edit-your-contact-details',
              status: 'IN_PROGRESS',
              text: 'Confirm or edit your contact details',
            },
            {
              href: '/respondent/support-you-need-during-case/attending-the-court',
              id: 'support_you_need_during_your_case',
              status: 'TO_DO',
              text: 'Support you need during your case',
            },
          ],
          title: 'About you',
        },
        {
          items: [
            {
              href: '/tasklistresponse/miam/miam-start',
              id: 'check_the_application',
              status: 'IN_PROGRESS',
              text: 'Check the application (PDF)',
            },
          ],
          title: 'The application',
        },
        {
          items: [
            {
              href: '/tasklistresponse/international-factors/start',
              id: 'check_details_of_your_court_hearings',
              status: 'TO_DO',
              text: 'Check details of your court hearings',
            },
          ],
          title: 'Your court hearings',
        },
        {
          items: [
            {
              href: '/respondent/yourdocuments/alldocuments/alldocuments',
              id: 'view-all-documents',
              status: 'READY_TO_VIEW',
              text: 'View all documents',
            },
            {
              href: '/respondent/upload-document',
              id: 'upload-document',
              status: SectionStatus.TO_DO,
              text: 'Upload Documents',
            },
          ],
          title: 'Your documents',
        },
        {
          items: [
            {
              href: '#',
              id: 'view-all-orders-from-the-court',
              status: 'NOT_AVAILABLE_YET',
              text: 'View all orders from the court',
            },
          ],
          title: 'Orders from the court',
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });

  test('Should return the correct content', () => {
    const commonContent2 = {
      language: 'en',
      userCase: c100Case,
      additionalData: {
        req: {
          session: {
            user: { id: '12345' },
            userCase: {
              ...mockUserCase,
              respondentsFL401: {
                firstName: '',
                lastName: '',
              },
              applicantsFL401: {
                firstName: '',
                lastName: '',
              },
            },
          },
        },
      },
    } as unknown as CommonContent;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const common = generateContent(commonContent2) as Record<string, any>;
    const respondent = getRespondentPartyDetailsCa(c100Case, userDetail.id);
    expect(respondent).toEqual(c100Case.respondents[0]);
    expect(common.stages[2]).toEqual({
      active: true,
      ariaLabel: 'Response submitted stage',
      completed: true,
      title: 'Response<br/> submitted',
    });
  });

  test('should return respondent firstname and lastname', () => {
    expect(getRespondentName(getRespondent(c100Case, '12345'))).toBe('John Smith');
  });

  test('should return respondentFL401 firstname and lastname', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_PAID,
      respondentsFL401: {
        email: 'abc',
        gender: 'male',
        address: {
          AddressLine1: '',
          AddressLine2: '',
          PostTown: '',
          County: '',
          PostCode: '',
        },
        dxNumber: '123',
        landline: '987654321',
        lastName: 'Smith',
        firstName: 'John',
        dateOfBirth: '',
        otherGender: '',
        phoneNumber: '',
        placeOfBirth: '',
        previousName: '',
        solicitorOrg: {
          OrganisationID: '',
          OrganisationName: '',
        },
        sendSignUpLink: '',
        solicitorEmail: '',
        isAddressUnknown: '',
        solicitorAddress: {
          County: '',
          Country: '',
          PostCode: '',
          PostTown: '',
          AddressLine1: '',
          AddressLine2: '',
          AddressLine3: '',
        },
        isDateOfBirthKnown: '',
        solicitorReference: '',
        solicitorTelephone: '',
        isPlaceOfBirthKnown: '',
        isDateOfBirthUnknown: '',
        isAddressConfidential: '',
        isCurrentAddressKnown: '',
        relationshipToChildren: '',
        representativeLastName: '',
        representativeFirstName: '',
        canYouProvidePhoneNumber: '',
        canYouProvideEmailAddress: '',
        isAtAddressLessThan5Years: '',
        isPhoneNumberConfidential: '',
        isEmailAddressConfidential: '',
        respondentLivedWithApplicant: '',
        doTheyHaveLegalRepresentation: '',
        addressLivedLessThan5YearsDetails: '',
        otherPersonRelationshipToChildren: [''],
        isAtAddressLessThan5YearsWithDontKnow: '',
        response: {},
        user: {
          email: 'abc',
          idamId: '12345',
        },
      },
      caseTypeOfApplication: CaseType.FL401,
    };

    expect(getRespondentName(getRespondent(data, '12345'))).toBe('John Smith');
  });

  test('should return C100-banners', () => {
    const banner = [
      {
        bannerHeading: 'You have a new document to view',
        bannerContent: [
          {
            line1: 'A new document has been added to your case.',
          },
        ],
        bannerLinks: [
          {
            href: '/respondent/yourdocuments/alldocuments/alldocuments',
            text: 'See all documents',
          },
        ],
      },
    ];
    expect(getC100Banners(c100Case, languages[commonContent.language](), userDetail.id)).toEqual(banner);
  });

  test('should return Fl401-banners', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_PAID,
      orderWithoutGivingNoticeToRespondent: {
        orderWithoutGivingNotice: YesOrNo.YES,
      },
      respondentsFL401: {
        email: 'abc',
        gender: 'male',
        address: {
          AddressLine1: '',
          AddressLine2: '',
          PostTown: '',
          County: '',
          PostCode: '',
        },
        dxNumber: '123',
        landline: '987654321',
        lastName: 'Smith',
        firstName: 'John',
        dateOfBirth: '',
        otherGender: '',
        phoneNumber: '',
        placeOfBirth: '',
        previousName: '',
        solicitorOrg: {
          OrganisationID: '',
          OrganisationName: '',
        },
        sendSignUpLink: '',
        solicitorEmail: '',
        isAddressUnknown: '',
        solicitorAddress: {
          County: '',
          Country: '',
          PostCode: '',
          PostTown: '',
          AddressLine1: '',
          AddressLine2: '',
          AddressLine3: '',
        },
        isDateOfBirthKnown: '',
        solicitorReference: '',
        solicitorTelephone: '',
        isPlaceOfBirthKnown: '',
        isDateOfBirthUnknown: '',
        isAddressConfidential: '',
        isCurrentAddressKnown: '',
        relationshipToChildren: '',
        representativeLastName: '',
        representativeFirstName: '',
        canYouProvidePhoneNumber: '',
        canYouProvideEmailAddress: '',
        isAtAddressLessThan5Years: '',
        isPhoneNumberConfidential: '',
        isEmailAddressConfidential: '',
        respondentLivedWithApplicant: '',
        doTheyHaveLegalRepresentation: '',
        addressLivedLessThan5YearsDetails: '',
        otherPersonRelationshipToChildren: [''],
        isAtAddressLessThan5YearsWithDontKnow: '',
        response: {
          citizenFlags: {
            isAllDocumentsViewed: 'No',
            isResponseInitiated: 'Yes',
          },
        },
        user: {
          email: 'abc',
          idamId: '12345',
        },
      },
      caseTypeOfApplication: CaseType.FL401,
      orderCollection: [
        {
          id: 'e5b89eae-d6e1-4e15-a672-22a032617ff2',
          value: {
            dateCreated: '2022-07-18T11:04:34.483637',
            orderType: 'Special guardianship order (C43A)',
            orderDocument: {
              document_url: 'string',
              document_binary_url: 'string',
              document_filename: 'Special_Guardianship_Order_C43A.pdf',
            },
            otherDetails: {
              createdBy: 'qaz',
              orderCreatedDate: '18 July 2022',
              orderMadeDate: '11 November 2019',
              orderRecipients: 'Test Solicitor\n\n',
            },
          },
        },
      ],
    };

    const data2 = {
      id: '12',
      state: State.ALL_FINAL_ORDERS_ISSUED,
      orderWithoutGivingNoticeToRespondent: {
        orderWithoutGivingNotice: YesOrNo.YES,
      },
      respondentsFL401: {
        email: 'abc',
        gender: 'male',
        address: {
          AddressLine1: '',
          AddressLine2: '',
          PostTown: '',
          County: '',
          PostCode: '',
        },
        dxNumber: '123',
        landline: '987654321',
        lastName: 'Smith',
        firstName: 'John',
        dateOfBirth: '',
        otherGender: '',
        phoneNumber: '',
        placeOfBirth: '',
        previousName: '',
        solicitorOrg: {
          OrganisationID: '',
          OrganisationName: '',
        },
        sendSignUpLink: '',
        solicitorEmail: '',
        isAddressUnknown: '',
        solicitorAddress: {
          County: '',
          Country: '',
          PostCode: '',
          PostTown: '',
          AddressLine1: '',
          AddressLine2: '',
          AddressLine3: '',
        },
        isDateOfBirthKnown: '',
        solicitorReference: '',
        solicitorTelephone: '',
        isPlaceOfBirthKnown: '',
        isDateOfBirthUnknown: '',
        isAddressConfidential: '',
        isCurrentAddressKnown: '',
        relationshipToChildren: '',
        representativeLastName: '',
        representativeFirstName: '',
        canYouProvidePhoneNumber: '',
        canYouProvideEmailAddress: '',
        isAtAddressLessThan5Years: '',
        isPhoneNumberConfidential: '',
        isEmailAddressConfidential: '',
        respondentLivedWithApplicant: '',
        doTheyHaveLegalRepresentation: '',
        addressLivedLessThan5YearsDetails: '',
        otherPersonRelationshipToChildren: [''],
        isAtAddressLessThan5YearsWithDontKnow: '',
        response: {
          citizenFlags: {
            isAllDocumentsViewed: 'No',
            isResponseInitiated: 'Yes',
          },
        },
        user: {
          email: 'abc',
          idamId: '12345',
        },
      },
      caseTypeOfApplication: CaseType.FL401,
      orderCollection: [
        {
          id: 'e5b89eae-d6e1-4e15-a672-22a032617ff2',
          value: {
            dateCreated: '2022-07-18T11:04:34.483637',
            orderType: 'Special guardianship order (C43A)',
            orderDocument: {
              document_url: 'string',
              document_binary_url: 'string',
              document_filename: 'Special_Guardianship_Order_C43A.pdf',
            },
            otherDetails: {
              createdBy: 'qaz',
              orderCreatedDate: '18 July 2022',
              orderMadeDate: '11 November 2019',
              orderRecipients: 'Test Solicitor\n\n',
            },
          },
        },
      ],
    };

    const newOrderBanner = [
      {
        bannerHeading: 'You have a new document to view',
        bannerContent: [
          {
            line1: 'A new document has been added to your case.',
          },
        ],
        bannerLinks: [
          {
            href: '/respondent/yourdocuments/alldocuments/alldocuments',
            text: 'See all documents',
          },
        ],
      },
      {
        bannerHeading: 'You have a new order from the court',
        bannerContent: [
          {
            line1: 'The court has made a decision about your case. The order tells you what the court has decided.',
          },
        ],
        bannerLinks: [
          {
            href: '/respondent/yourdocuments/alldocuments/orders',
            text: 'View the order (PDF)',
          },
        ],
      },
    ];

    const finalOrderBanner = [
      {
        bannerHeading: 'You have a new document to view',
        bannerContent: [
          {
            line1: 'A new document has been added to your case.',
          },
        ],
        bannerLinks: [
          {
            href: '/respondent/yourdocuments/alldocuments/alldocuments',
            text: 'See all documents',
          },
        ],
      },
      {
        bannerHeading: 'You have a final order',
        bannerContent: [
          {
            line1:
              'The court has made a final decision about your case. The order tells you what the court has decided. ',
          },
        ],
        bannerLinks: [
          {
            href: '/respondent/yourdocuments/alldocuments/orders',
            text: 'View the order (PDF)',
          },
        ],
      },
    ];

    expect(getFl401Banners(data, languages[commonContent.language](), userDetail.id)).toEqual(newOrderBanner);
    expect(getFl401Banners(data2, languages[commonContent.language](), userDetail.id)).toEqual(finalOrderBanner);
  });
});
