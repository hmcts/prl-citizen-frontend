/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { PastAndCurrentProceedings } from './mainUtils';
//  ,ChildernDetailsAdditional ,ChildernDetailsAdditional, ApplicantDetails, MiamTitle,  MiamAttendance, MiamExemption, InternationalElement, PastAndCurrentProceedings, SafetyConcerns, SafetyConcerns_child, SafetyConcerns_yours, SafetyConcerns_others  } from './mainUtil';

const userCase = {
  id: 'id',
  state: undefined,
};

const enContent = {
  serviceName: 'Check your answers ',
  section: '',
  title: 'Check your Answers',
  change: 'Edit',
  topWarning: 'Your answers will be shared with the other people in this case.',
  makingSure: 'Please review your answers before you finish your application.',
  continue: 'Save and continue',
  Yes: 'Yes',
  No: 'No ',
  errors: {},
  sectionTitles: {
    otherProceedings: 'Current or previous proceedings',
  },
  keys: {
    proceedingsStart: 'Have the children been involved in a court case?',
    proceedingsStartOrder: 'Have you had a court order made for your protection?',
  },
};

describe('test cases for main util', () => {
  test('with out notice hearning', () => {
    expect(PastAndCurrentProceedings(enContent, userCase)).toStrictEqual({
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
      title: 'PastAndCurrentProceedings',
    });
  });
});
