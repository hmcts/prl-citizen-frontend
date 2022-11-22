import { InternationElements } from './InternationElement.util';

describe('test cases for hearing details', () => {
  test('english', () => {
    expect(InternationElements('en')).toStrictEqual({
      anotherPersonSameOrder:
        'Could another person in the application apply for a similar order in a country outside England or Wales?',
      basedOutSideEnglandOrWales:
        "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales?",
      liveOutSideUk: "Are the children's lives mainly based outside of England and Wales?",
      otherCountryRequestInfo: 'Has another country asked (or been asked) for information or help for the children?',
    });
  });
  test('notenglish', () => {
    expect(InternationElements('cy')).toStrictEqual({
      anotherPersonSameOrder:
        'Could another person in the application apply for a similar order in a country outside England or Wales? - welsh',
      basedOutSideEnglandOrWales:
        "Are the children's parents (or anyone significant to the children) mainly based outside of England and Wales? - welsh",
      liveOutSideUk: "Are the children's lives mainly based outside of England and Wales? - welsh",
      otherCountryRequestInfo:
        'Has another country asked (or been asked) for information or help for the children? - welsh',
    });
  });
});
