import { otherProceedingsContents } from './otherProceeding.util';

describe('test cases for otherProceedingsContents', () => {
  test('english', () => {
    expect(otherProceedingsContents('en')).toStrictEqual({
      addOrderLabel: 'Add another order',
      additionalNote:
        'If you do not have the specific details, you can skip this section and proceed with the application.',
      careOrderLabel: 'Care Order',
      caseNumberHint: 'For example, BS19F99999',
      caseNumberLabel: 'Case number (optional)',
      childAbductionOrderLabel: 'Child Abduction Order',
      childArrangementOrderLabel: 'Child Arrangements Order',
      childMaintenanceOrderLabel: 'Child Maintenance Order',
      childrenInvolvedCourtCase: 'Have the children been involved in a court case?',
      contactOrderForAdoptionLabel:
        'A contact or residence order (Section 8 Children Act 1989) made in connection with an Adoption Order',
      contactOrderForDivorceLabel:
        'A contact or residence order (Section 8 Children Act 1989) made within proceedings for a divorce or dissolution of a civil partnership',
      copyOfOrderLabel: 'Do you have a copy of the order? (optional)',
      courtIssuedLabel: 'Which court issued the order? (optional)',
      courtOrderProtection: 'Have you had a court order made for your protection?',
      emergencyProtectionOrderLabel: 'Emergency Protection Order',
      errors: {
        orderDate: {
          incompleteDay: 'Order date must include a day',
          incompleteMonth: 'Order date must include a month',
          incompleteYear: 'Order date must include a year',
          invalidDate: 'Order date must be a real date',
          invalidDateInFuture: 'Order date must be in the past',
        },
        orderEndDate: {
          incompleteDay: 'Order end date must include a day',
          incompleteMonth: 'Order end date must include a month',
          incompleteYear: 'Order end date must include a year',
          invalidDate: 'Order end date must be a real date',
          invalidDateInFuture: 'Order end date must be in the past',
        },
      },
      financialOrderLabel: 'Financial Order',
      forcedMarriageProtectionOrderLabel: 'Forced Marriage Protection Order',
      headingTitle: 'Have you or the children ever been involved in court proceedings?',
      isCurrentOrderLabel: 'Is this a current order? (optional)',
      nonMolestationOrderLabel: 'Non-molestation Order',
      occupationOrderLabel: 'Occupation Order',
      one: 'Yes',
      orderDateHint: 'For example, 31 3 2015',
      orderDateLabel: 'What date was it made? (optional)',
      orderEndDateLabel: 'What date did it end? (optional)',
      otherInjuctionOrderLabel: 'Other Injunction Order',
      otherOrderLabel: 'Other Order',
      pageTitle: 'Provide details of court cases you or the children have been involved in',
      restrainingOrderLabel: 'Restraining Order',
      supervisionOrderLabel: 'Supervision Order',
      two: 'No',
      undertakingOrderLabel: 'Undertaking Order',
    });
  });
  test('notenglish', () => {
    expect(otherProceedingsContents('cy')).toStrictEqual({
      addOrderLabel: 'Add another order - welsh',
      additionalNote:
        'If you do not have the specific details, you can skip this section and proceed with the application. - welsh',
      careOrderLabel: 'Care Order - welsh',
      caseNumberHint: 'For example, BS19F99999 - welsh',
      caseNumberLabel: 'Case number (optional) - welsh',
      childAbductionOrderLabel: 'Child Abduction Order - welsh',
      childArrangementOrderLabel: 'Child Arrangements Order - welsh',
      childMaintenanceOrderLabel: 'Child Maintenance Order - welsh',
      childrenInvolvedCourtCase: 'Have the children been involved in a court case? - welsh',
      contactOrderForAdoptionLabel:
        'A contact or residence order (Section 8 Children Act 1989) made in connection with an Adoption Order - welsh',
      contactOrderForDivorceLabel:
        'A contact or residence order (Section 8 Children Act 1989) made within proceedings for a divorce or dissolution of a civil partnership - welsh',
      copyOfOrderLabel: 'Do you have a copy of the order? (optional) - welsh',
      courtIssuedLabel: 'Which court issued the order? (optional) - welsh',
      courtOrderProtection: 'Have you had a court order made for your protection? - welsh',
      emergencyProtectionOrderLabel: 'Emergency Protection Order - welsh',
      errors: {
        orderDate: {
          incompleteDay: 'Order date must include a day - welsh',
          incompleteMonth: 'Order date must include a month - welsh',
          incompleteYear: 'Order date must include a year - welsh',
          invalidDate: 'Order date must be a real date - welsh',
          invalidDateInFuture: 'Order date must be in the past - welsh',
        },
        orderEndDate: {
          incompleteDay: 'Order end date must include a day - welsh',
          incompleteMonth: 'Order end date must include a month - welsh',
          incompleteYear: 'Order end date must include a year - welsh',
          invalidDate: 'Order end date must be a real date - welsh',
          invalidDateInFuture: 'Order end date must be in the past - welsh',
        },
      },
      financialOrderLabel: 'Financial Order - welsh',
      forcedMarriageProtectionOrderLabel: 'Forced Marriage Protection Order - welsh',
      headingTitle: 'Have you or the children ever been involved in court proceedings? - welsh',
      isCurrentOrderLabel: 'Is this a current order? (optional) - welsh',
      nonMolestationOrderLabel: 'Non-molestation Order - welsh',
      occupationOrderLabel: 'Occupation Order - welsh',
      one: 'Yes - welsh',
      orderDateHint: 'For example, 31 3 2015 - welsh',
      orderDateLabel: 'What date was it made? (optional) - welsh',
      orderEndDateLabel: 'What date did it end? (optional) - welsh',
      otherInjuctionOrderLabel: 'Other Injunction Order - welsh',
      otherOrderLabel: 'Other Order - welsh',
      pageTitle: 'Provide details of court cases you or the children have been involved in - welsh',
      restrainingOrderLabel: 'Restraining Order - welsh',
      supervisionOrderLabel: 'Supervision Order - welsh',
      two: 'No - welsh',
      undertakingOrderLabel: 'Undertaking Order - welsh',
    });
  });
});
