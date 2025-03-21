/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CaseWithId } from '../../../../../../app/case/case';
import { C100FlowTypes, YesOrNo } from '../../../../../../app/case/definition';
import { getC100FlowType } from '../../../../../c100-rebuild/utils';
import {
  ChildrenPostcodeFieldsConfig,
  ConsentOrderFieldsConfig,
  HelpWithFeesFieldsConfig,
  InternationalElementsFieldsConfig,
  MiamQuestionsFieldsConfig,
  OtherProceedingsFieldsConfig,
  PeopleFieldsConfig,
  ReasonableAdjustmentsFieldsConfig,
  SafetyConcernsFieldsConfig,
  ScreeningQuestionsFieldsConfig,
  TypeOfOrderFieldsConfig,
  UrgenceyAndWithoutNoticeFieldsConfig,
} from '../../../../../c100-rebuild/validation/fields-config/config';
import {
  getMandatoryFields,
  isAllMandatoryFieldsFilled,
  isAtleastOneMandatoryFieldFilled,
} from '../../../../../c100-rebuild/validation/util';
import { ProgressBarProps } from '../../../definitions';
import { CaseCreationStage, getAriaLabel, getLabel } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getC100CaseCreationConfig = (caseData: CaseWithId): ProgressBarProps[] => {
  let flowType: C100FlowTypes = C100FlowTypes.C100_WITH_MIAM;
  const progressBarSections: ProgressBarProps[] = [];
  progressBarSections.push(...startSections);

  if (caseData) {
    if (caseData.sq_legalRepresentationApplication && caseData.sq_legalRepresentationApplication === YesOrNo.YES) {
      return progressBarSections;
    }

    flowType = getC100FlowType(caseData);
  }

  switch (flowType) {
    case C100FlowTypes.C100_WITH_CONSENT_ORDER: {
      progressBarSections.push(typeOfOrderSection);
      progressBarSections.push(consentOrderSection);
      progressBarSections.push(hearingUrgencyWithoutNoticeSection);
      progressBarSections.push(peopleSection);
      progressBarSections.push(otherProceedingsSection);
      break;
    }
    case C100FlowTypes.C100_WITH_MIAM_OTHER_PROCEEDINGS_OR_ATTENDANCE: {
      progressBarSections.push(miamSection);
      progressBarSections.push(otherProceedingsSection);
      progressBarSections.push(typeOfOrderSection);
      progressBarSections.push(hearingUrgencyWithoutNoticeSection);
      progressBarSections.push(peopleSection);
      break;
    }
    case C100FlowTypes.C100_WITH_MIAM_URGENCY: {
      progressBarSections.push(miamSection);
      progressBarSections.push(hearingUrgencyWithoutNoticeSection);
      progressBarSections.push(typeOfOrderSection);
      progressBarSections.push(peopleSection);
      progressBarSections.push(otherProceedingsSection);
      break;
    }
    default: {
      progressBarSections.push(miamSection);
      progressBarSections.push(typeOfOrderSection);
      progressBarSections.push(hearingUrgencyWithoutNoticeSection);
      progressBarSections.push(peopleSection);
      progressBarSections.push(otherProceedingsSection);
    }
  }
  progressBarSections.push(...endSections);

  return progressBarSections;
};

const startSections: ProgressBarProps[] = [
  {
    id: CaseCreationStage.CHILDREN_POSTCODE,
    label: getLabel.bind(null, CaseCreationStage.CHILDREN_POSTCODE),
    ariaLabel: getAriaLabel.bind(null, CaseCreationStage.CHILDREN_POSTCODE),
    preRender: caseData => {
      return {
        mandatoryFields: getMandatoryFields(ChildrenPostcodeFieldsConfig, caseData),
      };
    },
    isInProgress: (caseData, userDetails, preRenderData) => {
      const isInProgress = isAtleastOneMandatoryFieldFilled(preRenderData.mandatoryFields, caseData);
      return isInProgress;
    },
    isComplete: (caseData, userDetails, preRenderData) => {
      const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
      return isComplete;
    },
  },
  {
    id: CaseCreationStage.SCREENING_SECTION,
    label: getLabel.bind(null, CaseCreationStage.SCREENING_SECTION),
    ariaLabel: getAriaLabel.bind(null, CaseCreationStage.SCREENING_SECTION),
    preRender: caseData => {
      return {
        mandatoryFields: getMandatoryFields(ScreeningQuestionsFieldsConfig, caseData),
      };
    },
    isInProgress: (caseData, userDetails, preRenderData) => {
      const isInProgress = isAtleastOneMandatoryFieldFilled(preRenderData.mandatoryFields, caseData);
      return isInProgress;
    },
    isComplete: (caseData, userDetails, preRenderData) => {
      const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
      return isComplete;
    },
  },
];

