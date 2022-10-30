import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import {
  C100_CHILDERN_DETAILS_ADD,
  C100_CHILDERN_DETAILS_CHILD_MATTERS,
  C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
  C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
  C100_CHILDERN_OTHER_CHILDREN_NAMES,
  C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS,
} from '../../urls';

import ChildrenDetailsNavigationController from './navigationController';

const dummyRequest = mockRequest({
  params: {
    childId: '7483640e-0817-4ddc-b709-6723f7925474',
  },
  session: {
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'child1',
          lastName: 'child1',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            sex: 'Male',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
        },
        {
          id: '7483640e-0817-4ddc-b709-6723f7925635',
          firstName: 'child2',
          lastName: 'child2',
          personalDetails: {
            dateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            sex: 'Female',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'child 2 responsibility',
          },
        },
      ],
      cd_otherChildren: [
        {
          id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
          firstName: 'a',
          lastName: 'b',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            sex: 'Male',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
        },
        {
          id: '7a9092e3-69e0-43d6-9334-b63f6351b7c1',
          firstName: 'child2',
          lastName: 'child2',
          personalDetails: {
            dateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            sex: 'Female',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'child 2 responsibility',
          },
        },
      ],
    },
  },
});

describe('ChildrenDetailsNavigationController', () => {
  test('From Add Children screen -> navigate to child 1 personal details screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_DETAILS_ADD,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/personal-details');
  });

  test('From child 1 personal details screen -> navigate to child 1 child matters screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/child-matters');
  });

  test('From child 1 child matters screen -> navigate to child 1 parental responsibility screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_DETAILS_CHILD_MATTERS,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/parental-responsibility');
  });

  test('From child 1 parental responsibility screen -> navigate to child 2 personal details screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925635/personal-details');
    dummyRequest.params.childId = '7483640e-0817-4ddc-b709-6723f7925635';
  });

  test('From child 2 personal details screen -> navigate to child matters screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925635/child-matters');
  });

  test('From child 2 child matters screen -> navigate to parental responsibility screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_DETAILS_CHILD_MATTERS,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925635/parental-responsibility');
  });

  test('From child 2 parental responsibility screen -> navigate to further information screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/child-details/further-information');
  });

  test('From Add Other Children screen -> navigate to child 1 personal details screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_OTHER_CHILDREN_NAMES,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/child-details/other-children/c9f56483-6e2d-43ce-9de8-72661755b87c/personal-details');
  });

  test('From child 1 personal details screen -> navigate to confidentiality details know', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_OTHER_CHILDREN_PERSONAL_DETAILS,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/confidentiality/details-know');
  });

  test('From a screen where the next step is not computed using ChildrenDetailsNavigationController.getNextUrl -> navigate to the same screen when navigation controller is invoked from any other screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        '/c100-rebuild/dummyPage',
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/dummyPage');
  });
});
