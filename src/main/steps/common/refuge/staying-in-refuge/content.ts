import { CaseWithId } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { PageContent } from '../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getPeople } from '../../../../steps/c100-rebuild/child-details/live-with/utils';
import { interpolate } from '../../../../steps/common/string-parser';
import { C100_URL } from '../../../../steps/urls';
import { CommonContent } from '../../../common/common.content';
export * from './routeGuard';

const en = {
  title: 'Staying in a refuge',
  refuge:
    'A refuge is a secure place for people and their children to stay when they are escaping domestic abuse. It provides a space to feel safe and supported.',
  citizensAdvice:
    'Find out more about refuges at <a href="https://www.citizensadvice.org.uk/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Citizen\'s Advice">Citizen\'s Advice (opens in a new tab).</a>',
  refugeLabel: 'Do you currently live in a refuge?',
  C100RefugeLabel: 'Does {firstName} {lastName} currently live in a refuge?',
  one: 'Yes',
  two: 'No',
  continue: 'Continue',
  errors: {
    isCitizenLivingInRefuge: {
      required: 'Select yes if you currently live in a refuge',
    },
  },
};

const cy: typeof en = {
  title: 'Aros mewn lloches',
  refuge:
    'Mae lloches yn lle diogel i bobl a’u plant aros pan fyddant yn dianc rhag cam-drin domestig. Mae’n darparu lle i deimlo’n ddiogel a chael cefnogaeth.',
  citizensAdvice:
    'Dysgwch fwy am lochesau yn <a href="https://www.citizensadvice.org.uk/" class="govuk-link" target="_blank" aria-label="Dysgwch fwy am lochesau yn Cyngor ar Bopeth (yn agor mewn tab newydd).">Cyngor ar Bopeth (yn agor mewn tab newydd).</a>',
  refugeLabel: 'Ydych chi’n byw mewn lloches ar hyn o bryd?',
  C100RefugeLabel: 'A yw {firstName} {lastName} yn byw mewn lloches ar hyn o bryd?',
  one: 'Ydw',
  two: 'Nac ydw',
  continue: 'Parhau',
  errors: {
    isCitizenLivingInRefuge: {
      required: "Dewiswch ydw os ydych chi'n byw mewn lloches ar hyn o bryd",
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (userCase: Partial<CaseWithId>, req: AppRequest): FormFields => {
    const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL);
    const c100Person = getPeople(userCase).find(person => person.id === req.params.id)!;
    return {
      isCitizenLivingInRefuge: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l =>
          C100rebuildJourney
            ? interpolate(l.C100RefugeLabel, { firstName: c100Person?.firstName, lastName: c100Person?.lastName })
            : l.refugeLabel,
        labelSize: 'm',
        values: [
          {
            label: l => l.one,
            value: YesOrNo.YES,
          },
          {
            label: l => l.two,
            value: YesOrNo.NO,
          },
        ],
        validator: isFieldFilledIn,
      },
    };
  },
  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent = (content: CommonContent): PageContent => {
  const translations = languages[content.language];
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
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.additionalData?.req) },
  };
};
