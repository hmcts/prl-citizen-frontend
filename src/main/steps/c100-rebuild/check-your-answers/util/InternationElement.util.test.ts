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
        'A allai unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr? ',
      basedOutSideEnglandOrWales:
        "A yw rhieni’r plant (neu unrhyw un arwyddocaol i'r plant) wedi eu lleoli yn bennaf y tu allan i Gymru a Lloegr?",
      liveOutSideUk: 'A yw’r plant yn byw yn bennaf y tu allan i Gymru a Lloegr?',
      otherCountryRequestInfo:
        "A oes gwlad arall wedi gofyn (neu a ofynnwyd i wlad arall) am wybodaeth neu help i'r plant?",
    });
  });
});
