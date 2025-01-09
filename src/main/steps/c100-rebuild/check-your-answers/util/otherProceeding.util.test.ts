import { ProceedingsOrderInterface } from '../../../../app/case/definition';
import { IndividualOrderFieldsParser, otherProceedingsContents } from '../../../common/otherProceeding/utils';
import { cy, en } from '../../other-proceedings/current-previous-proceedings/content';
import { cy as opDetailsCyContents, en as opDetailsEnContents } from '../../other-proceedings/order-details/content';

import { OPotherProceedingsSessionParserUtil } from './otherProceeding.util';

describe('test cases for otherProceedingsContents', () => {
  const language = 'en';
  const contentLoaders = SystemLanguage => {
    const opContents = {
      en: () => {
        delete en['errors'];
        delete opDetailsEnContents['errors'];
        return { ...en(), ...opDetailsEnContents(), optitle: opDetailsEnContents().title };
      },
      cy: () => {
        delete cy['errors'];
        delete opDetailsCyContents['errors'];
        return { ...cy(), ...opDetailsCyContents(), optitle: opDetailsCyContents().title };
      },
    };
    return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
  };

  test('english contents', () => {
    expect(otherProceedingsContents('en', 'c100-rebuild')).toStrictEqual(contentLoaders('en'));
  });
  test('Welsh contents', () => {
    expect(otherProceedingsContents('cy', 'c100-rebuild')).toStrictEqual(contentLoaders('cy'));
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
    const sessionKey = 'op_courtProceedingsOrders';
    expect(OPotherProceedingsSessionParserUtil(UserCase, keys, sessionKey, language)).not.toBe([]);
  });

  test('IndividualOrderFieldsParser', () => {
    const order = {} as ProceedingsOrderInterface;
    const keys = {
      courtIssuedLabel: '',
      caseNumberLabel: '',
      orderDateLabel: '',
      isCurrentOrderLabel: '',
      copyOfOrderLabel: '',
      orderEndDate: '',
    };
    expect(IndividualOrderFieldsParser(keys, order, language, 'c100-rebuild')).not.toBe([]);
  });
});
