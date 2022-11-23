import * as Urls from '../../../urls';
import { cy, en } from '../../other-proceedings/current-previous-proceedings/content';
import { cy as opDetailsCyContents, en as opDetailsEnContents } from '../../other-proceedings/order-details/content';

import {
  IndividualOrderFieldsParser,
  OPotherProceedingsSessionParserUtil,
  otherProceedingsContents,
} from './otherProceeding.util';

describe('test cases for otherProceedingsContents', () => {
  const contentLoaders = SystemLanguage => {
    const opContents = {
      en: () => {
        delete en['errors'];
        delete opDetailsEnContents['errors'];
        return { ...en(), ...opDetailsEnContents(), optitle: opDetailsEnContents().pageTitle };
      },
      cy: () => {
        delete cy['errors'];
        delete opDetailsCyContents['errors'];
        return { ...cy(), ...opDetailsCyContents(), optitle: opDetailsCyContents().pageTitle };
      },
    };
    return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
  };

  test('english contents', () => {
    expect(otherProceedingsContents('en')).toStrictEqual(contentLoaders('en'));
  });
  test('Welsh contents', () => {
    expect(otherProceedingsContents('cy')).toStrictEqual(contentLoaders('cy'));
  });

  test('OPotherProceedingsSessionParserUtil', () => {
    const UserCase = {
      op_courtProceedingsOrders: [
        'childArrangementOrder',
        'emergencyProtectionOrder',
        'supervisionOrder',
        'careOrder',
        'childAbductionOrder',
      ],
      op_otherProceedings: {
        order: {
          childArrangementOrders: [
            {
              id: '1',
              orderDetail: '',
              caseNo: '',
              orderDate: {
                year: '',
                month: '',
                day: '',
              },
              currentOrder: '',
              orderEndDate: {
                year: '',
                month: '',
                day: '',
              },
              orderCopy: '',
            },
          ],
          emergencyProtectionOrders: [
            {
              id: '1',
              orderDetail: '',
              caseNo: '',
              orderDate: {
                year: '',
                month: '',
                day: '',
              },
              currentOrder: '',
              orderEndDate: {
                year: '',
                month: '',
                day: '',
              },
              orderCopy: '',
            },
          ],
          supervisionOrders: [
            {
              id: '1',
              orderDetail: '',
              caseNo: '',
              orderDate: {
                year: '',
                month: '',
                day: '',
              },
              currentOrder: '',
              orderEndDate: {
                year: '',
                month: '',
                day: '',
              },
              orderCopy: '',
            },
          ],
          careOrders: [
            {
              id: '1',
              orderDetail: '',
              caseNo: '',
              orderDate: {
                year: '',
                month: '',
                day: '',
              },
              currentOrder: '',
              orderEndDate: {
                year: '',
                month: '',
                day: '',
              },
              orderCopy: '',
            },
          ],
          childAbductionOrders: [
            {
              id: '1',
              orderDetail: '',
              caseNo: '',
              orderDate: {
                year: '',
                month: '',
                day: '',
              },
              currentOrder: '',
              orderEndDate: {
                year: '',
                month: '',
                day: '',
              },
              orderCopy: '',
            },
          ],
        },
      },
    };
    const keys = {};
    const URLS = Urls;
    const sessionKey = 'op_courtProceedingsOrders';
    expect(OPotherProceedingsSessionParserUtil(UserCase, keys, URLS, sessionKey)).not.toBe([]);
  });

  test('IndividualOrderFieldsParser', () => {
    const order = {};
    const keys = {
      courtIssuedLabel: '',
      caseNumberLabel: '',
      orderDateLabel: '',
      isCurrentOrderLabel: '',
      copyOfOrderLabel: '',
      orderEndDate: '',
    };
    expect(IndividualOrderFieldsParser(keys, order)).not.toBe([]);
  });
});
