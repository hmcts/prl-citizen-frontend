import { cy, en } from '../../other-proceedings/current-previous-proceedings/content';
import { cy as opDetailsCyContents, en as opDetailsEnContents } from '../../other-proceedings/order-details/content';

import { otherProceedingsContents } from './otherProceeding.util';

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
});