const consentOrderSection: ProgressBarProps = {
  id: CaseCreationStage.CONSENT_ORDER,
  label: getLabel.bind(null, CaseCreationStage.CONSENT_ORDER),
  ariaLabel: getAriaLabel.bind(null, CaseCreationStage.CONSENT_ORDER),
  preRender: caseData => {
    return {
      mandatoryFields: getMandatoryFields(ConsentOrderFieldsConfig, caseData),
    };
  },
  isComplete: (caseData, userDetails, preRenderData) => {
    const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
    return isComplete;
  },
  show: caseData => caseData?.sq_writtenAgreement === YesOrNo.YES,
};

const miamSection: ProgressBarProps = {
  id: CaseCreationStage.MIAM,
  label: getLabel.bind(null, CaseCreationStage.MIAM),
  ariaLabel: getAriaLabel.bind(null, CaseCreationStage.MIAM),
  preRender: caseData => {
    return {
      mandatoryFields: getMandatoryFields(MiamQuestionsFieldsConfig, caseData),
    };
  },
  isInProgress: (caseData, userDetails, preRenderData) => {
    const isInProgress = isAtleastOneMandatoryFieldFilled(preRenderData.mandatoryFields, caseData);
    return isInProgress;
  },
  isComplete: (caseData, userDetails, preRenderData) => {
    const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
    return isComplete;
  },
  show: caseData => caseData?.sq_writtenAgreement === YesOrNo.NO,
};

const typeOfOrderSection: ProgressBarProps = {
  id: CaseCreationStage.TYPE_OF_ORDER,
  label: getLabel.bind(null, CaseCreationStage.TYPE_OF_ORDER),
  ariaLabel: getAriaLabel.bind(null, CaseCreationStage.TYPE_OF_ORDER),
  preRender: caseData => {
    return {
      mandatoryFields: getMandatoryFields(TypeOfOrderFieldsConfig, caseData),
    };
  },
  isInProgress: (caseData, userDetails, preRenderData) => {
    const isInProgress = isAtleastOneMandatoryFieldFilled(preRenderData.mandatoryFields, caseData);
    return isInProgress;
  },
  isComplete: (caseData, userDetails, preRenderData) => {
    const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
    return isComplete;
  },
};

const otherProceedingsSection: ProgressBarProps = {
  id: CaseCreationStage.OTHER_PROCEEDINGS,
  label: getLabel.bind(null, CaseCreationStage.OTHER_PROCEEDINGS),
  ariaLabel: getAriaLabel.bind(null, CaseCreationStage.OTHER_PROCEEDINGS),
  preRender: caseData => {
    return {
      mandatoryFields: getMandatoryFields(OtherProceedingsFieldsConfig, caseData),
    };
  },
  isInProgress: (caseData, userDetails, preRenderData) => {
    const isInProgress = isAtleastOneMandatoryFieldFilled(preRenderData.mandatoryFields, caseData);
    return isInProgress;
  },
  isComplete: (caseData, userDetails, preRenderData) => {
    const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
    return isComplete;
  },
};

const hearingUrgencyWithoutNoticeSection: ProgressBarProps = {
  id: CaseCreationStage.URGENCY_AND_WITHOUT_NOTICE,
  label: getLabel.bind(null, CaseCreationStage.URGENCY_AND_WITHOUT_NOTICE),
  ariaLabel: getAriaLabel.bind(null, CaseCreationStage.URGENCY_AND_WITHOUT_NOTICE),
  preRender: caseData => {
    return {
      mandatoryFields: getMandatoryFields(UrgenceyAndWithoutNoticeFieldsConfig, caseData),
    };
  },
  isInProgress: (caseData, userDetails, preRenderData) => {
    const isInProgress = isAtleastOneMandatoryFieldFilled(preRenderData.mandatoryFields, caseData);
    return isInProgress;
  },
  isComplete: (caseData, userDetails, preRenderData) => {
    const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
    return isComplete;
  },
};

