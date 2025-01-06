/* eslint-disable @typescript-eslint/no-unused-vars */
import { CaseWithId } from '../../../../app/case/case';
import { en as daCommonContent } from '../../miam/domestic-abuse/common.content';
import { enContent } from '../content';
import { MiamHelper, MiamHelperDynamicEnteriesMapper, miamParentAndChildFieldParser } from '../helpers/miamHelper';

/* eslint-disable @typescript-eslint/ban-types */
describe('MiamHelperDynamicEnteriesMapper Test cases', () => {
  enum selectors {
    DOMESTIC = 'domesticViolence',
    CHILD_PROTECTION = 'childProtection',
    URGENT = 'urgentHearing',
    PREV_MIAM = 'previousMIAMOrExempt',
    EXEMPT = 'validExemption',
    NONE = 'none',
  }
  const userCase = {
    miam_domesticAbuse: [
      'domesticViolence',
      'childProtection',
      'urgentHearing',
      'previousMIAMOrExempt',
      'validExemption',
    ],
  };

  test('domesticViolence Mapper Test case', () => {
    const pagedata = MiamHelperDynamicEnteriesMapper(
      selectors.DOMESTIC,
      enContent.keys,
      userCase as unknown as Partial<CaseWithId>,
      'en'
    );
    expect(pagedata.toString()).toBe(
      {
        changeUrl: '/c100-rebuild/miam/domestic-abuse',
        key: undefined,
        valueHtml:
          '<ul><li>undefined</li><li>undefined</li><li>undefined</li><li>undefined</li><li>undefined</li></ul>',
      }.toString()
    );
  });

  test('urgentHearing Mapper Test case', () => {
    const pagedata = MiamHelperDynamicEnteriesMapper(
      selectors.URGENT,
      enContent.keys,
      userCase as unknown as Partial<CaseWithId>,
      'en'
    );
    expect(pagedata.toString()).toBe(
      {
        changeUrl: '/c100-rebuild/miam/domestic-abuse',
        key: 'urgentHearing',
        valueHtml:
          '<ul><li>urgentHearing</li><li>urgentHearing</li><li>urgentHearing</li><li>urgentHearing</li><li>urgentHearing</li></ul>',
      }.toString()
    );
  });

  test('childProtection Mapper Test case', () => {
    const pagedata = MiamHelperDynamicEnteriesMapper(
      selectors.CHILD_PROTECTION,
      enContent.keys,
      userCase as unknown as Partial<CaseWithId>,
      'en'
    );
    expect(pagedata.toString()).toBe(
      {
        changeUrl: '/c100-rebuild/miam/domestic-abuse',
        key: undefined,
        valueHtml:
          '<ul><li>undefined</li><li>undefined</li><li>undefined</li><li>undefined</li><li>undefined</li></ul>',
      }.toString()
    );
  });
});

describe('Miam Fields parser', () => {
  test('miam_nonAttendanceReasons parser for miam', () => {
    const sessionKey = 'miam_domesticAbuse';
    const keys = { ...enContent.keys, ...daCommonContent };
    const userCase = {
      miam_nonAttendanceReasons: ['policeInvolvement', 'critcialTest'],
      miam_domesticAbuse: ['policeInvolvement'],
      miam_domesticAbuse_policeInvolvement_subfields: ['evidenceOfSomeoneArrest'],
      miam_canProvideDomesticAbuseEvidence: 'Yes',
      miam_domesticAbuseEvidenceDocs: [
        {
          document_url: 'test/1234',
          document_binary_url: 'binary/test/1234',
          document_filename: 'test_document',
          document_hash: '1234',
          document_creation_date: '1/1/2024',
        },
      ],
    };
    const str = miamParentAndChildFieldParser(
      userCase as unknown as Partial<CaseWithId>,
      keys as unknown as Record<string, string>,
      sessionKey,
      'en'
    );
    expect(str).toBe(
      'The police have been involved<ul><li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">Evidence that a party in the application has been arrested for a domestic abuse offence</li></ul><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><b>Can you provide evidence?</b><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">Yes<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><b>Evidence of domestic abuse</b><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><ul><li>test_document</li></ul>'
    );
  });
});

