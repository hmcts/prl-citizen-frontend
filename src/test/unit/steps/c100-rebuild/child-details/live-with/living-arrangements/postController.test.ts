import { Response } from 'express';

import { YesOrNo } from '../../../../../../../main/app/case/definition';
import { AppRequest } from '../../../../../../../main/app/controller/AppRequest';
import { AnyObject } from '../../../../../../../main/app/controller/PostController';
import { Form, FormFields } from '../../../../../../../main/app/form/Form';
import ChildLivingArrangementsPostController from '../../../../../../../main/steps/c100-rebuild/child-details/live-with/living-arrangements/postController';

describe('ChildLivingArrangementsPostController', () => {
  const childId = 'child-1';
  const otherPersonId = 'op-1';

  let controller: ChildLivingArrangementsPostController;

  beforeEach(() => {
    // pass an empty FormFields shape; the controller only stores it for later use
    controller = new ChildLivingArrangementsPostController({} as unknown as FormFields);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('preserves isOtherPersonAddressConfidential when child no longer lives with other person', async () => {
    // Mock Form.getParsedBody to just return the body passed through
    jest.spyOn(Form.prototype, 'getParsedBody').mockImplementation(function (body) {
      return body;
    });

    const req = {
      params: { childId },
      body: { liveWith: [] },
      session: {
        userCase: {
          cd_children: [
            {
              id: childId,
              firstName: 'Child',
              lastName: 'One',
              // initially lives with the other person (could be empty)
              liveWith: [{ id: otherPersonId }],
            },
          ],
          oprs_otherPersons: [
            {
              id: otherPersonId,
              firstName: 'Other',
              lastName: 'Person',
              isOtherPersonAddressConfidential: YesOrNo.YES,
            },
          ],
        },
        errors: [],
        save: (cb?: () => void) => {
          if (cb) {
            cb();
          }
        },
      },
      url: '/test',
      path: '/test',
    };

    const res = { redirect: jest.fn() } as unknown as { redirect: (...args: unknown[]) => void };

    await controller.post(req as unknown as AppRequest<AnyObject>, res as unknown as Response);

    const updatedPerson = req.session.userCase.oprs_otherPersons.find(p => p.id === otherPersonId);
    expect(updatedPerson).toBeDefined();
    expect(updatedPerson?.isOtherPersonAddressConfidential).toEqual(YesOrNo.YES);
  });
});
