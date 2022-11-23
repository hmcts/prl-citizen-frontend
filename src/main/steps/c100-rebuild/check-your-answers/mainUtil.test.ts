/* eslint-disable import/no-unresolved */

import {
  ApplicantDetails,
  ChildernDetails,
  LegalRepresentativeDetails,
  LocationDetails,
  PeopleDetails,
  PermissionForApplication,
  TypeOfApplication,
  TypeOfOrder,
  WithoutNoticeHearing,
  reasonableAdjustment,
} from './mainUtil';

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

const content = {
  x: 'aaa',
};

describe('test cases for main util', () => {
  test('TypeOfOrder', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
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
    const userCase = {
      id: 'id',
      state: undefined,
    };
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
    const userCase = {
      id: 'id',
      state: undefined,
    };
    expect(ChildernDetails({ sectionTitles, keys, content }, userCase)).toStrictEqual({
      rows: [],
      title: 'ChildernDetails',
    });
  });
  //LocationDetails
  test('LocationDetails', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    const locationDetails = LocationDetails({ sectionTitles, keys, content }, userCase);
    expect(locationDetails?.rows).not.toBe([]);
    expect(locationDetails?.title).toBe(undefined);
  });

  //LocationDetails
  test('TypeOfApplication', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    const TypeOfApplicationObj = TypeOfApplication({ sectionTitles, keys, content }, userCase);
    expect(TypeOfApplicationObj?.rows).not.toBe([]);
    expect(TypeOfApplicationObj?.title).toBe(undefined);
  });

  test('LegalRepresentativeDetails', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    const LegalRepresentativeDetailsObj = LegalRepresentativeDetails({ sectionTitles, keys, content }, userCase);
    expect(LegalRepresentativeDetailsObj?.rows).not.toBe([]);
    expect(LegalRepresentativeDetailsObj?.title).toBe(undefined);
  });

  test('PermissionForApplication', () => {
    const userCase = {
      id: 'id',
      state: undefined,
    };
    const PermissionForApplicationObj = PermissionForApplication({ sectionTitles, keys, content }, userCase);
    expect(PermissionForApplicationObj?.rows).not.toBe([]);
    expect(PermissionForApplicationObj?.title).toBe(undefined);
  });

  test('ApplicantDetails', () => {
    const PermissionForApplicationObj = ApplicantDetails({ sectionTitles, keys, content }, {});
    expect(PermissionForApplicationObj).not.toBe(null);
  });

  //reasonableAdjustment

  test('reasonableAdjustment', () => {
    const PermissionForApplicationObj = reasonableAdjustment({ sectionTitles, keys, content }, {});
    expect(PermissionForApplicationObj?.rows).not.toBe([]);
    expect(PermissionForApplicationObj?.title).toBe(undefined);
  });
});
