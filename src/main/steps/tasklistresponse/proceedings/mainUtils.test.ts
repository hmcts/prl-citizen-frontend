/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { PastAndCurrentProceedings } from './mainUtils';
//  ,ChildernDetailsAdditional ,ChildernDetailsAdditional, ApplicantDetails, MiamTitle,  MiamAttendance, MiamExemption, InternationalElement, PastAndCurrentProceedings, SafetyConcerns, SafetyConcerns_child, SafetyConcerns_yours, SafetyConcerns_others  } from './mainUtil';
type ANYTYPE = any;
const userCase = {
  id: 'id',
  state: undefined,
} as ANYTYPE;

const userCase1 = {
  id: 'id',
  state: undefined,
  proceedingsStart: 'No',
  proceedingsStartOrder: 'No',
} as ANYTYPE;

const userCase2 = {
  id: 'id',
  state: undefined,
  proceedingsStart: 'Yes',
  proceedingsStartOrder: 'No',
  courtProceedingsOrders: ['childArrangementOrder'],
} as ANYTYPE;

['childArrangementOrder'];

const enContent = {
  Yes: 'Yes',
  No: 'No ',
  sectionTitles: {
    otherProceedings: 'PastAndCurrentProceedings',
  },
  keys: {
    proceedingsStart: 'Have the children been involved in a court case?',
    proceedingsStartOrder: 'Have you had a court order made for your protection?',
  },
};

const sectionTitles = {
  PastAndCurrentProceedings: 'PastAndCurrentProceedings',
};

const content = {
  x: 'aaa',
};

const keys = {};

describe.skip('test cases for main util', () => {
  test('PastAndCurrentProceedings', () => {
    expect(PastAndCurrentProceedings(enContent, userCase)).toStrictEqual({
      rows: [
        {
          actions: {
            items: [
              {
                href: '/tasklistresponse/proceedings/start',
                text: undefined,
                visuallyHiddenText: 'undefined',
                attributes: {},
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
                href: '/tasklistresponse/proceedings/start',
                text: undefined,
                visuallyHiddenText: 'undefined',
                attributes: {},
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
                href: '/tasklistresponse/proceedings/courtproceedings',
                text: undefined,
                visuallyHiddenText: 'undefined',
                attributes: {},
              },
            ],
          },
          key: {},
          value: {},
        },
        {
          key: {},
          value: {},
        },
      ],
      title: 'PastAndCurrentProceedings',
      subTitle: '',
    });
  });

  test('PastAndCurrentProceedings - util', () => {
    const CaseName_fun = PastAndCurrentProceedings({ sectionTitles, keys, Yes: 'Yes', No: 'No', content }, userCase);
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.title).toBe('');
  });

  test('PastAndCurrentProceedings - util2', () => {
    const CaseName_fun = PastAndCurrentProceedings(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase1,
      'en'
    );
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.title).toBe('');
  });

  test('PastAndCurrentProceedings - util3', () => {
    const CaseName_fun = PastAndCurrentProceedings(
      { sectionTitles, keys, Yes: 'Yes', No: 'No', content },
      userCase2,
      'en'
    );
    expect(CaseName_fun?.rows).not.toBe([]);
    expect(CaseName_fun?.title).toBe('');
  });
});
