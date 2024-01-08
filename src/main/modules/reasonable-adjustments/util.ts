import _ from 'lodash';

import { C100Applicant, C100_CASE_EVENT, CaseType, PartyType, State } from '../../app/case/definition';

import {
  RAData,
  RADataTransformContext,
  RAFlagDetail,
  RAFlagValue,
  RAFlags,
  RASupportCaseEvent,
  RASupportContext,
} from './definitions';
import { CaseWithId } from 'app/case/case';
import { AppRequest, UserDetails } from 'app/controller/AppRequest';
import { RAProvider } from '.';
import { getPartyDetails } from '../../steps/tasklistresponse/utils';
import { updatePartyDetails } from '../../steps/c100-rebuild/people/util';
import { v4 as uuid } from 'uuid';
import { REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE } from '../../steps/urls';
import { applyParms } from '../../steps/common/url-parser';

export class ReasonableAdjustementsUtility {
  private preprocessFlags(flag: RAFlagValue, context: RADataTransformContext): RAFlagValue {
    return Object.entries(flag).reduce((_flag: Partial<RAFlagValue>, [key, value]) => {
      if (!_.isNull(value)) {
        _flag[key] = value;
      }

      if (key === 'path' && value.length) {
        _flag.path = _flag.path!.map(_path => {
          const { value: pathValue, name, ...rest } = _path;

          if (context === RADataTransformContext.FLATTEN) {
            // for c100 application creation journey
            return name;
          }

          if (context === RADataTransformContext.EXTERNAL) {
            return pathValue
              ? {
                  ...rest,
                  name: pathValue,
                }
              : {
                  name: _path,
                };
          }

          if (context === RADataTransformContext.INTERNAL) {
            return {
              ...rest,
              value: name ?? pathValue ?? '',
            };
          }
        });
      }
      
      return _flag;
    }, {}) as RAFlagValue;
  }

  preprocessData(flags: RAFlags['details'], context: RADataTransformContext): RAFlags['details'] | RAFlagValue[] {
    return flags?.length
      ? (flags.map((flag: RAFlagDetail | RAFlagDetail['value']) => {
          const { value, ...rest } = flag as RAFlagDetail;
          
          return value
            ? {
                ...rest,
                value: this.preprocessFlags(value, context),
              }
            : {
                id: rest?.id ?? uuid(),
                value: this.preprocessFlags(flag as RAFlagValue, context),
              };
        }) as RAFlags['details'] | RAFlagValue[])
      : [];
  }

  getUpdateFlagsEventID(caseType: CaseType, context: string): RASupportCaseEvent {
    let eventId;

    switch (caseType) {
      case CaseType.C100:
        eventId =
          context === RASupportContext.MANAGE_SUPPORT
            ? RASupportCaseEvent.RA_CA_MANAGE_SUPPORT
            : RASupportCaseEvent.RA_CA_REQUEST_SUPPORT;
        break;
      case CaseType.FL401:
        eventId =
          context === RASupportContext.MANAGE_SUPPORT
            ? RASupportCaseEvent.RA_DA_MANAGE_SUPPORT
            : RASupportCaseEvent.RA_DA_REQUEST_SUPPORT;
        break;
    }

    return eventId;
  }

  isC100ApplicationCreationJourney(userCase: CaseWithId): boolean {
    return userCase?.caseTypeOfApplication === CaseType.C100 && userCase?.state === State.AwaitingSubmissionToHmcts;
  }

  async retrieveExistingPartyRAFlags(
    caseData: CaseWithId,
    partyDetails: Record<string, any>,
    userAccessToken: UserDetails['accessToken']
  ): Promise<RAFlags> {
    if (this.isC100ApplicationCreationJourney(caseData)) {
      return {
        partyName: `${partyDetails.applicantFirstName} ${partyDetails.applicantLastName}`,
        roleOnCase: 'Applicant 1',
        details: partyDetails.reasonableAdjustmentsFlags,
      };
    }

    return RAProvider.service.retrieveExistingPartyRAFlags(caseData.id!, partyDetails.user.idamId, userAccessToken);
  }

  updatePartyRAFlags(caseData: CaseWithId, userDetails: UserDetails, raData: RAData, req: AppRequest): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (this.isC100ApplicationCreationJourney(caseData)) {
        const primaryApplicantDetails = _.first(req.session.userCase.appl_allApplicants) as C100Applicant;

        req.session.userCase.appl_allApplicants = updatePartyDetails(
          {
            ...primaryApplicantDetails,
            reasonableAdjustmentsFlags: [...raData.flagsAsSupplied.details, ...raData.replacementFlags.details].reduce(
              (currentFlags: RAFlagValue[], flag: RAFlagDetail) => {
                const currentFlagIndex = currentFlags.findIndex(_flag => _flag.flagCode === flag.value.flagCode);

                if (currentFlagIndex >= 0) {
                  if (flag.value.status === 'Requested') {
                    currentFlags[currentFlagIndex] = this.preprocessFlags(flag.value, RADataTransformContext.FLATTEN);
                  } else {
                    currentFlags.splice(currentFlagIndex, 1);
                  }
                } else {
                  currentFlags.push(this.preprocessFlags(flag.value, RADataTransformContext.FLATTEN));
                }

                return currentFlags;
              },
              [...primaryApplicantDetails.reasonableAdjustmentsFlags]
            ),
          },
          req.session.userCase.appl_allApplicants
        ) as C100Applicant[];

        return req.session.save(async () => {
          try {
            await req.locals.C100Api.updateCase(
              req.session.userCase.caseId!,
              req.session.userCase,
              applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE, {
                partyType: PartyType.APPLICANT,
              }),
              C100_CASE_EVENT.CASE_UPDATE
            );
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      }

      const partyIdamId = getPartyDetails(caseData, userDetails.id)!.user.idamId;

      try {
        if (raData.flagsAsSupplied.details.length) {
          await RAProvider.service.updatePartyRAFlags(
            caseData.id,
            caseData.caseTypeOfApplication! as CaseType,
            partyIdamId,
            userDetails.accessToken,
            RASupportContext.MANAGE_SUPPORT,
            this.preprocessData(raData.flagsAsSupplied.details, RADataTransformContext.INTERNAL) as RAFlags['details']
          );
        }

        if (raData?.replacementFlags?.details?.length) {
          await RAProvider.service.updatePartyRAFlags(
            caseData.id,
            caseData.caseTypeOfApplication! as CaseType,
            partyIdamId,
            userDetails.accessToken,
            RASupportContext.REQUEST_SUPPORT,
            this.preprocessData(raData.replacementFlags.details, RADataTransformContext.INTERNAL) as RAFlags['details']
          );
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const RAUtility = new ReasonableAdjustementsUtility();
