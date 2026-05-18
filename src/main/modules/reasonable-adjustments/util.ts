/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import { CaseWithId } from '../../app/case/case';
import { CaseType, PartyDetails, ReasonableAdjustmentsSupport, YesOrNo } from '../../app/case/definition';
import { AppRequest, UserDetails } from '../../app/controller/AppRequest';
import { PageContent } from '../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../app/form/Form';
import { CommonContent } from '../../steps/common/common.content';
import { applyParms } from '../../steps/common/url-parser';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import { getPartyDetails } from '../../steps/tasklistresponse/utils';
import { C100_URL, PARTY_TASKLIST, PageLink, RESPOND_TO_APPLICATION } from '../../steps/urls';

import {
  RAData,
  RADataTransformContext,
  RAFlagDetail,
  RAFlagValue,
  RAFlags,
  RASupportCaseEvent,
  RASupportContext,
} from './definitions';

import { RAProvider } from '.';

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

  private hasRAValueInSessionForLocalComponent(raValues: string[], raData: string[]): boolean {
    return raValues.some(val => raData!.includes(val));
  }

  private cleanSessionForAttendingToCourtSubFields(caseData: CaseWithId): CaseWithId {
    delete caseData.ra_noVideoAndPhoneHearing_subfield;
    return caseData;
  }

  private cleanSessionForLanguageNeedsSubFields(caseData: CaseWithId): CaseWithId {
    delete caseData.ra_needInterpreterInCertainLanguage_subfield;
    return caseData;
  }

  private cleanSessionForSpecialArrangementsSubFields(caseData: CaseWithId): CaseWithId {
    delete caseData.ra_specialArrangementsOther_subfield;
    return caseData;
  }

  private cleanSessionForDocumentSupport(caseData: CaseWithId): CaseWithId {
    caseData.ra_documentInformation = [];
    delete caseData.ra_specifiedColorDocuments_subfield;
    delete caseData.ra_largePrintDocuments_subfield;
    delete caseData.ra_documentHelpOther_subfield;

    return caseData;
  }

  public cleanSessionForDocSupportSubFields(docSupportNeeds: string[] | undefined, caseData: CaseWithId): CaseWithId {
    if (!['specifiedColorDocuments', 'docsprint'].some(val => docSupportNeeds?.includes(val))) {
      delete caseData?.ra_specifiedColorDocuments_subfield;
    }

    if (!['largePrintDocuments', 'largeprintdocs'].some(val => docSupportNeeds?.includes(val))) {
      delete caseData?.ra_largePrintDocuments_subfield;
    }

    if (!['documentHelpOther', 'other'].some(val => docSupportNeeds?.includes(val))) {
      delete caseData?.ra_documentHelpOther_subfield;
    }

    return caseData;
  }

  private cleanSessionForCommunicationHelp(caseData: CaseWithId): CaseWithId {
    caseData.ra_communicationHelp = [];
    delete caseData.ra_signLanguageInterpreter_subfield;
    delete caseData.ra_communicationHelpOther_subfield;

    return caseData;
  }

  public cleanSessionForCommunicationHelpSubFields(
    communicationHelp: string[] | undefined,
    caseData: CaseWithId
  ): CaseWithId {
    if (!['signLanguageInterpreter', 'signlanguage'].some(val => communicationHelp?.includes(val))) {
      delete caseData?.ra_signLanguageInterpreter_subfield;
    }

    if (!['communicationHelpOther', 'other'].some(val => communicationHelp?.includes(val))) {
      delete caseData?.ra_communicationHelpOther_subfield;
    }

    return caseData;
  }

  private cleanSessionForSupportForCourtHearing(caseData: CaseWithId): CaseWithId {
    caseData.ra_supportCourt = [];
    delete caseData.ra_supportWorkerCarer_subfield;
    delete caseData.ra_friendFamilyMember_subfield;
    delete caseData.ra_therapyAnimal_subfield;
    delete caseData.ra_supportCourtOther_subfield;

    return caseData;
  }

  public cleanSessionForSupportForCourtSubFields(
    supportForCourt: string[] | undefined,
    caseData: CaseWithId
  ): CaseWithId {
    if (!['supportWorkerCarer', 'supportworker'].some(val => supportForCourt?.includes(val))) {
      delete caseData?.ra_supportWorkerCarer_subfield;
    }

    if (!['friendFamilyMember', 'familymember'].some(val => supportForCourt?.includes(val))) {
      delete caseData?.ra_friendFamilyMember_subfield;
    }

    if (!['therapyAnimal', 'animal'].some(val => supportForCourt?.includes(val))) {
      delete caseData?.ra_therapyAnimal_subfield;
    }

    if (!['supportCourtOther', 'other'].some(val => supportForCourt?.includes(val))) {
      delete caseData?.ra_supportCourtOther_subfield;
    }

    return caseData;
  }

  private cleanSessionForNeedsDuringCourtHearing(caseData: CaseWithId): CaseWithId {
    caseData.ra_feelComportable = [];
    delete caseData.ra_appropriateLighting_subfield;
    delete caseData.ra_feelComportableOther_subfield;

    return caseData;
  }

  public cleanSessionForNeedsDuringCourtSubFields(
    needsDuringCourtHearing: string[] | undefined,
    caseData: CaseWithId
  ): CaseWithId {
    if (!['appropriateLighting', 'appropriatelighting'].some(val => needsDuringCourtHearing?.includes(val))) {
      delete caseData?.ra_appropriateLighting_subfield;
    }

    if (!['feelComportableOther', 'other'].some(val => needsDuringCourtHearing?.includes(val))) {
      delete caseData?.ra_feelComportableOther_subfield;
    }

    return caseData;
  }

  private cleanSessionForNeedsInCourt(caseData: CaseWithId): CaseWithId {
    caseData.ra_travellingCourt = [];
    delete caseData.ra_parkingSpace_subfield;
    delete caseData.ra_differentTypeChair_subfield;
    delete caseData.ra_travellingCourtOther_subfield;
    return caseData;
  }

  private cleanSessionForSupportDuringCase(caseData: CaseWithId): CaseWithId {
    delete caseData.ra_assistanceRequirements_subfield;
    return caseData;
  }

  private cleanSessionForIntermediarySupport(caseData: CaseWithId): CaseWithId {
    delete caseData.ra_intermediaryRequired_subfield;
    return caseData;
  }

  public cleanSessionForNeedsInCourtSubFields(needsInCourt: string[] | undefined, caseData: CaseWithId): CaseWithId {
    if (!['parkingSpace', 'parkingspace'].some(val => needsInCourt?.includes(val))) {
      delete caseData?.ra_parkingSpace_subfield;
    }

    if (!['differentTypeChair', 'differentchair'].some(val => needsInCourt?.includes(val))) {
      delete caseData?.ra_differentTypeChair_subfield;
    }

    if (!['travellingCourtOther', 'other'].some(val => needsInCourt?.includes(val))) {
      delete caseData?.ra_travellingCourtOther_subfield;
    }

    return caseData;
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

  async updatePartyRAFlags(
    req: AppRequest,
    caseData: CaseWithId,
    userDetails: UserDetails,
    raData: RAData
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      (async () => {
        const partyIdamId = getPartyDetails(caseData, userDetails.id)!.user.idamId;
        try {
          if (raData.flagsAsSupplied.details.length) {
            await RAProvider.service.updatePartyRAFlags(
              req,
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
              req,
              caseData.id,
              caseData.caseTypeOfApplication! as CaseType,
              partyIdamId,
              userDetails.accessToken,
              RASupportContext.REQUEST_SUPPORT,
              this.preprocessData(
                raData.replacementFlags.details,
                RADataTransformContext.INTERNAL
              ) as RAFlags['details']
            );
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  getNavigationUrl(req: AppRequest): string | PageLink {
    if (req.session?.applicationSettings?.navfromRespondToApplication) {
      return RESPOND_TO_APPLICATION;
    }

    return applyParms(PARTY_TASKLIST, { partyType: getCasePartyType(req.session.userCase, req.session.user.id) });
  }

  generateContentForLocalComponent(
    content: CommonContent,
    languages: Record<string, any>,
    form: FormContent
  ): PageContent {
    const translations = languages[content.language]();
    const request = content.additionalData?.req;

    if (request.originalUrl.startsWith(C100_URL)) {
      Object.assign(form, {
        saveAndComeLater: {
          text: l => l.saveAndComeLater,
        },
      });
    }

    return {
      ...translations,
      form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.additionalData?.req) },
    };
  }

  mapRADetailsForRespondent(partyDetails: PartyDetails): Partial<CaseWithId> {
    const reasonableAdjustmentsNeeds = {};
    const {
      languageRequirements,
      //describeSignLanguageDetails,
      assistanceRequirements,
      assistanceRequirementsDetails,
      intermediaryRequirements,
      intermediaryRequirementsDetails,
      safetyArrangements,
      safetyArrangementsDetails,
      attendingToCourt,
      hearingDetails,
      languageDetails,
    } = partyDetails?.response?.supportYouNeed ?? {};

    Object.assign(reasonableAdjustmentsNeeds, {
      ra_typeOfHearing: attendingToCourt,
      ra_noVideoAndPhoneHearing_subfield: hearingDetails,
      ra_specialArrangements: safetyArrangements,
      ra_specialArrangementsOther_subfield: safetyArrangementsDetails,
      ra_languageNeeds: languageRequirements,
      ra_needInterpreterInCertainLanguage_subfield: languageDetails,
      ra_assistanceRequirements: assistanceRequirements,
      ra_assistanceRequirements_subfield: assistanceRequirementsDetails,
      ra_intermediaryRequirements: intermediaryRequirements,
      ra_intermediaryRequired_subfield: intermediaryRequirementsDetails,
    });

    return reasonableAdjustmentsNeeds;
  }

  prepareRARespondentRequest = (caseData: Partial<CaseWithId>): ReasonableAdjustmentsSupport => {
    const request: ReasonableAdjustmentsSupport = {};

    Object.assign(request, {
      attendingToCourt: caseData?.ra_typeOfHearing,
      hearingDetails: caseData?.ra_noVideoAndPhoneHearing_subfield,
      safetyArrangements: caseData?.ra_specialArrangements,
      safetyArrangementsDetails: caseData?.ra_specialArrangementsOther_subfield,
      languageRequirements: caseData?.ra_languageNeeds,
      languageDetails: caseData?.ra_needInterpreterInCertainLanguage_subfield,
      reasonableAdjustments: caseData?.ra_assistanceRequirements,
      reasonableAdjustmentsDetails: caseData?.ra_assistanceRequirements_subfield,
      intermediaryRequirements: caseData?.ra_intermediaryRequirements,
      intermediaryRequirementsDetails: caseData?.ra_intermediaryRequired_subfield,
    });

    return request;
  };

  cleanSessionForLocalComponent(req: AppRequest): CaseWithId {
    const { body, session } = req;
    let caseData = { ...session.userCase };
    const attendingToCourt = body?.ra_typeOfHearing?.filter(val => !!val);
    const languageNeeds = body?.ra_languageNeeds?.filter(val => !!val);
    const specialArrangements = body?.ra_specialArrangements?.filter(val => !!val);
    const hasDisabilityRequirements = body?.ra_assistanceRequirements;
    const hasIntermediaryRequirements = body?.ra_intermediaryRequirements;

    if (attendingToCourt?.length) {
      if (!this.hasRAValueInSessionForLocalComponent(['noVideoAndPhoneHearing', 'nohearings'], attendingToCourt)) {
        caseData = this.cleanSessionForAttendingToCourtSubFields(caseData);
      }
    }

    if (languageNeeds?.length) {
      if (
        !this.hasRAValueInSessionForLocalComponent(
          ['needInterpreterInCertainLanguage', 'languageinterpreter'],
          languageNeeds
        )
      ) {
        caseData = this.cleanSessionForLanguageNeedsSubFields(caseData);
      }
    }

    if (specialArrangements?.length) {
      if (!this.hasRAValueInSessionForLocalComponent(['specialArrangementsOther', 'other'], specialArrangements)) {
        caseData = this.cleanSessionForSpecialArrangementsSubFields(caseData);
      }
    }

    if (hasDisabilityRequirements === YesOrNo.NO) {
      caseData = this.cleanSessionForDocumentSupport(caseData);
      caseData = this.cleanSessionForCommunicationHelp(caseData);
      caseData = this.cleanSessionForSupportForCourtHearing(caseData);
      caseData = this.cleanSessionForNeedsDuringCourtHearing(caseData);
      caseData = this.cleanSessionForNeedsInCourt(caseData);
      caseData = this.cleanSessionForSupportDuringCase(caseData);
    }

    if (hasIntermediaryRequirements === YesOrNo.NO) {
      caseData = this.cleanSessionForIntermediarySupport(caseData);
    }

    return caseData;
  }

  prepareCaseNoteText(userCase: Partial<CaseWithId>): string {
    let note = '';

    // For spike purposes:
    note = note.concat('line 1');
    note = note.concat('line 2');

    note = note.concat('\n');
    note = note.concat('new line?');
    note = note.concat(<string>userCase.ra_intermediaryRequired_subfield);

    return note;
  }

  isReasonableAdjustmentsNeedsPresent(userCase: Partial<CaseWithId>): boolean {
    return !!(
      userCase?.ra_typeOfHearing?.length ||
      userCase?.ra_languageNeeds?.length ||
      userCase?.ra_specialArrangements?.length ||
      userCase?.ra_assistanceRequirements?.length ||
      userCase?.ra_intermediaryRequirements?.length ||
      userCase?.ra_documentInformation?.length ||
      userCase?.ra_communicationHelp?.length ||
      userCase?.ra_supportCourt?.length ||
      userCase?.ra_feelComportable?.length ||
      userCase?.ra_travellingCourt?.length
    );
  }
}

export const RAUtility = new ReasonableAdjustementsUtility();
