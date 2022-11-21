import { ChildernDetails, PeopleDetails, TypeOfOrder, WithoutNoticeHearing } from './mainUtil';
//  ,ChildernDetailsAdditional ,ChildernDetailsAdditional, ApplicantDetails, MiamTitle,  MiamAttendance, MiamExemption, InternationalElement, PastAndCurrentProceedings, SafetyConcerns, SafetyConcerns_child, SafetyConcerns_yours, SafetyConcerns_others  } from './mainUtil';

const sectionTitles = {
  TypeOfOrder: 'TypeOfOrder',
  WithoutNoticeHearing: 'WithoutNoticeHearing',
  PeopleDetails: 'PeopleDetails',
  ChildernDetails: 'ChildernDetails',
  ChildernDetailsAdditional: 'ChildernDetailsAdditional',
  ApplicantDetails: 'ApplicantDetails',
  MiamTitle: 'MiamTitle',
  MiamAttendance: 'MiamAttendance',
  MiamExemption: 'MiamExemption',
  InternationalElement: 'InternationalElement',
  PastAndCurrentProceedings: 'PastAndCurrentProceedings',
  SafetyConcerns: 'SafetyConcerns',
  SafetyConcerns_child: 'childSafetyConcerns',
  SafetyConcerns_yours: 'yourSafetyConcerns',
  SafetyConcerns_others: 'otherSafetyConcerns',
};
const keys = {
  whatAreYouAsking: 'whatAreYouAsking',
  wantingCourtToDo: 'wantingCourtToDo',
};
const userCase = {
  id: 'id',
  state: undefined,
};
const content = {
  x: 'aaa',
};

describe('test cases for main util', () => {
  test('TypeOfOrder', () => {
    expect(TypeOfOrder({ sectionTitles, keys, content }, userCase)).toStrictEqual({
      rows: [
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/typeoforder/select-courtorder',
                text: undefined,
                visuallyHiddenText: 'whatAreYouAsking',
              },
            ],
          },
          key: {
            text: 'whatAreYouAsking',
          },
          value: {},
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/typeoforder/shortstatement',
                text: undefined,
                visuallyHiddenText: 'wantingCourtToDo',
              },
            ],
          },
          key: {
            text: 'wantingCourtToDo',
          },
          value: {},
        },
      ],
      title: undefined,
    });
  });
  test('with out notice hearning', () => {
    expect(WithoutNoticeHearing({ sectionTitles, keys, content }, userCase)).toStrictEqual({
      rows: [
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/hearing-without-notice/hearing-part1',
                text: undefined,
                visuallyHiddenText: 'undefined',
              },
            ],
          },
          key: {},
          value: {},
        },
        {
          actions: {
            items: [
              {
                href: '/c100-rebuild/hearing-without-notice/hearing-part2',
                text: undefined,
                visuallyHiddenText: 'undefined',
              },
            ],
          },
          key: {},
          value: {},
        },
      ],
      title: 'WithoutNoticeHearing',
    });
  });
  test('PeopleDetails', () => {
    expect(PeopleDetails({ sectionTitles, keys, content })).toStrictEqual({
      rows: [],
      title: undefined,
    });
  });

  test('ChildernDetails', () => {
    expect(ChildernDetails({ sectionTitles, keys, content }, userCase)).toStrictEqual({
      rows: [],
      title: 'ChildernDetails',
    });
  });
});
