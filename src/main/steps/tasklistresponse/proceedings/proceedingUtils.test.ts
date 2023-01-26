import * as Urls from '../../urls';
import { cy, en } from '../proceedings/courtproceedings/content';
import { cy as opDetailsCyContents, en as opDetailsEnContents } from '../proceedings/order-details/content';
import { OPotherProceedingsSessionParserUtil, otherProceedingsContents } from '../proceedings/proceedingUtils';
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
    const UserCase = {};
    const keys = {};
    const URLS = {};
    const sessionKey = '';
    expect(OPotherProceedingsSessionParserUtil(UserCase, keys, URLS, sessionKey)).not.toBe([]);
  });

  test('OPotherProceedingsSessionParserUtil with some content', () => {
    const UserCase = {
      courtProceedingsOrders: [
        'childArrangementOrder',
        'emergencyProtectionOrder',
        'supervisionOrder',
        'careOrder',
        'childAbductionOrder',
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
    const sessionKey = 'courtProceedingsOrders';
    expect(OPotherProceedingsSessionParserUtil(UserCase, keys, URLS, sessionKey)).not.toBe([]);
  });
});