describe('Miam Fields parser - InstanceOfMiamHelper miamExemptionParser', () => {
  test('get correct list of reasons when all reasons selected', () => {
    const userCase = {
      miam_nonAttendanceReasons: [
        'domesticViolence',
        'urgentHearing',
        'childProtection',
        'previousMIAMOrExempt',
        'validExemption',
        'noReason',
      ],
    };
    expect(
      MiamHelper.miamExemptionParser(userCase, {
        ...enContent.keys,
        domesticViolenceHead: 'Domestic abuse',
        childProtectionHead: 'Child protection concerns',
        urgentHearingHead: 'Urgency',
        previousMIAMOrExemptHead: 'Previous attendance of a MIAM, or non-court dispute resolution (NCDR)',
        validExemptionHead: 'Other reason',
      })
    ).toStrictEqual({
      listOfReasons:
        '<ul><li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">Domestic abuse</li> <li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">Urgency</li> <li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">Child protection concerns</li> <li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">Previous attendance of a MIAM  or non-court dispute resolution (NCDR)</li> <li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">Other reason</li> <li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">undefined</li></ul>',
    });
  });

  test('get correct list of reasons when none is selected', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['none'],
    };
    expect(MiamHelper.miamExemptionParser(userCase, { ...enContent.keys, noneHead: 'None of these' })).toStrictEqual({
      listOfReasons: '<ul><li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">None of these</li></ul>',
    });
  });

  test('miam_nonAttendanceReasons - passed empty usercase for miamExemptionParser', () => {
    const userCase = {};
    expect(MiamHelper.miamExemptionParser(userCase, enContent.keys)).toStrictEqual({});
  });
});