const peopleSection: ProgressBarProps = {
  id: CaseCreationStage.PEOPLE,
  label: getLabel.bind(null, CaseCreationStage.PEOPLE),
  ariaLabel: getAriaLabel.bind(null, CaseCreationStage.PEOPLE),
  preRender: caseData => {
    return {
      mandatoryFields: getMandatoryFields(PeopleFieldsConfig, caseData),
    };
  },
  isInProgress: (caseData, userDetails, preRenderData) => {
    const childSectionStarted = (caseData?.cd_children && caseData?.cd_children?.length > 0) ?? false;
    const isInProgress =
      childSectionStarted || isAtleastOneMandatoryFieldFilled(preRenderData.mandatoryFields, caseData);
    return isInProgress;
  },
  isComplete: (caseData, userDetails, preRenderData) => {
    const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
    return isComplete;
  },
};

const endSections: ProgressBarProps[] = [
  {
    id: CaseCreationStage.SAFETY_CONCERNS,
    label: getLabel.bind(null, CaseCreationStage.SAFETY_CONCERNS),
    ariaLabel: getAriaLabel.bind(null, CaseCreationStage.SAFETY_CONCERNS),
    preRender: caseData => {
      return {
        mandatoryFields: getMandatoryFields(SafetyConcernsFieldsConfig, caseData),
      };
    },
    isInProgress: (caseData, userDetails, preRenderData) => {
      const isInProgress = isAtleastOneMandatoryFieldFilled(preRenderData.mandatoryFields, caseData);
      return isInProgress;
    },
    isComplete: (caseData, userDetails, preRenderData) => {
      const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
      return isComplete;
    },
  },
  {
    id: CaseCreationStage.INTERNATIONAL_ELEMENTS,
    label: getLabel.bind(null, CaseCreationStage.INTERNATIONAL_ELEMENTS),
    ariaLabel: getAriaLabel.bind(null, CaseCreationStage.INTERNATIONAL_ELEMENTS),
    preRender: caseData => {
      return {
        mandatoryFields: getMandatoryFields(InternationalElementsFieldsConfig, caseData),
      };
    },
    isInProgress: (caseData, userDetails, preRenderData) => {
      const isInProgress = isAtleastOneMandatoryFieldFilled(preRenderData.mandatoryFields, caseData);
      return isInProgress;
    },
    isComplete: (caseData, userDetails, preRenderData) => {
      const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
      return isComplete;
    },
  },
  {
    id: CaseCreationStage.REASONABLE_ADJUSTMENTS,
    label: getLabel.bind(null, CaseCreationStage.REASONABLE_ADJUSTMENTS),
    ariaLabel: getAriaLabel.bind(null, CaseCreationStage.REASONABLE_ADJUSTMENTS),
    preRender: caseData => {
      return {
        mandatoryFields: getMandatoryFields(ReasonableAdjustmentsFieldsConfig, caseData),
      };
    },
    isInProgress: (caseData, userDetails, preRenderData) => {
      const isInProgress = isAtleastOneMandatoryFieldFilled(preRenderData.mandatoryFields, caseData);
      return isInProgress;
    },
    isComplete: (caseData, userDetails, preRenderData) => {
      const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
      return isComplete;
    },
  },
  {
    id: CaseCreationStage.HELP_WITH_FEES,
    label: getLabel.bind(null, CaseCreationStage.HELP_WITH_FEES),
    ariaLabel: getAriaLabel.bind(null, CaseCreationStage.HELP_WITH_FEES),
    preRender: caseData => {
      return {
        mandatoryFields: getMandatoryFields(HelpWithFeesFieldsConfig, caseData),
      };
    },
    isInProgress: (caseData, userDetails, preRenderData) => {
      const isInProgress = isAtleastOneMandatoryFieldFilled(preRenderData.mandatoryFields, caseData);
      return isInProgress;
    },
    isComplete: (caseData, userDetails, preRenderData) => {
      const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
      return isComplete;
    },
  },
];
