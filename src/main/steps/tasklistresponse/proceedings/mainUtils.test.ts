/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { PastAndCurrentProceedings } from './mainUtils';
//  ,ChildernDetailsAdditional ,ChildernDetailsAdditional, ApplicantDetails, MiamTitle,  MiamAttendance, MiamExemption, InternationalElement, PastAndCurrentProceedings, SafetyConcerns, SafetyConcerns_child, SafetyConcerns_yours, SafetyConcerns_others  } from './mainUtil';

const userCase = {
  id: 'id',
  state: undefined,
};

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

describe('test cases for main util', () => {
  test.skip('PastAndCurrentProceedings', () => {
    expect(PastAndCurrentProceedings(enContent, userCase)).toStrictEqual({
      rows: [
        {
          actions: {
            items: [
              {
                href: '/tasklistresponse/proceedings/courtproceedings',
                text: 'Edit',
                visuallyHiddenText: "undefined",
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
                text: 'Edit',
                visuallyHiddenText: "undefined",
              },
            ],
          },
          key: {},
          value: {},
        },
      ],
      title: 'PastAndCurrentProceedings',
    });
  });
});
