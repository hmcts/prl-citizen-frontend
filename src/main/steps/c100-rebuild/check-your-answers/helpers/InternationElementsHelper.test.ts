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
      '<p></p><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>details</h4><p>ie_provideDetailsStart</p>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_PARENTS',
    key: 'basedOutSideEnglandOrWales',
    valueHtml:
      '<p></p><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>details</h4><p>ie_provideDetailsParents</p>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_JURISDICTION',
    key: 'anotherPersonSameOrder',
    valueHtml:
      '<p></p><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>details</h4><p>ie_provideDetailsJurisdiction</p>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_REQUEST',
    key: 'otherCountryRequestInfo',
    valueHtml:
      '<p></p><hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible"><h4>details</h4><p>ie_provideDetailsRequest</p>',
  },
];

const dummyTwo = [
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_START',
    key: 'liveOutSideUk',
    valueHtml: '<p></p>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_PARENTS',
    key: 'basedOutSideEnglandOrWales',
    valueHtml: '<p></p>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_JURISDICTION',
    key: 'anotherPersonSameOrder',
    valueHtml: '<p></p>',
  },
  {
    changeUrl: 'C100_INTERNATIONAL_ELEMENTS_REQUEST',
    key: 'otherCountryRequestInfo',
    valueHtml: '<p></p>',
  },
];
const language = 'en';
test('InternaElementHelper', () => {
  expect(InternationElementHelper(userCase, keys, Urls, language)).toStrictEqual(dummy);
});

test('InternaElementHelper without valueHTML', () => {
  expect(InternationElementHelper({}, keys, Urls, language)).toStrictEqual(dummyTwo);
});
