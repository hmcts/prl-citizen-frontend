/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import { CaseWithId } from '../../app/case/case';
import {
  C100Applicant,
  C100_CASE_EVENT,
  CaseType,
  PartyDetails,
  ReasonableAdjustmentsSupport,
  State,
} from '../../app/case/definition';
import { AppRequest, UserDetails } from '../../app/controller/AppRequest';
import { PageContent } from '../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../app/form/Form';
import { updatePartyDetails } from '../../steps/c100-rebuild/people/util';
import { CommonContent } from '../../steps/common/common.content';
import { applyParms } from '../../steps/common/url-parser';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import { getPartyDetails } from '../../steps/tasklistresponse/utils';
import {
  C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES,
  C100_INTERNATIONAL_ELEMENTS_REQUEST,
  C100_URL,
  PARTY_TASKLIST,
  PageLink,
  RESPOND_TO_APPLICATION,
} from '../../steps/urls';

import {
  RAData,
  RADataTransformContext,
  RAFlagDetail,
  RAFlagValue,
  RAFlags,
  RALocalComponentC100SupportNeeds,
  RALocalComponentRespondentSupportNeeds,
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

  private cleanSessionForDocSupportSubFields(docSupportNeeds: string[] | undefined, caseData: CaseWithId): CaseWithId {
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

  private cleanSessionForCommunicationHelpSubFields(
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

  private cleanSessionForSupportForCourtSubFields(
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

  private cleanSessionForNeedsDuringCourtSubFields(
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

  private cleanSessionForNeedsInCourtSubFields(needsInCourt: string[] | undefined, caseData: CaseWithId): CaseWithId {
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

  isC100DraftApplication(userCase: CaseWithId): boolean {
    return (
      userCase &&
      userCase?.caseTypeOfApplication === CaseType.C100 &&
      userCase?.state === State.AwaitingSubmissionToHmcts
    );
  }

  async retrieveExistingPartyRAFlags(
    caseData: CaseWithId,
    partyDetails: C100Applicant | PartyDetails,
    userAccessToken: UserDetails['accessToken']
  ): Promise<RAFlags> {
    if (this.isC100DraftApplication(caseData)) {
      return {
        partyName: `${(partyDetails as C100Applicant).applicantFirstName} ${
          (partyDetails as C100Applicant).applicantLastName
        }`,
        roleOnCase: 'Applicant 1',
        details: (partyDetails as C100Applicant).reasonableAdjustmentsFlags as RAFlags['details'],
      };
    }

    return RAProvider.service.retrieveExistingPartyRAFlags(
      caseData.id!,
      (partyDetails as PartyDetails).user.idamId,
      userAccessToken
    );
  }

  async updatePartyRAFlags(
    caseData: CaseWithId,
    userDetails: UserDetails,
    raData: RAData,
    req: AppRequest
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isC100DraftApplication(caseData)) {
        const primaryApplicantDetails = _.first(req.session.userCase.appl_allApplicants) as C100Applicant;

        req.session.userCase.appl_allApplicants = updatePartyDetails(
          {
            ...primaryApplicantDetails,
            reasonableAdjustmentsFlags: [...raData.flagsAsSupplied.details, ...raData.replacementFlags.details].reduce(
              (currentFlags: RAFlagValue[], flag: RAFlagDetail) => {
                const currentFlagIndex = currentFlags
                  .filter(_flag => _flag.flagCode !== 'OT0001')
                  .findIndex(_flag => _flag.flagCode === flag.value.flagCode);

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
              primaryApplicantDetails?.reasonableAdjustmentsFlags
                ? [...primaryApplicantDetails.reasonableAdjustmentsFlags]
                : []
            ),
          },
          req.session.userCase.appl_allApplicants
        ) as C100Applicant[];

        return req.session.save(async () => {
          try {
            await req.locals.C100Api.updateCase(
              req.session.userCase.caseId!,
              req.session.userCase,
              this.getNavigationUrl(req),
              C100_CASE_EVENT.CASE_UPDATE
            );
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      }

      (async () => {
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

  getNavigationUrl(req: AppRequest, context?: string): string | PageLink {
    if (this.isC100DraftApplication(req.session.userCase)) {
      const urlBeforeRedirection = RAProvider.getUrlBeforeRedirection(req);
      console.info('**** urlBeforeRedirection', urlBeforeRedirection);

      if (context === 'prev') {
        return urlBeforeRedirection || C100_INTERNATIONAL_ELEMENTS_REQUEST;
      }

      return C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES;
    }

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
      helpCommunication,
      describeOtherNeed,
      courtComfort,
      otherProvideDetails,
      courtHearing,
      communicationSupportOther,
      docsSupport,
      otherDetails,
      languageRequirements,
      //describeSignLanguageDetails,
      reasonableAdjustments,
      safetyArrangements,
      safetyArrangementsDetails,
      travellingToCourt,
      travellingOtherDetails,
      attendingToCourt,
      hearingDetails,
      signLanguageDetails,
      lightingDetails,
      supportWorkerDetails,
      familyProviderDetails,
      therapyDetails,
      docsDetails,
      largePrintDetails,
      parkingDetails,
      differentChairDetails,
      languageDetails,
    } = partyDetails?.response?.supportYouNeed ?? {};

    Object.assign(reasonableAdjustmentsNeeds, {
      ra_typeOfHearing: attendingToCourt,
      ra_noVideoAndPhoneHearing_subfield: hearingDetails,
      ra_specialArrangements: safetyArrangements,
      ra_specialArrangementsOther_subfield: safetyArrangementsDetails,
      ra_languageNeeds: languageRequirements,
      ra_needInterpreterInCertainLanguage_subfield: languageDetails,
      ra_disabilityRequirements: reasonableAdjustments,
      ra_documentInformation: docsSupport,
      ra_specifiedColorDocuments_subfield: docsDetails,
      ra_largePrintDocuments_subfield: largePrintDetails,
      ra_documentHelpOther_subfield: otherDetails,
      ra_communicationHelp: helpCommunication,
      ra_signLanguageInterpreter_subfield: signLanguageDetails,
      ra_communicationHelpOther_subfield: describeOtherNeed,
      ra_supportCourt: courtHearing,
      ra_supportWorkerCarer_subfield: supportWorkerDetails,
      ra_friendFamilyMember_subfield: familyProviderDetails,
      ra_therapyAnimal_subfield: therapyDetails,
      ra_supportCourtOther_subfield: communicationSupportOther,
      ra_feelComportable: courtComfort,
      ra_appropriateLighting_subfield: lightingDetails,
      ra_feelComportableOther_subfield: otherProvideDetails,
      ra_travellingCourt: travellingToCourt,
      ra_parkingSpace_subfield: parkingDetails,
      ra_differentTypeChair_subfield: differentChairDetails,
      ra_travellingCourtOther_subfield: travellingOtherDetails,
    });

    return reasonableAdjustmentsNeeds;
  }

  prepareRARespondentRequest = (caseData: Partial<CaseWithId>): ReasonableAdjustmentsSupport => {
    const request: ReasonableAdjustmentsSupport = {};

    Object.assign(request, {
      attendingToCourt: caseData?.ra_typeOfHearing,
      hearingDetails: caseData?.ra_noVideoAndPhoneHearing_subfield,
      safetyArrangements: caseData?.safetyArrangements,
      safetyArrangementsDetails: caseData?.ra_specialArrangementsOther_subfield,
      languageRequirements: caseData?.ra_languageNeeds,
      languageDetails: caseData?.ra_needInterpreterInCertainLanguage_subfield,
      reasonableAdjustments: caseData?.ra_disabilityRequirements,
      docsSupport: caseData?.ra_documentInformation,
      docsDetails: caseData?.ra_specifiedColorDocuments_subfield,
      largePrintDetails: caseData?.ra_largePrintDocuments_subfield,
      otherDetails: caseData?.ra_documentHelpOther_subfield,
      helpCommunication: caseData?.ra_communicationHelp,
      signLanguageDetails: caseData?.ra_signLanguageInterpreter_subfield,
      describeOtherNeed: caseData?.ra_communicationHelpOther_subfield,
      courtHearing: caseData?.ra_supportCourt,
      supportWorkerDetails: caseData?.ra_supportWorkerCarer_subfield,
      familyProviderDetails: caseData?.ra_friendFamilyMember_subfield,
      therapyDetails: caseData?.ra_therapyAnimal_subfield,
      communicationSupportOther: caseData?.ra_supportCourtOther_subfield,
      courtComfort: caseData?.ra_feelComportable,
      lightingDetails: caseData?.ra_appropriateLighting_subfield,
      otherProvideDetails: caseData?.ra_feelComportableOther_subfield,
      travellingToCourt: caseData?.ra_travellingCourt,
      parkingDetails: caseData?.ra_parkingSpace_subfield,
      differentChairDetails: caseData?.ra_differentTypeChair_subfield,
      travellingOtherDetails: caseData?.ra_travellingCourtOther_subfield,
    });

    return request;
  };

  cleanSessionForLocalComponent(req: AppRequest): CaseWithId {
    const { body, session } = req;
    let caseData = { ...session.userCase };
    const attendingToCourt = body?.ra_typeOfHearing?.filter(val => !!val);
    const languageNeeds = body?.ra_languageNeeds?.filter(val => !!val);
    const specialArrangements = body?.ra_specialArrangements?.filter(val => !!val);
    const supportRequirements = body?.ra_disabilityRequirements?.filter(val => !!val);

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

    if (supportRequirements?.length) {
      caseData = !this.hasRAValueInSessionForLocalComponent(
        [RALocalComponentC100SupportNeeds.DOCUMENTS_SUPPORT, RALocalComponentRespondentSupportNeeds.DOCUMENTS_SUPPORT],
        supportRequirements
      )
        ? this.cleanSessionForDocumentSupport(caseData)
        : this.cleanSessionForDocSupportSubFields(body?.ra_documentInformation, caseData);

      caseData = !this.hasRAValueInSessionForLocalComponent(
        [
          RALocalComponentC100SupportNeeds.COMMUNICATION_HELP,
          RALocalComponentRespondentSupportNeeds.COMMUNICATION_HELP,
        ],
        supportRequirements
      )
        ? this.cleanSessionForCommunicationHelp(caseData)
        : this.cleanSessionForCommunicationHelpSubFields(body?.ra_communicationHelp, caseData);

      caseData = !this.hasRAValueInSessionForLocalComponent(
        [
          RALocalComponentC100SupportNeeds.COURT_HEARING_SUPPORT,
          RALocalComponentRespondentSupportNeeds.COURT_HEARING_SUPPORT,
        ],
        supportRequirements
      )
        ? this.cleanSessionForSupportForCourtHearing(caseData)
        : this.cleanSessionForSupportForCourtSubFields(body?.ra_supportCourt, caseData);

      caseData = !this.hasRAValueInSessionForLocalComponent(
        [
          RALocalComponentC100SupportNeeds.COURT_HEARING_COMFORT,
          RALocalComponentRespondentSupportNeeds.COURT_HEARING_COMFORT,
        ],
        supportRequirements
      )
        ? this.cleanSessionForNeedsDuringCourtHearing(caseData)
        : this.cleanSessionForNeedsDuringCourtSubFields(body?.ra_feelComportable, caseData);

      caseData = !this.hasRAValueInSessionForLocalComponent(
        [
          RALocalComponentC100SupportNeeds.TRAVELLING_TO_COURT,
          RALocalComponentRespondentSupportNeeds.TRAVELLING_TO_COURT,
        ],
        supportRequirements
      )
        ? this.cleanSessionForNeedsInCourt(caseData)
        : this.cleanSessionForNeedsInCourtSubFields(body?.ra_travellingCourt, caseData);

      if (
        this.hasRAValueInSessionForLocalComponent(
          [RALocalComponentC100SupportNeeds.NO_SUPPORT, RALocalComponentRespondentSupportNeeds.NO_SUPPORT],
          supportRequirements
        )
      ) {
        caseData = this.cleanSessionForDocumentSupport(caseData);
        caseData = this.cleanSessionForCommunicationHelp(caseData);
        caseData = this.cleanSessionForSupportForCourtHearing(caseData);
        caseData = this.cleanSessionForNeedsDuringCourtHearing(caseData);
        caseData = this.cleanSessionForNeedsInCourt(caseData);
      }
    }

    return caseData;
  }
}

export const RAUtility = new ReasonableAdjustementsUtility();
