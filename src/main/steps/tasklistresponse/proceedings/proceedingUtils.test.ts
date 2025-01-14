import { otherProceedingsContents } from '../../common/otherProceeding/utils';
import { cy, en } from '../proceedings/courtproceedings/content';
import { cy as opDetailsCyContents, en as opDetailsEnContents } from '../proceedings/order-details/content';
import { OPotherProceedingsSessionParserUtil } from '../proceedings/proceedingUtils';
describe('test cases for otherProceedingsContents', () => {
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
    expect(otherProceedingsContents('en', 'respondent')).toStrictEqual(contentLoaders('en'));
  });
  test('Welsh contents', () => {
    expect(otherProceedingsContents('cy', 'respondent')).toStrictEqual(contentLoaders('cy'));
  });

  test('OPotherProceedingsSessionParserUtil', () => {
    const UserCase = {};
    const keys = {};
    const sessionKey = '';
    expect(OPotherProceedingsSessionParserUtil(UserCase, keys, sessionKey, 'en')).not.toBe([]);
  });

  test('OPotherProceedingsSessionParserUtil with some content', () => {
    const UserCase = {
      op_courtProceedingsOrders: [
        'childArrangementOrder',
        'emergencyProtectionOrder',
        'supervisionOrder',
        'careOrder',
        'childAbductionOrder',
        'contactOrderForDivorce',
        'contactOrderForAdoption',
      ],
      otherProceedings: {
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
              orderDocument: undefined,
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
          contactOrdersForDivorce: [
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
          contactOrdersForAdoption: [
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
    expect(OPotherProceedingsSessionParserUtil(UserCase, keys, sessionKey, 'en')).not.toBe([]);
  });
});
