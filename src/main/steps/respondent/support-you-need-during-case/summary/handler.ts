import { CaseWithId } from '../../../../app/case/case';
import { ReasonableAdjustments } from '../../../../app/case/definition';
import { NO_HEARINGS } from '../../../../steps/constants';
import {
  CA_DA_COMMUNICATION_HELP,
  CA_DA_COURT_HEARING_COMFORT,
  CA_DA_COURT_HEARING_SUPPORT,
  CA_DA_DOCUMENTS_SUPPORT,
  CA_DA_TRAVELLING_TO_COURT,
} from '../../../../steps/urls';

import { cyContent, enContent, urls } from './content';

export function filterSelectedUrls(userCase: Partial<CaseWithId>): void {
  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.DOCUMENTS_SUPPORT)) {
    Object.assign(urls, { docsSupport: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { docsDetails: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { largePrintDetails: CA_DA_DOCUMENTS_SUPPORT });
    Object.assign(urls, { otherDetails: CA_DA_DOCUMENTS_SUPPORT });

    Object.assign(enContent.keys, { docsSupport: 'I need documents in an alternative format' });
    Object.assign(enContent.keys, { docsDetails: 'Please provide the docs details' });
    Object.assign(enContent.keys, { largePrintDetails: 'Please provide the large print details' });
    Object.assign(enContent.keys, { otherDetails: 'Please provide the other details' });

    Object.assign(cyContent.keys, { docsSupport: 'I need documents in an alternative format -welsh' });
    Object.assign(cyContent.keys, { docsDetails: 'Please provide the docs details -welsh' });
    Object.assign(cyContent.keys, { largePrintDetails: 'Please provide the large print details -welsh' });
    Object.assign(cyContent.keys, { otherDetails: 'Please provide the other details -welsh' });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COMMUNICATION_HELP)) {
    Object.assign(urls, { helpCommunication: CA_DA_COMMUNICATION_HELP });
    Object.assign(urls, { describeSignLanguageDetails: CA_DA_COMMUNICATION_HELP });
    Object.assign(urls, { describeOtherNeed: CA_DA_COMMUNICATION_HELP });

    Object.assign(enContent.keys, { helpCommunication: 'I need help communicating and understanding' });
    Object.assign(enContent.keys, { describeSignLanguageDetails: 'Please provide sign language details' });
    Object.assign(enContent.keys, { describeOtherNeed: 'Please provide the details' });

    Object.assign(cyContent.keys, { helpCommunication: 'I need help communicating and understanding -welsh' });
    Object.assign(cyContent.keys, { describeSignLanguageDetails: 'Please provide sign language details -welsh' });
    Object.assign(cyContent.keys, { describeOtherNeed: 'Please provide the details -welsh' });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COURT_HEARING_SUPPORT)) {
    Object.assign(urls, { courtHearing: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { supportWorkerDetails: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { familyProviderDetails: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { therapyDetails: CA_DA_COURT_HEARING_SUPPORT });
    Object.assign(urls, { communicationSupportOther: CA_DA_COURT_HEARING_SUPPORT });

    Object.assign(enContent.keys, {
      courtHearing: 'I would need to bring support with me to a court hearing',
    });
    Object.assign(enContent.keys, { supportWorkerDetails: 'Please provide support worker details' });
    Object.assign(enContent.keys, { familyProviderDetails: 'Please provide family member details' });
    Object.assign(enContent.keys, { therapyDetails: 'Please provide therapy animal details' });
    Object.assign(enContent.keys, { communicationSupportOther: 'Please provide the details' });

    Object.assign(cyContent.keys, {
      courtHearing: 'I would need to bring support with me to a court hearing -welsh',
    });
    Object.assign(cyContent.keys, { supportWorkerDetails: 'Please provide support worker details -welsh' });
    Object.assign(cyContent.keys, { familyProviderDetails: 'Please provide family member details -welsh' });
    Object.assign(cyContent.keys, { therapyDetails: 'Please provide therapy animal details -welsh' });
    Object.assign(cyContent.keys, { communicationSupportOther: 'Please provide the details -welsh' });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.COURT_HEARING_COMFORT)) {
    Object.assign(urls, { courtComfort: CA_DA_COURT_HEARING_COMFORT });
    Object.assign(urls, { lightingProvideDetails: CA_DA_COURT_HEARING_COMFORT });
    Object.assign(urls, { otherProvideDetails: CA_DA_COURT_HEARING_COMFORT });

    Object.assign(enContent.keys, {
      courtComfort: 'I need something to make me feel comfortable during a court hearing',
    });
    Object.assign(enContent.keys, { lightingProvideDetails: 'Please describe appropriate lighting details' });
    Object.assign(enContent.keys, { otherProvideDetails: 'Please describe your need in detail' });

    Object.assign(cyContent.keys, {
      courtComfort: 'I need something to make me feel comfortable during a court hearing -welsh',
    });
    Object.assign(cyContent.keys, { lightingProvideDetails: 'Please describe appropriate lighting details -welsh' });
    Object.assign(cyContent.keys, { otherProvideDetails: 'Please describe your need in detail -welsh' });
  }

  if (userCase.reasonableAdjustments?.includes(ReasonableAdjustments.TRAVELLING_TO_COURT)) {
    Object.assign(urls, { travellingToCourt: CA_DA_TRAVELLING_TO_COURT });
    Object.assign(urls, { parkingDetails: CA_DA_TRAVELLING_TO_COURT });
    Object.assign(urls, { differentChairDetails: CA_DA_TRAVELLING_TO_COURT });
    Object.assign(urls, { travellingOtherDetails: CA_DA_TRAVELLING_TO_COURT });

    Object.assign(enContent.keys, {
      travellingToCourt: 'I need help travelling to, or moving around court buildings',
    });
    Object.assign(enContent.keys, { parkingDetails: 'Please describe parking space details' });
    Object.assign(enContent.keys, { differentChairDetails: 'Please describe different chair details' });
    Object.assign(enContent.keys, { travellingOtherDetails: 'Please describe your need in detail' });

    Object.assign(cyContent.keys, {
      travellingToCourt: 'I need help travelling to, or moving around court buildings -welsh',
    });
    Object.assign(cyContent.keys, { parkingDetails: 'Please describe parking space details -welsh' });
    Object.assign(cyContent.keys, { differentChairDetails: 'Please describe different chair details -welsh' });
    Object.assign(cyContent.keys, { travellingOtherDetails: 'Please describe your need in detail -welsh' });
  }

  if (!userCase?.attendingToCourt?.includes(NO_HEARINGS)) {
    userCase.hearingDetails = '';
  }

  if (!userCase?.languageRequirements?.includes('languageinterpreter')) {
    userCase.languageDetails = '';
  }
  if (!userCase?.safetyArrangements?.includes('other')) {
    userCase.safetyArrangementsDetails = '';
  }
  //resonable adjustment
  if (!userCase?.reasonableAdjustments?.includes('docsformat')) {
    delete userCase.docsSupport;
  }
  if (!userCase?.reasonableAdjustments?.includes('commhelp')) {
    delete userCase.helpCommunication;
  }
  if (!userCase?.reasonableAdjustments?.includes('hearingsupport')) {
    delete userCase.courtHearing;
  }
  if (!userCase?.reasonableAdjustments?.includes('hearingcomfort')) {
    delete userCase.courtComfort;
  }
  if (!userCase?.reasonableAdjustments?.includes('travellinghelp')) {
    delete userCase.travellingToCourt;
  }
  //docSupport
  if (!userCase?.docsSupport?.includes('docsprint')) {
    userCase.docsDetails = '';
  }
  if (!userCase?.docsSupport?.includes('largeprintdocs')) {
    userCase.largePrintDetails = '';
  }
  if (!userCase?.docsSupport?.includes('other')) {
    userCase.otherDetails = '';
  }
  //comunication help
  if (!userCase?.helpCommunication?.includes('signlanguage')) {
    userCase.describeSignLanguageDetails = '';
  }
  if (!userCase?.helpCommunication?.includes('other')) {
    userCase.describeOtherNeed = '';
  }
  //Hearing Support
  if (!userCase?.courtHearing?.includes('supportworker')) {
    userCase.supportWorkerDetails = '';
  }
  if (!userCase?.courtHearing?.includes('familymember')) {
    userCase.familyProviderDetails = '';
  }
  if (!userCase?.courtHearing?.includes('animal')) {
    userCase.therapyDetails = '';
  }
  if (!userCase?.courtHearing?.includes('other')) {
    userCase.communicationSupportOther = '';
  }
  //court comfort
  if (!userCase?.courtComfort?.includes('appropriatelighting')) {
    userCase.lightingProvideDetails = '';
  }
  if (!userCase?.courtComfort?.includes('other')) {
    userCase.otherProvideDetails = '';
  }
  //travel help
  if (!userCase?.travellingToCourt?.includes('parkingspace')) {
    userCase.parkingDetails = '';
  }
  if (!userCase?.travellingToCourt?.includes('differentchair')) {
    userCase.differentChairDetails = '';
  }
  if (!userCase?.travellingToCourt?.includes('other')) {
    userCase.travellingOtherDetails = '';
  }
}
