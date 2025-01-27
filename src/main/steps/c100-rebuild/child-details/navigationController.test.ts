import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import {
  C100_CHILDERN_DETAILS_ADD,
  C100_CHILDERN_DETAILS_CHILD_MATTERS,
  C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
  C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
  C100_CHILDERN_LIVING_ARRANGEMENTS,
  C100_CHILDERN_MAINLY_LIVE_WITH,
} from '../../urls';

import ChildrenDetailsNavigationController from './navigationController';

let mock;
let mockTwo;

describe('ChildrenDetailsNavigationController', () => {
  beforeEach(() => {
    mock = mockRequest({
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
                statement: 'child 1 responsibility',
              },
              liveWith: [],
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
              liveWith: [],
            },
          ],
          oprs_otherPersons: [],
        },
      },
    });

    mockTwo = mockRequest({
      params: {
        childId: '7483640e-0817-4ddc-b709-6723f7925635',
      },
      session: {
        userCase: {
          sq_writtenAgreement: 'No',
          miam_otherProceedings: 'Yes',
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
                statement: 'child 1 responsibility',
              },
              liveWith: [],
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
              liveWith: [],
            },
          ],
          oprs_otherPersons: [],
        },
      },
    });
  });

  test('From Add Children screen -> navigate to child 1 personal details screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_DETAILS_ADD, mock.session.userCase, mock.params)
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/personal-details');
  });

  test('From child 1 personal details screen -> navigate to child 1 child matters screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
        mock.session.userCase,
        mock
      )
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/child-matters');
  });

  test('From child 1 child matters screen -> navigate to child 1 parental responsibility screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_DETAILS_CHILD_MATTERS, mock.session.userCase, mock)
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925474/parental-responsibility');
  });

  test('From child 1 parental responsibility screen -> navigate to child 2 personal details screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
        mock.session.userCase,
        mock
      )
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925635/personal-details');
  });

  test('From child 2 personal details screen -> navigate to child matters screen', async () => {
    mock.params.childId = '7483640e-0817-4ddc-b709-6723f7925635';
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_DETAILS_PERSONAL_DETAILS,
        mock.session.userCase,
        mock
      )
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925635/child-matters');
  });

  test('From child 2 child matters screen -> navigate to parental responsibility screen', async () => {
    mock.params.childId = '7483640e-0817-4ddc-b709-6723f7925635';
    expect(
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_DETAILS_CHILD_MATTERS, mock.session.userCase, mock)
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925635/parental-responsibility');
  });

  test('From child 2 parental responsibility screen -> navigate to further information screen', async () => {
    mock.params.childId = '7483640e-0817-4ddc-b709-6723f7925635';
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_DETAILS_PARENTIAL_RESPONSIBILITY,
        mock.session.userCase,
        mock
      )
    ).toBe('/c100-rebuild/child-details/further-information');
  });

  test('From the first child livingArrangements screen -> navigate to child liveWith screen for all children -> navigate to C1A saftey concerns guidance screen when no more child is left', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_LIVING_ARRANGEMENTS, mock.session.userCase, mock)
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925635/live-with/mainly-live-with');
    mock.params.childId = '7483640e-0817-4ddc-b709-6723f7925635';

    expect(
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_MAINLY_LIVE_WITH, mock.session.userCase, mock)
    ).toBe('/c100-rebuild/child-details/7483640e-0817-4ddc-b709-6723f7925635/live-with/living-arrangements');

    expect(
      ChildrenDetailsNavigationController.getNextUrl(C100_CHILDERN_LIVING_ARRANGEMENTS, mockTwo.session.userCase, {
        params: mockTwo.params,
        session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
      } as unknown as AppRequest)
    ).toBe('/c100-rebuild/safety-concerns/concern-guidance');
  });

  test('From a screen where the next step is not computed using ChildrenDetailsNavigationController.getNextUrl -> navigate to the same screen when navigation controller is invoked from any other screen', async () => {
    expect(ChildrenDetailsNavigationController.getNextUrl('/c100-rebuild/dummyPage', mock.session.userCase, mock)).toBe(
      '/c100-rebuild/dummyPage'
    );
  });

  test('living with should navigate to other person confidentiality screen when there are other people living with children', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_LIVING_ARRANGEMENTS,
        {
          oprs_otherPersons: [{ id: '7483640e-0817-4ddc-b709-6723f7945678' }],
          cd_children: [{ id: '1234', liveWith: [{ id: '7483640e-0817-4ddc-b709-6723f7945678' }] }],
        } as unknown as CaseWithId,
        {
          params: { childId: '1234' },
          session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/other-person-details/7483640e-0817-4ddc-b709-6723f7945678/confidentiality');
  });

  test('living with should navigate to other proceedings screen', async () => {
    expect(
      ChildrenDetailsNavigationController.getNextUrl(
        C100_CHILDERN_LIVING_ARRANGEMENTS,
        {
          oprs_otherPersons: [{ id: '7483640e-0817-4ddc-b709-6723f7945678' }],
          cd_children: [{ id: '1234' }],
        } as unknown as CaseWithId,
        {
          params: { childId: '1234' },
          session: { applicationSettings: { hasC100ApplicationBeenCompleted: false } },
        } as unknown as AppRequest
      )
    ).toBe('/c100-rebuild/other-proceedings/current-previous-proceedings');
  });
});
