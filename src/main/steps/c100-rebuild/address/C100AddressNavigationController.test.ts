import { C100RebuildPartyDetails, ChildrenDetails } from '../../../app/case/definition';
import { C100_ADDRESS_MANUAL } from '../../urls';

import C100AddressNavigationController from './C100AddressNavigationController';

describe('C100AddressNavigationController', () => {
  test('C100 address manual url should get correct url for applicant', async () => {
    expect(
      C100AddressNavigationController.getNextUrl(
        C100_ADDRESS_MANUAL,
        {},
        { partyType: 'applicant', id: '2732dd53-2e6c-46f9-88cd-08230e735b08' }
      )
    ).toBe('/c100-rebuild/applicant/2732dd53-2e6c-46f9-88cd-08230e735b08/contact-detail');
  });

  test('C100 address manual url should get correct url for respondent-details', async () => {
    expect(
      C100AddressNavigationController.getNextUrl(
        C100_ADDRESS_MANUAL,
        {},
        { partyType: 'respondent-details', id: '2732dd53-2e6c-46f9-88cd-08230e735b08' }
      )
    ).toBe('/c100-rebuild/respondent-details/2732dd53-2e6c-46f9-88cd-08230e735b08/contact-details');
  });

  test('C100 address manual url should get correct url for next person', async () => {
    expect(
      C100AddressNavigationController.getNextUrl(
        C100_ADDRESS_MANUAL,
        {
          oprs_otherPersons: [
            {
              firstName: 'Dummy ',
              id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
              lastName: 'Test1',
            } as unknown as C100RebuildPartyDetails,
            {
              firstName: 'Dummy ',
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c52',
              lastName: 'Test1',
            } as unknown as C100RebuildPartyDetails,
          ],
        },
        { partyType: 'other-person-details', id: '2732dd53-2e6c-46f9-88cd-08230e735b08' }
      )
    ).toBe('/c100-rebuild/other-person-details/480e8295-4c5b-4b9b-827f-f9be423ec1c52/personal-details');
  });

  test('C100 address manual url should get correct url for next child', async () => {
    expect(
      C100AddressNavigationController.getNextUrl(
        C100_ADDRESS_MANUAL,
        {
          oprs_otherPersons: [
            {
              firstName: 'Dummy ',
              id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
              lastName: 'Test1',
            } as unknown as C100RebuildPartyDetails,
          ],
          cd_children: [
            {
              firstName: 'Dummy ',
              id: '480e8295-4c5b-4b9b-827f-f9be423ec1c52',
              lastName: 'Test1',
            } as unknown as ChildrenDetails,
          ],
        },
        { partyType: 'other-person-details', id: '2732dd53-2e6c-46f9-88cd-08230e735b08' }
      )
    ).toBe('/c100-rebuild/child-details/480e8295-4c5b-4b9b-827f-f9be423ec1c52/live-with');
  });
});
