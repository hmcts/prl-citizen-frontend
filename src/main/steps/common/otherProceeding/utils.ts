/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProceedingsOrderInterface, RootContext, YesOrNo } from '../../../app/case/definition';
import { HTML } from '../../../steps/c100-rebuild/check-your-answers/common/htmlSelectors';
import { Mapper } from '../../../steps/c100-rebuild/check-your-answers/util/otherProceeding.util';
import { getYesNoTranslation } from '../../c100-rebuild/check-your-answers/mainUtil';
import {
  cy as c100CyContent,
  en as c100EnContent,
} from '../../c100-rebuild/other-proceedings/current-previous-proceedings/content';
import {
  cy as C100OpDetailsCyContents,
  en as C100OpDetailsEnContents,
} from '../../c100-rebuild/other-proceedings/order-details/content';
import {
  cy as respondentCyContent,
  en as respondentEnContent,
} from '../../tasklistresponse/proceedings/courtproceedings/content';
import {
  cy as respondentOpDetailsCyContents,
  en as respondentOpDetailsEnContents,
} from '../../tasklistresponse/proceedings/order-details/content';
import { DATE_FORMATTOR } from '../dateformatter';

export const IndividualOrderFieldsParser = (
  keys: Record<string, string>,
  order: ProceedingsOrderInterface,
  language: string,
  context: string
): string => {
  const newOrders = order;
  let Val = '';
  if (newOrders?.['orderDocument']) {
    Object.entries(newOrders).forEach((entry, index) => {
      const key = entry[0];
      const value = entry[1];
      const keyDetails =
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_ELEMENT +
        Mapper(key, keys) +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END;

      if (key !== 'id' && key !== 'orderDocument') {
        Val += prepareNonOrderDocumentFields(entry, value, keyDetails, language, context, key);
      } else if (key === 'orderDocument' && context === RootContext.RESPONDENT) {
        const displayValue = value?.['filename'] ? YesOrNo.YES : YesOrNo.NO;
        const valueDetails =
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_DETAIL +
          getYesNoTranslation(language, displayValue, 'doTranslation') +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END;
        Val += keyDetails + valueDetails;
      }
    });
  } else {
    Object.entries(newOrders).forEach((entry, index) => {
      const key = entry[0];
      const value = entry[1];
      const keyDetails =
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_ELEMENT +
        Mapper(key, keys) +
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END;

      if (key !== 'id' && key !== 'orderDetail') {
        Val += prepareNonOrderDocumentFields(entry, value, keyDetails, language, context, key);
      } else if (key === 'orderDetail') {
        const valueDetails =
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_DETAIL +
          value +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END;
        Val += keyDetails + valueDetails;
      }
    });
  }
  return HTML.DESCRIPTION_LIST + Val + HTML.DESCRIPTION_LIST_END;
};

const prepareNonOrderDocumentFields = (entry, value, keyDetails, language, context, key): string => {
  let valueDetails = '';
  if (typeof entry[1] === 'object' && entry[1] !== null) {
    valueDetails =
      HTML.ROW_START +
      HTML.DESCRIPTION_TERM_DETAIL +
      DATE_FORMATTOR(value, language) +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
    return keyDetails + valueDetails;
  } else {
    valueDetails =
      HTML.ROW_START +
      HTML.DESCRIPTION_TERM_DETAIL +
      (value === YesOrNo.YES
        ? getYesNoTranslation(language, YesOrNo.YES, 'doTranslation')
        : isValueNo(value, language)) +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END;
    if (context === RootContext.C100_REBUILD) {
      if (key === 'currentOrder') {
        valueDetails =
          HTML.ROW_START +
          HTML.DESCRIPTION_TERM_DETAIL +
          getYesNoTranslation(language, value, 'ieTranslation') +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END;
      } else if (key === 'orderCopy') {
        valueDetails =
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_DETAIL +
          getYesNoTranslation(language, value, 'oesTranslation') +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END;
      } else {
        valueDetails =
          HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL + value + HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END;
      }
    }
    return keyDetails + valueDetails;
  }
};

const isValueNo = (value, language) =>
  value === YesOrNo.NO ? getYesNoTranslation(language, YesOrNo.NO, 'doTranslation') : value;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const otherProceedingsContents = (SystemLanguage, context: string) => {
  const opContents = {
    en: () => {
      const en = context === RootContext.RESPONDENT ? respondentEnContent : c100EnContent;
      const opDetailsEnContents =
        context === RootContext.RESPONDENT ? respondentOpDetailsEnContents : C100OpDetailsEnContents;
      delete en['errors'];
      delete opDetailsEnContents['errors'];
      return { ...en(), ...opDetailsEnContents(), optitle: opDetailsEnContents().title };
    },
    cy: () => {
      const cy = context === RootContext.RESPONDENT ? respondentCyContent : c100CyContent;
      const opDetailsCyContents =
        context === RootContext.RESPONDENT ? respondentOpDetailsCyContents : C100OpDetailsCyContents;
      delete cy['errors'];
      delete opDetailsCyContents['errors'];
      return { ...cy(), ...opDetailsCyContents(), optitle: opDetailsCyContents().title };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
