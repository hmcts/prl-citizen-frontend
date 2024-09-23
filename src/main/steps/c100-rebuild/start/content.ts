import _ from 'lodash';

import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { interpolate } from '../../../steps/common/string-parser';

export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = {
  caption: 'Getting started',
  title: 'Before you start your application',
  content1:
    'If you are currently involved in Child Arrangements, Prohibited Steps or Specific Issue Order proceedings for the same child or children you can apply to the same court using the shorter form C2. You need to state the case number when you submit the form',
  content2:
    'You can <a href="https://www.gov.uk/government/publications/form-c2-application-for-permission-to-start-proceedings-for-an-order-or-directions-in-existing-proceedings-to-be-joined-as-or-cease-to-be-a-part" class="govuk-link" target="_blank" rel="external">submit form C2 (opens in new tab)</a> to the same court if you are involved in any of the following:',
  list: [
    {
      content: 'child arrangements application',
    },
    {
      content: 'prohibited steps order',
    },
    {
      content: 'specific issue order',
    },
  ],
  content3: 'Check you have the right documents ready',
  content4: 'Your application will be processed faster if you have the following information available:',
  list2: [
    {
      content:
        'a signed document confirming you have already attended a Mediation Information and Assessment meeting (MIAM) – unless you have a <a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank" rel="external">valid reason not to (opens in a new tab)</a>',
    },
    {
      content:
        'a written and signed agreement with the other person in the case (the ‘respondent’) if you are applying for a consent order',
    },
    {
      content: 'your help with fees reference number if you have one',
    },
  ],
  content5: 'You can save your application and upload later if you do not have this information.',
  content6:
    'You will need to pay the court fee of £{applicationFee} before your application can be processed. You may be able to <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank" rel="external">get help with this payment (opens in a new tab)</a>.',
  startNow: 'Start now',
};

const cy: typeof en = {
  caption: 'Cychwyn arni',
  title: 'Cyn i chi ddechrau eich cais',
  content1:
    "Os ydych chi ar hyn o bryd yn gysylltiedig ag achos sy’n ymwneud â Threfniadau Plant, Camau Gwaharddedig neu Orchymyn Materion Penodol ar gyfer yr un plentyn neu blant gallwch wneud cais i’r un llys gan ddefnyddio ffurflen fyrrach C2. Mae angen i chi nodi rhif yr achos pan fyddwch yn cyflwyno'r ffurflen",
  content2:
    'Gallwch <a href="https://www.gov.uk/government/publications/form-c2-application-for-permission-to-start-proceedings-for-an-order-or-directions-in-existing-proceedings-to-be-joined-as-or-cease-to-be-a-part" class="govuk-link" target="_blank" rel="external">gyflwyno ffurflen C2 (yn agor mewn tab newydd)</a> i’r un llys os ydych chi’n ymwneud â’r canlynol:',
  list: [
    {
      content: 'cais trefniadau plant',
    },
    {
      content: 'gorchymyn camau gwaharddedig',
    },
    {
      content: 'gorchymyn mater penodol',
    },
  ],
  content3: 'Gwiriwch fod gennych y dogfennau cywir yn barod',
  content4: 'Bydd eich cais yn cael ei brosesu’n gyflymach os yw’r wybodaeth ganlynol gennych wrth law:',
  list2: [
    {
      content:
        'dogfen wedi’i llofnodi yn cadarnhau eich bod eisoes wedi mynychu Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM) - oni bai fod gennych <a href="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank" rel="external">reswm dilys dros beidio â mynychu (yn agor mewn tab newydd) </a>',
    },
    {
      content:
        'cytundeb ysgrifenedig wedi’i lofnodi gyda’r unigolyn arall yn yr achos (yr ‘atebydd’) os ydych chi’n gwneud cais am orchymyn cydsynio',
    },
    {
      content: 'eich cyfeirnod Help i Dalu Ffioedd os oes gennych un ',
    },
  ],
  content5: 'Gallwch gadw eich cais a’i uwchlwytho yn ddiweddarach os nad yw’r wybodaeth hon gennych wrth law.',
  content6:
    'Bydd angen i chi dalu ffi llys o £{applicationFee} cyn y gellir prosesu eich cais. Efallai y gallwch <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank" rel="external">gael help i dalu’r ffi hon (yn agor mewn tab newydd)</a>.',
  startNow: 'Dechrau nawr',
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    classes: 'govuk-!-margin-top-6',
    text: l => l.startNow,
    isStartButton: true,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const applicationFee = _.get(content, 'userCase.c100ApplicationFees', '');

  return {
    ...translations,
    isFeeAvailable: !!applicationFee,
    content6: interpolate(translations.content6, {
      applicationFee,
    }),
    form,
  };
};
