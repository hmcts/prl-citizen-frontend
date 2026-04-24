import { generateContent } from '../../../../../../main/steps/c100-rebuild/other-person-details/confidentiality/content';

describe('other-person confidentiality generateContent - child name formatting', () => {
  const otherPersonId = 'op-1';

  type MainlyLiveWith = string | { id: string } | (string | { id: string })[];

  type Child = {
    firstName: string;
    lastName: string;
    mainlyLiveWith?: MainlyLiveWith;
  };

  type OtherPersonMinimal = {
    id: string;
    firstName: string;
    lastName: string;
  };

  type UserCase = {
    cd_children?: Child[];
    oprs_otherPersons?: OtherPersonMinimal[];
  };

  function makeBaseUserCase(children: Child[], otherPerson?: OtherPersonMinimal): UserCase {
    return {
      cd_children: children,
      oprs_otherPersons: [
        otherPerson ?? {
          id: otherPersonId,
          firstName: 'Jordan',
          lastName: 'Smith',
        },
      ],
    };
  }

  function makeContent(language = 'en', userCase: UserCase) {
    const content = {
      language,
      additionalData: { req: { params: { otherPersonId } } },
      userCase,
    };

    return content as unknown as Parameters<typeof generateContent>[0];
  }

  test('0 children -> "the child" and singular verb', () => {
    const userCase = makeBaseUserCase([]);
    const content = makeContent('en', userCase);

    const out = generateContent(content);

    expect(out.line2).toContain('the child');
    expect(out.line2).toContain('lives with');
    expect(out.line2).toContain('Jordan Smith');
  });

  test('1 child -> child full name and singular verb', () => {
    const child = { firstName: 'Alice', lastName: 'Brown', mainlyLiveWith: { id: otherPersonId } };
    const userCase = makeBaseUserCase([child]);
    const content = makeContent('en', userCase);

    const out = generateContent(content);

    expect(out.line2).toContain('Alice Brown');
    expect(out.line2).toContain('lives with');
    expect(out.line2).toContain('Jordan Smith');
  });

  test('2 children -> "A and B" and plural verb', () => {
    const child1 = { firstName: 'Tom', lastName: 'Thumb', mainlyLiveWith: otherPersonId };
    const child2 = { firstName: 'Jerry', lastName: 'Mouse', mainlyLiveWith: { id: otherPersonId } };
    const userCase = makeBaseUserCase([child1, child2]);
    const content = makeContent('en', userCase);

    const out = generateContent(content);

    expect(out.line2).toContain('Tom Thumb and Jerry Mouse');
    expect(out.line2).toContain('live with');
    expect(out.line2).toContain('Jordan Smith');
  });

  test('3+ children -> "A, B and C" and plural verb', () => {
    const children = [
      { firstName: 'Ann', lastName: 'One', mainlyLiveWith: otherPersonId },
      { firstName: 'Ben', lastName: 'Two', mainlyLiveWith: otherPersonId },
      { firstName: 'Cara', lastName: 'Three', mainlyLiveWith: otherPersonId },
    ];
    const userCase = makeBaseUserCase(children);
    const content = makeContent('en', userCase);

    const out = generateContent(content);

    expect(out.line2).toContain('Ann One, Ben Two and Cara Three');
    expect(out.line2).toContain('live with');
    expect(out.line2).toContain('Jordan Smith');
  });
});
