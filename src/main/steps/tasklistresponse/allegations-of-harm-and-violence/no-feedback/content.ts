import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { en as enContent } from '../../../common/safety-concerns/no-feedback/content';

console.info('** FOR SONAR **');

const en = enContent;

const cy = () => ({
  caption: 'Pryderon diogelwch',
  title: 'Diogelwch y plant',
  firstParagraph:
    "Mae‘r llys angen gwybod os oes unrhyw un o’r bobl eraill yn y cais hwn, neu unrhyw un sy’n gysylltiedig â nhw sydd â chysylltiad â'r plant, yn peri risg i ddiogelwch y plant",
  subHeading: 'Beth ddywedoch chi wrthym',
  bulletPoints: [
    'Rydych wedi dioddef neu mewn risg o ddioddef trais neu gamdriniaeth ddomestig ',
    'Nid yw’r plant wedi dioddef neu nid ydynt mewn risg o ddioddef trais neu gamdriniaeth ddomestig',
  ],
  paragraphs: [
    "Os yw plant yn gweld neu'n clywed rhywun arall yn cael ei drin yn wael, gall gael effaith arnynt. Hoffem ofyn ambell gwestiwn am ddiogelwch y plant",
    "Bydd eich atebion yn helpu'r llys i ystyried unrhyw risgiau i chi neu'r plant. Mae’r wybodaeth hon yn ffurfio rhan o’ch cais llys a bydd yn cael ei thrin yn gwbl sensitif",
    'Efallai y bydd yn anodd i chi ateb rhai o’r cwestiynau canlynol neu y byddant yn peri gofid i chi. Atebwch nhw y gorau y gallwch chi',
  ],
  signsOfChildAbuseHyperlinkLabel: 'Rhagor o wybodaeth am arwyddion o gam-drin plant',
  signsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
