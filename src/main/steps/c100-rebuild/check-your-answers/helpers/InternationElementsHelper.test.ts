import { HTML } from '../common/htmlSelectors';
import { getYesNoTranslation } from '../mainUtil';

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

const htmlValParser = (selection, subText, key) => {
  selection = selection || '';
  subText = subText || '';
  const addDetails = subText
    ? HTML.RULER + HTML.H4 + key['details'] + HTML.H4_CLOSE + HTML.P + subText + HTML.P_CLOSE
    : '';
  return HTML.P + selection + HTML.P_CLOSE + addDetails;
};

test('InternaElementHelper without valueHTML whole functionality', () => {
  expect(InternationElementHelper(userCase, keys, Urls, language)).toEqual([
    {
      key: keys['liveOutSideUk'],
      valueHtml: htmlValParser(
        getYesNoTranslation(language, userCase['ie_internationalStart'], 'ydyntTranslation'),
        userCase['ie_provideDetailsStart'],
        keys
      ),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_START'],
    },
    {
      key: keys['basedOutSideEnglandOrWales'],
      valueHtml: htmlValParser(
        getYesNoTranslation(language, userCase['ie_internationalParents'], 'ydyntTranslation'),
        userCase['ie_provideDetailsParents'],
        keys
      ),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_PARENTS'],
    },
    {
      key: keys['anotherPersonSameOrder'],
      valueHtml: htmlValParser(
        getYesNoTranslation(language, userCase['ie_internationalJurisdiction'], 'gallaiTranslation'),
        userCase['ie_provideDetailsJurisdiction'],
        keys
      ),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_JURISDICTION'],
    },
    {
      key: keys['otherCountryRequestInfo'],
      valueHtml: htmlValParser(
        getYesNoTranslation(language, userCase['ie_internationalRequest'], 'oesTranslation'),
        userCase['ie_provideDetailsRequest'],
        keys
      ),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_REQUEST'],
    },
  ]);
});
