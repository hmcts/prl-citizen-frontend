/* eslint-disable import/no-unresolved */
import { ANYTYPE } from './common/index';
import {
  SafetyConcerns,
  SafetyConcerns_child,
  SafetyConcerns_others,
  SafetyConcerns_yours,
  // SafetyConcerns_others,
} from './mainUtil';

const sectionTitles = {
  SafetyConcerns: 'SafetyConcerns',
  SafetyConcerns_child: 'childSafetyConcerns',
  SafetyConcerns_yours: 'yourSafetyConcerns',
  SafetyConcerns_others: 'otherSafetyConcerns',
};

const keys = {
  detailsOfChildConcern: 'detailsOfChildConcern',
  detailsOfOwnConcern: 'detailsOfOwnConcern',
};

const content = {
  x: 'aaa',
};

const language = 'en';

describe('Test cases for safety concerns check answers', () => {
  //SafetyConcerns
  test('SafetyConcerns', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      PRL_c1A_safetyConernAbout: ['applicant'],
      PRL_c1A_haveSafetyConcerns: 'Yes',
    } as ANYTYPE;
    const SafetyConcernsObj = SafetyConcerns(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase,
      language
    );
    expect(SafetyConcernsObj?.rows).not.toBe([]);
    expect(SafetyConcernsObj?.title).toBe(undefined);
  });

  //SafetyConcerns_child
  test('SafetyConcerns_child', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      PRL_c1A_concernAboutChild: ['physicalAbuse', 'psychologicalAbuse'],
      PRL_c1A_haveSafetyConcerns: 'Yes',
      PRL_c1A_passportOffice: 'Yes',
      PRL_c1A_possessionChildrenPassport: ['mother', 'Other'],
      PRL_c1A_provideOtherDetails: 'aunt',
      PRL_c1A_childAbductedBefore: 'Yes',
    } as ANYTYPE;
    const safetyConcerns_childObj = SafetyConcerns_child(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase,
      language
    );
    expect(safetyConcerns_childObj?.rows).not.toBe([]);
    expect(safetyConcerns_childObj?.title).toBe(undefined);
  });

  //SafetyConcerns_yours
  test('SafetyConcerns_yours', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      PRL_c1A_concernAboutRespondent: ['respondent'],
    } as ANYTYPE;
    const safetyConcerns_yoursObj = SafetyConcerns_yours(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase,
      language
    );
    expect(safetyConcerns_yoursObj?.rows).not.toBe([]);
    expect(safetyConcerns_yoursObj?.title).toBe(undefined);
  });

  //SafetyConcerns_others
  test('SafetyConcerns_others', () => {
    const userCase = {
      id: 'id',
      state: undefined,
      PRL_c1A_otherConcernsDrugsDetails: 'Test_Drug_Details',
    } as ANYTYPE;
    const safetyConcerns_yoursObj = SafetyConcerns_others(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase,
      language
    );
    expect(safetyConcerns_yoursObj?.rows).not.toBe([]);
    expect(safetyConcerns_yoursObj?.title).toBe(undefined);
  });
});