describe('Miam Fields parser - InstanceOfMiamHelper miamExemptionParserDynamicEnteries', () => {
  test('miam_nonAttendanceReasons child protection parser for miam', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['childProtection'],
      miam_childProtectionEvidence: 'localAuthority',
    };
    expect(
      MiamHelper.miamExemptionParserDynamicEnteries(
        userCase,
        {
          ...enContent.keys,
          localAuthority:
            'The children in the application (or another child in the household) are the subject of a child protection plan put in place by the local authority',
        },
        'en'
      )
    ).toStrictEqual([
      {
        changeUrl: '/c100-rebuild/miam/child-protection',
        key: 'Which child protection concern applies?',
        valueHtml:
          'The children in the application (or another child in the household) are the subject of a child protection plan put in place by the local authority',
      },
    ]);
  });

  test('miam_nonAttendanceReasons urgent parser for miam', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['urgentHearing'],
      miam_urgency: 'freedomPhysicalSafety',
    };
    expect(
      MiamHelper.miamExemptionParserDynamicEnteries(
        userCase,
        {
          ...enContent.keys,
          freedomPhysicalSafety: 'There is a risk to your life, freedom or physical safety',
        },
        'en'
      )
    ).toStrictEqual([
      {
        changeUrl: '/c100-rebuild/miam/urgency',
        key: 'Why is your application urgent?',
        valueHtml: 'There is a risk to your life, freedom or physical safety',
      },
    ]);
  });

  test('miam_nonAttendanceReasons previous miam or NCDR parser for miam when no document uploaded', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['previousMIAMOrExempt'],
      miam_previousAttendance: 'miamExamptionApplied',
      miam_haveDocSignedByMediatorForPrevAttendance: 'No',
      miam_detailsOfEvidence: 'test data',
    };
    expect(
      MiamHelper.miamExemptionParserDynamicEnteries(
        userCase,
        {
          ...enContent.keys,
          miamExamptionApplied:
            'The application would be made in existing proceedings which are continuing and a MIAM exemption applied to the application for those proceedings',
        },
        'en'
      )
    ).toStrictEqual([
      {
        changeUrl: '/c100-rebuild/miam/previous-attendance',
        key: 'What evidence do you have that you previously attended a MIAM or NCDR?',
        valueHtml:
          'The application would be made in existing proceedings which are continuing and a MIAM exemption applied to the application for those proceedings<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><b>Do you have a document signed by a mediator?</b><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">No<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><b>Provide details of MIAM attendance</b><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">test data',
      },
    ]);
  });

  test('miam_nonAttendanceReasons previous miam or NCDR parser for miam when fourMonthsPriorAttended and document uploaded', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['previousMIAMOrExempt'],
      miam_previousAttendance: 'fourMonthsPriorAttended',
      miam_haveDocSignedByMediatorForPrevAttendance: 'Yes',
      miam_previousAttendanceEvidenceDoc: {
        document_url: 'test/1234',
        document_binary_url: 'binary/test/1234',
        document_filename: 'test_document',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    };
    expect(
      MiamHelper.miamExemptionParserDynamicEnteries(
        userCase,
        {
          ...enContent.keys,
          fourMonthsPriorAttended:
            'In the 4 months before making the application, you attended a MIAM or participated in another form of NCDR relating to the same (or substantially the same) dispute',
        },
        'en'
      )
    ).toStrictEqual([
      {
        changeUrl: '/c100-rebuild/miam/previous-attendance',
        key: 'What evidence do you have that you previously attended a MIAM or NCDR?',
        valueHtml:
          'In the 4 months before making the application, you attended a MIAM or participated in another form of NCDR relating to the same (or substantially the same) dispute<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><b>Evidence of attending a MIAM or NCDR</b><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">test_document',
      },
    ]);
  });

  test('miam_nonAttendanceReasons exempt parser for miam when noAppointmentAvailable', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['validExemption'],
      miam_notAttendingReasons: 'canNotAccessMediator',
      miam_noMediatorReasons: 'noAppointmentAvailable',
      miam_noAppointmentAvailableDetails: 'test data',
    };
    expect(MiamHelper.miamExemptionParserDynamicEnteries(userCase, enContent.keys, 'en')).toStrictEqual([
      {
        changeUrl: '/c100-rebuild/miam/miam-other',
        key: 'What other reason do you have for not attending a MIAM?',
        valueHtml:
          '<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><b>Why can you not access a mediator?</b><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">You are unable to attend a MIAM online or by video link because the  mediators contacted are unable to conduct a MIAM within 15 business days of the date of contact.<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><b>Give details of the mediators you’ve contacted</b><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">test data',
      },
    ]);
  });

  test('miam_nonAttendanceReasons exempt parser for miam when disability', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['validExemption'],
      miam_notAttendingReasons: 'canNotAccessMediator',
      miam_noMediatorReasons: 'disability',
      miam_unableToAttainDueToDisablityDetails: 'test data',
    };
    expect(MiamHelper.miamExemptionParserDynamicEnteries(userCase, enContent.keys, 'en')).toStrictEqual([
      {
        changeUrl: '/c100-rebuild/miam/miam-other',
        key: 'What other reason do you have for not attending a MIAM?',
        valueHtml:
          '<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><b>Why can you not access a mediator?</b><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">You have a disability or other inability that prevents you from attending a MIAM in person online or by video link and the contacted mediators are unable to provide appropriate facilities for you to attend.<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><b>Give details of the mediators you’ve contacted</b><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">test data',
      },
    ]);
  });

  test('miam_nonAttendanceReasons exempt parser for miam when noMediatorIn15mile', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['validExemption'],
      miam_notAttendingReasons: 'canNotAccessMediator',
      miam_noMediatorReasons: 'noMediatorIn15mile',
      miam_noMediatorIn15mileDetails: 'test data',
    };
    expect(MiamHelper.miamExemptionParserDynamicEnteries(userCase, enContent.keys, 'en')).toStrictEqual([
      {
        changeUrl: '/c100-rebuild/miam/miam-other',
        key: 'What other reason do you have for not attending a MIAM?',
        valueHtml:
          '<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><b>Why can you not access a mediator?</b><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">There is no mediator within 15 miles of your home and you cannot attend the MIAM online or by video link.<hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><b>Give details of the mediators you’ve contacted</b><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible">test data',
      },
    ]);
  });

  test('miam_nonAttendanceReasons - empty userCase parser for miam', () => {
    const userCase = {};
    MiamHelper.miamExemptionParserDynamicEnteries(userCase, enContent.keys, '');
  });
});
