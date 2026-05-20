import { PageContent } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getPeople } from '../../../../steps/c100-rebuild/child-details/live-with/utils';
import { interpolate } from '../../../../steps/common/string-parser';
import { C100_URL } from '../../../../steps/urls';
import { CommonContent } from '../../../common/common.content';

const en = {
  c100: {
    title: "Keeping {name}'s details safe",
    pageTitle: "Keeping applicant's details safe",
    understandSafety:
      "We understand how important it is to feel safe, and know that {name}'s details will be kept private.",
    detailsKeptConfidential:
      'The court will hold this information securely and will not share it with anyone else except the Children and Family Court Advisory and Support Service (Cafcass), Cafcass Cymru, or the local authority, if they are involved in your case, unless it is by order of the court.',
    helpKeepDetailsPrivate:
      "To help us to keep {name}'s details safe, do not include their details in any other communications during the case.",
  },
  applicantRespondent: {
    title: 'Keeping your details safe',
    pageTitle: "Keeping other person's details safe",
    understandSafety:
      'We understand how important it is to feel safe, and know that your details will be kept private.',
    detailsKeptConfidential:
      'The court will hold this information securely and will not share it with anyone else except the Children and Family Court Advisory and Support Service (Cafcass), Cafcass Cymru, or the local authority, if they are involved in your case, unless it is by order of the court.',
    helpKeepDetailsPrivate:
      'To help us to keep your details safe, do not include them in any other communications during the case.',
  },
  continue: 'Continue',
  cancel: 'Cancel',
};

const cy: typeof en = {
  c100: {
    title: 'Cadw manylion {name} yn ddiogel',
    pageTitle: 'Cadw manylion y ceisydd yn ddiogel',
    understandSafety:
      'Rydym yn deall pa mor bwysig yw hi i deimlo’n ddiogel, a gwybod y bydd manylion {name} yn cael eu cadw’n breifat.',
    detailsKeptConfidential:
      "Bydd y llys yn cadw'r wybodaeth hon yn ddiogel ac ni fydd yn ei rhannu ag unrhyw un ac eithrio Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd (Cafcass), Cafcass Cymru, neu'r awdurdod lleol, os ydynt yn ymwneud â'ch achos, oni bai ei fod trwy orchymyn y llys.",
    helpKeepDetailsPrivate:
      'Er mwyn ein helpu ni i gadw manylion {name} yn ddiogel, peidiwch â chynnwys eu manylion mewn unrhyw gyfathrebiadau eraill yn ystod yr achos.',
  },
  applicantRespondent: {
    title: 'Cadw eich manylion yn ddiogel',
    pageTitle: 'Cadw manylion y person arall yn ddiogel',
    understandSafety:
      'Rydym yn deall pa mor bwysig yw hi i deimlo’n ddiogel, a gwybod y bydd eich manylion yn cael eu cadw’n breifat.',
    detailsKeptConfidential:
      "Bydd y llys yn cadw'r wybodaeth hon yn ddiogel ac ni fydd yn ei rhannu ag unrhyw un ac eithrio Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd (Cafcass), Cafcass Cymru, neu'r awdurdod lleol, os ydynt yn ymwneud â'ch achos, oni bai ei fod trwy orchymyn y llys.",
    helpKeepDetailsPrivate:
      "Er mwyn ein helpu ni i gadw eich manylion yn ddiogel, peidiwch â'u cynnwys mewn unrhyw gyfathrebiadau eraill yn ystod yr achos.",
  },
  continue: 'Parhau',
  cancel: 'Canslo',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent = (content: CommonContent): PageContent => {
  const translations = languages[content.language];
  const c100Person = getPeople(content.userCase!).find(person => person.id === content.additionalData?.req.params.id);
  const C100rebuildJourney = content.additionalData?.req?.originalUrl?.startsWith(C100_URL);

  delete form.saveAndComeLater;
  if (C100rebuildJourney) {
    Object.assign(form, {
      saveAndComeLater: {
        text: l => l.saveAndComeLater,
      },
    });
  }

  return {
    ...translations,
    title: C100rebuildJourney
      ? interpolate(translations.c100.title, {
          name: `${c100Person?.firstName} ${c100Person?.lastName}`,
        })
      : translations.applicantRespondent.title,
    pageTitle: C100rebuildJourney
      ? interpolate(translations.c100.pageTitle, {
          name: `${c100Person?.firstName} ${c100Person?.lastName}`,
        })
      : translations.applicantRespondent.pageTitle,
    understandSafety: C100rebuildJourney
      ? interpolate(translations.c100.understandSafety, {
          name: `${c100Person?.firstName} ${c100Person?.lastName}`,
        })
      : translations.applicantRespondent.understandSafety,
    detailsKeptConfidential: C100rebuildJourney
      ? interpolate(translations.c100.detailsKeptConfidential, {
          name: `${c100Person?.firstName} ${c100Person?.lastName}`,
        })
      : translations.applicantRespondent.detailsKeptConfidential,
    helpKeepDetailsPrivate: C100rebuildJourney
      ? interpolate(translations.c100.helpKeepDetailsPrivate, {
          name: `${c100Person?.firstName} ${c100Person?.lastName}`,
        })
      : translations.applicantRespondent.helpKeepDetailsPrivate,
    form,
  };
};
