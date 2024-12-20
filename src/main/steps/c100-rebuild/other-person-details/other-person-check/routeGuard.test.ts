import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../app/case/case';

import { routeGuard } from './routeGuard';

describe.skip('c100 > other person details > other person check > route guard', () => {
  let res;
  let req;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  test('should clean other people details and call next', async () => {
    req.body.oprs_otherPersonCheck = 'No';
    req.session.userCase = {
      oprs_otherPersons: [
        {
          id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
          firstName: 'John',
          lastName: 'Doe',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1999',
              month: '09',
              day: '09',
            },
            gender: 'Male',
            otherGenderDetails: '',
            hasNameChanged: 'dontKnow',
          },
        },
        {
          id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f62',
          firstName: 'John',
          lastName: 'Doe2',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1999',
              month: '09',
              day: '09',
            },
            gender: 'Male',
            otherGenderDetails: '',
            hasNameChanged: 'dontKnow',
          },
        },
      ],
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
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
            gender: 'Male',
            otherGenderDetails: '',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'test',
          },
          liveWith: [
            {
              id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
              firstName: 'John',
              lastName: 'Doe',
              partyType: 'other person',
            },
            {
              id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f62',
              firstName: 'John',
              lastName: 'Doe2',
              partyType: 'other person',
            },
          ],
          mainlyLiveWith: {
            id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
            firstName: 'John',
            lastName: 'Doe',
            partyType: 'other person',
          },
        },
        {
          id: '7483640e-0817-4ddc-b709-6723f7925324',
          firstName: 'Sam',
          lastName: 'Daniel',
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
            gender: 'Male',
            otherGenderDetails: '',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: '',
          },
          liveWith: [
            {
              id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f6',
              firstName: 'John',
              lastName: 'Doe',
              partyType: 'other person',
            },
            {
              id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f62',
              firstName: 'John',
              lastName: 'Doe2',
              partyType: 'other person',
            },
          ],
          mainlyLiveWith: {
            id: '7228444b-ef3f-4202-a1e7-cdcd2316e1f62',
            firstName: 'John',
            lastName: 'Doe2',
            partyType: 'other person',
          },
        },
      ],
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({
      cd_children: [
        {
          childMatters: {
            needsResolution: [],
          },
          firstName: 'Bob',
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          lastName: 'Silly',
          liveWith: [],
          parentialResponsibility: {
            statement: 'test',
          },
          personalDetails: {
            approxDateOfBirth: {
              day: '12',
              month: '12',
              year: '1987',
            },
            dateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Male',
            isDateOfBirthUnknown: 'Yes',
            otherGenderDetails: '',
          },
        },
        {
          childMatters: {
            needsResolution: [],
          },
          firstName: 'Sam',
          id: '7483640e-0817-4ddc-b709-6723f7925324',
          lastName: 'Daniel',
          liveWith: [],
          parentialResponsibility: {
            statement: '',
          },
          personalDetails: {
            approxDateOfBirth: {
              day: '12',
              month: '12',
              year: '1987',
            },
            dateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Male',
            isDateOfBirthUnknown: 'Yes',
            otherGenderDetails: '',
          },
        },
      ],
      oprs_otherPersons: [],
    });
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
