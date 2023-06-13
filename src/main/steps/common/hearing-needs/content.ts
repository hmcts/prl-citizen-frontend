/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

export const en = () => ({
  caption: 'Reasonable adjustments',
  title: 'Let the court know if your support needs have changed',
  paragraph:
    'If your support needs have changed, you will need to get in touch with the court that is handling your case.',
  bulletHeading: 'You must:',
  bulletPoints: [
    'use GOV.UK to find <a  target="_blank" href="https://www.gov.uk/find-court-tribunal">contact details for the court</a>.',
    'contact the court by phone or email',
    'provide your name and case number',
    'explain to the court how your support needs have changed',
  ],
  paragraphs: [
    'If you are not sure which court is handling your case, see <a  target="_blank" href="/applicant/yourhearings/hearings">your court hearings</a>.',
    'The court will make arrangements and will be in touch with any further steps.',
  ],
});

export const cy = () => ({
  caption: 'Addasiadau rhesymol',
  title: 'Gadewch i’r llys wybod os yw’r cymorth rydych ei angen wedi newid',
  paragraph: 'Os yw’r cymorth rydych ei angen wedi newid, bydd angen ichi gysylltu â’r llys sy’n delio â’ch achos.',
  bulletHeading: 'Mae’n rhaid i chi:',
  bulletPoints: [
    'ddefnyddio GOV.UK i ddod o hyd i <a  target="_blank" href="https://www.gov.uk/chwilio-am-lys-neu-dribiwnlys">fanylion cyswllt y llys.</a>',
    'cysylltu â’r llys dros y ffôn neu drwy e-bost',
    'rhoi eich enw a rhif yr achos',
    'egluro i’r llys sut y mae’r cymorth rydych ei angen wedi newid',
  ],
  paragraphs: [
    'Os nad ydych yn siŵr pa lys sy’n delio â’ch achos, cyfeiriwch at <a  target=”_blank” href=”/applicant/yourhearings/hearings”>eich gwrandawiadau llys</a>.',
    'Bydd y llys yn gwneud y trefniadau ac yn cysylltu â chi i drafod unrhyw gamau pellach.',
  ],
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
