import { InternationElementHelper } from './InternationElementsHelper';
const userCase = {
  ie_internationalStart: 'ie_internationalStart',
  ie_provideDetailsStart: 'ie_provideDetailsStart',
  ie_internationalParents: 'ie_internationalParents',
  ie_provideDetailsParents: 'ie_provideDetailsParents',
  ie_internationalJurisdiction: 'ie_internationalJurisdiction',
  ie_provideDetailsJurisdiction: 'ie_provideDetailsJurisdiction',
  ie_internationalRequest: 'ie_internationalRequest',
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
    valueHtml:
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">ie_provideDetailsStart</dd></div>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_PARENTS',
    key: 'basedOutSideEnglandOrWales',
    valueHtml:
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">ie_provideDetailsParents</dd></div>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_JURISDICTION',
    key: 'anotherPersonSameOrder',
    valueHtml:
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">ie_provideDetailsJurisdiction</dd></div>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_REQUEST',
    key: 'otherCountryRequestInfo',
    valueHtml:
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">ie_provideDetailsRequest</dd></div>',
  },
];

const dummyTwo = [
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_START',
    key: 'liveOutSideUk',
    valueHtml: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"></div>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_PARENTS',
    key: 'basedOutSideEnglandOrWales',
    valueHtml: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"></div>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_JURISDICTION',
    key: 'anotherPersonSameOrder',
    valueHtml: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"></div>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_REQUEST',
    key: 'otherCountryRequestInfo',
    valueHtml: '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"></div>',
  },
];
const language = 'en';
test('InternaElementHelper', () => {
  expect(InternationElementHelper(userCase, keys, Urls, language)).toStrictEqual(dummy);
});

test('InternaElementHelper without valueHTML', () => {
  expect(InternationElementHelper({}, keys, Urls, language)).toStrictEqual(dummyTwo);
});

test('InternaElementHelper without valueHTML whole functionality', () => {
  expect(InternationElementHelper(userCase, keys, Urls, language)).toEqual([
    {
      key: keys['liveOutSideUk'],
      valueHtml:
        '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">ie_provideDetailsStart</dd></div>',
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_START'],
    },
    {
      key: keys['basedOutSideEnglandOrWales'],
      valueHtml:
        '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">ie_provideDetailsParents</dd></div>',
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_PARENTS'],
    },
    {
      key: keys['anotherPersonSameOrder'],
      valueHtml:
        '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">ie_provideDetailsJurisdiction</dd></div>',
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_JURISDICTION'],
    },
    {
      key: keys['otherCountryRequestInfo'],
      valueHtml:
        '<dl class="govuk-summary-list"><div class="govuk-summary-list__row"></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">details</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">ie_provideDetailsRequest</dd></div>',
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_REQUEST'],
    },
  ]);
});
