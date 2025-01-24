/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { YesOrNo } from '../../../../../../app/case/definition';
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
export const getC100CaseCreationConfig = (): ProgressBarProps[] => {
  return [
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
        console.info(preRenderData, 'CP isInProgress --> ', isInProgress);
        return isInProgress;
      },
      isComplete: (caseData, userDetails, preRenderData) => {
        const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'CP isComplete --> ', isComplete);
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
        console.info(preRenderData, 'SQ isInProgress --> ', isInProgress);
        return isInProgress;
      },
      isComplete: (caseData, userDetails, preRenderData) => {
        const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'SQ isComplete --> ', isComplete);
        return isComplete;
      },
    },
    {
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
        console.info(preRenderData, 'miam isInProgress --> ', isInProgress);
        return isInProgress;
      },
      isComplete: (caseData, userDetails, preRenderData) => {
        const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'miam isComplete --> ', isComplete);
        return isComplete;
      },
      show: caseData => caseData?.sq_writtenAgreement === YesOrNo.NO,
    },
    {
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
        console.info(preRenderData, 'TO isInProgress --> ', isInProgress);
        return isInProgress;
      },
      isComplete: (caseData, userDetails, preRenderData) => {
        const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'TO isComplete --> ', isComplete);
        return isComplete;
      },
    },
    {
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
        console.info(preRenderData, 'CO isComplete --> ', isComplete);
        return isComplete;
      },
      show: caseData => caseData?.sq_writtenAgreement === YesOrNo.YES,
    },
    {
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
        console.info(preRenderData, 'OP isInProgress --> ', isInProgress);
        return isInProgress;
      },
      isComplete: (caseData, userDetails, preRenderData) => {
        const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'OP isComplete --> ', isComplete);
        return isComplete;
      },
    },
    {
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
        console.info(preRenderData, 'UWN isInProgress --> ', isInProgress);
        return isInProgress;
      },
      isComplete: (caseData, userDetails, preRenderData) => {
        const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'UWN isComplete --> ', isComplete);
        return isComplete;
      },
    },
    {
      id: CaseCreationStage.PEOPLE,
      label: getLabel.bind(null, CaseCreationStage.PEOPLE),
      ariaLabel: getAriaLabel.bind(null, CaseCreationStage.PEOPLE),
      preRender: caseData => {
        return {
          mandatoryFields: getMandatoryFields(PeopleFieldsConfig, caseData),
        };
      },
      isInProgress: (caseData, userDetails, preRenderData) => {
        const isInProgress = isAtleastOneMandatoryFieldFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'people isInProgress --> ', isInProgress);
        return isInProgress;
      },
      isComplete: (caseData, userDetails, preRenderData) => {
        const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'people isComplete --> ', isComplete);
        return isComplete;
      },
    },
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
        console.info(preRenderData, 'SC isInProgress --> ', isInProgress);
        return isInProgress;
      },
      isComplete: (caseData, userDetails, preRenderData) => {
        const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'SC isComplete --> ', isComplete);
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
        console.info(preRenderData, 'IE isInProgress --> ', isInProgress);
        return isInProgress;
      },
      isComplete: (caseData, userDetails, preRenderData) => {
        const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'IE isComplete --> ', isComplete);
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
        console.info(preRenderData, 'RA isInProgress --> ', isInProgress);
        return isInProgress;
      },
      isComplete: (caseData, userDetails, preRenderData) => {
        const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'RA isComplete --> ', isComplete);
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
        console.info(preRenderData, 'HWF isInProgress --> ', isInProgress);
        return isInProgress;
      },
      isComplete: (caseData, userDetails, preRenderData) => {
        const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'HWF isComplete --> ', isComplete);
        return isComplete;
      },
    },
  ];

  /*if (caseData?.sq_writtenAgreement === YesOrNo.YES) {
    config.splice(2, 0, {
      id: CaseCreationStage.MIAM,
      label: getLabel.bind(null, CaseCreationStage.MIAM),
      ariaLabel: getAriaLabel.bind(null, CaseCreationStage.MIAM),
      isInProgress: () => false,
      isComplete: () => false,
      show: caseData => caseData?.sq_writtenAgreement === YesOrNo.NO,
    });
  } else {
    config.splice(2, 0, {
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
        console.info(preRenderData, 'TO isInProgress --> ', isInProgress);
        return isInProgress;
      },
      isComplete: (caseData, userDetails, preRenderData) => {
        const isComplete = isAllMandatoryFieldsFilled(preRenderData.mandatoryFields, caseData);
        console.info(preRenderData, 'TO isComplete --> ', isComplete);
        return isComplete;
      },
    });
  }*/
};
