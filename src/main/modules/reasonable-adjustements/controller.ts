import { Response } from 'express';

import { PartyType } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { applyParms } from '../../steps/common/url-parser';
import {
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_GUIDANCE_PAGE,
} from '../../steps/urls';

import { RAProvider } from './index';

export class ReasonableAdjustementsController {
  private handleError(error, res: Response): void {
    RAProvider.log('error', error);
    res.redirect(
      applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_GUIDANCE_PAGE, {
        partyType: 'applicant',
      })
    );
  }

  async launch(req: AppRequest, res: Response): Promise<void> {
    try {
      await RAProvider.launch(
        {
          partyName: 'John Doe',
          roleOnCase: PartyType.APPLICANT,
        },
        'en',
        res
      );
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async fetchData(req: AppRequest, res: Response): Promise<void> {
    const externalRefId = req.params.id;
    console.info(externalRefId);

    try {
      if (externalRefId) {
        const response = await RAProvider.service.getRAData(externalRefId);

        RAProvider.trySettlingRequest(response.correlationId, response.action).then(
          () => {
            // saving the data temp, will be revisited during story implementation
            req.session.userCase = {
              ...req.session.userCase,
              ra_cc: response,
            };

            req.session.save(() => {
              res.redirect(
                applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE, {
                  partyType: 'applicant',
                })
              );
            });
          },
          error => {
            this.handleError(error, res);
          }
        );
      } else {
        this.handleError('RA - no external reference ID present', res);
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

export const RAController = new ReasonableAdjustementsController();
