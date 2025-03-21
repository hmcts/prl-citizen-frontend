import { InternationElementHelper } from './InternationElementsHelper';
const userCase = {
  ie_internationalStart: 'Yes',
  ie_provideDetailsStart: 'ie_provideDetailsStart',
  ie_internationalParents: 'Yes',
  ie_provideDetailsParents: 'ie_provideDetailsParents',
  ie_internationalJurisdiction: 'Yes',
  ie_provideDetailsJurisdiction: 'ie_provideDetailsJurisdiction',
  ie_internationalRequest: 'Yes',
  ie_provideDetailsRequest: 'ie_provideDetailsRequest',
};

const keys = {
  liveOutSideUk: 'liveOutSideUk',
  basedOutSideEnglandOrWales: 'basedOutSideEnglandOrWales',
  anotherPersonSameOrder: 'anotherPersonSameOrder',
  otherCountryRequestInfo: 'otherCountryRequestInfo',
  details: 'details',
};

const Urls = {
  C100_INTERNATIONAL_ELEMENTS_START: 'C100_INTERNATIONAL_ELEMENTS_START',
  C100_INTERNATIONAL_ELEMENTS_PARENTS: 'C100_INTERNATIONAL_ELEMENTS_PARENTS',
  C100_INTERNATIONAL_ELEMENTS_JURISDICTION: 'C100_INTERNATIONAL_ELEMENTS_JURISDICTION',
  C100_INTERNATIONAL_ELEMENTS_REQUEST: 'C100_INTERNATIONAL_ELEMENTS_REQUEST',
};
const dummy = [
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_START',
    key: 'liveOutSideUk',
    anchorReference: 'ie_internationalStart',
    valueHtml:
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">ie_provideDetailsStart</dd></div></dl>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_PARENTS',
    key: 'basedOutSideEnglandOrWales',
    anchorReference: 'ie_internationalParents',
    valueHtml:
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">ie_provideDetailsParents</dd></div></dl>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_JURISDICTION',
    key: 'anotherPersonSameOrder',
    anchorReference: 'ie_internationalJurisdiction',
    valueHtml:
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">ie_provideDetailsJurisdiction</dd></div></dl>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_REQUEST',
    anchorReference: 'ie_internationalRequest',
    key: 'otherCountryRequestInfo',
    valueHtml:
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">ie_provideDetailsRequest</dd></div></dl>',
  },
];

const dummyTwo = [
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_START',
    key: 'liveOutSideUk',
    anchorReference: 'ie_internationalStart',
    valueHtml:
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_PARENTS',
    key: 'basedOutSideEnglandOrWales',
    anchorReference: 'ie_internationalParents',
    valueHtml:
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_JURISDICTION',
    key: 'anotherPersonSameOrder',
    anchorReference: 'ie_internationalJurisdiction',
    valueHtml:
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_REQUEST',
    key: 'otherCountryRequestInfo',
    anchorReference: 'ie_internationalRequest',
    valueHtml:
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
  },
];
describe('InternationElementHelper', () => {
  const language = 'en';
  test('InternaElementHelper', () => {
    expect(InternationElementHelper(userCase, keys, Urls, language)).toStrictEqual(dummy);
  });

  test('InternaElementHelper without valueHTML', () => {
    expect(InternationElementHelper({}, keys, Urls, language)).toStrictEqual(dummyTwo);
  });

  test('InternaElementHelper should return correct html without subfields', () => {
    expect(
      InternationElementHelper(
        {
          ie_internationalStart: 'Yes',
          ie_internationalParents: 'Yes',
          ie_internationalJurisdiction: 'Yes',
          ie_internationalRequest: 'Yes',
        },
        keys,
        Urls,
        language
      )
    ).toEqual([
      {
        key: keys['liveOutSideUk'],
        anchorReference: 'ie_internationalStart',
        valueHtml:
          '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
        changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_START'],
      },
      {
        key: keys['basedOutSideEnglandOrWales'],
        anchorReference: 'ie_internationalParents',
        valueHtml:
          '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
        changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_PARENTS'],
      },
      {
        key: keys['anotherPersonSameOrder'],
        anchorReference: 'ie_internationalJurisdiction',
        valueHtml:
          '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
        changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_JURISDICTION'],
      },
      {
        key: keys['otherCountryRequestInfo'],
        anchorReference: 'ie_internationalRequest',
        valueHtml:
          '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value"><span class="govuk-error-message">Complete this section</span></dd></div></dl>',
        changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_REQUEST'],
      },
    ]);
  });
});
