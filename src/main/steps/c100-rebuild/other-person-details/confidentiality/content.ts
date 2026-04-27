import { CaseWithId } from '../../../../app/case/case';
import { C100RebuildPartyDetails, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { interpolate } from '../../../../steps/common/string-parser';
import { getPartyDetails } from '../../../c100-rebuild/people/util';

export const en = {
  title: 'Keeping {firstName} {lastName}’s identity private',
  pageTitle: "Keeping other person's identity private",
  line1: 'The information you give us will be shared with the other people named in this application.',
  line2:
    'As you have told us that {childName} mainly {livesWith} {firstName} {lastName}, you can choose to keep {firstName} {lastName}’s identity private. This includes their address.',
  keepDetailsPrivate:
    'Do you want to keep {firstName} {lastName}’s identity private from the other people named in the application?',
  yes: 'Yes',
  no: 'No',
  errors: {
    confidentiality: {
      required: 'Select yes if you want to keep {firstName} {lastName}’s identity private',
    },
  },
};

export const cy: typeof en = {
  title: 'Cadw manylion cyswllt {firstName} {lastName} yn gyfrinachol',
  pageTitle: 'Cadw hunaniaeth y person arall yn breifat',
  line1: 'Bydd yr wybodaeth a ddarperir gennych yn cael ei rhannu â’r bobl eraill yn y cais hwn.',
  line2:
    'Gan eich bod wedi dweud wrthym fod {childName} yn {livesWith} yn bennaf gyda {firstName} {lastName}, gallwch ddewis cadw hunaniaeth {firstName} {lastName} yn breifat. Mae hyn yn cynnwys eu cyfeiriad.',
  keepDetailsPrivate:
    'Ydych chi eisiau cadw hunaniaeth {firstName} {lastName} yn breifat oddi wrth y bobl eraill a enwir yn y cais?',
  yes: 'Oes',
  no: 'Nac oes',
  errors: {
    confidentiality: {
      required: 'Dewiswch ydw os ydych eisiau cadw manylion {firstName} {lastName} yn breifat',
    },
  },
};

const languages = {
  en,
  cy,
};

let updatedForm: FormContent;

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...form.fields,
    },
  };

  return updatedForm;
};

export const generateFormFields = (confidential: YesOrNo): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };

  const fields = {
    confidentiality: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.keepDetailsPrivate,
      labelSize: 's',
      values: [
        { label: l => l.yes, value: YesOrNo.YES, selected: confidential === YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO, selected: confidential === YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
    },
  };

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const getFormFields = (
  caseData: Partial<CaseWithId>,
  otherPersonId: C100RebuildPartyDetails['id']
): FormContent => {
  const otherPerson = getPartyDetails(otherPersonId, caseData?.oprs_otherPersons) as C100RebuildPartyDetails;

  if (!otherPerson) {
    return updateFormFields(form, generateFormFields(YesOrNo.NO).fields);
  }

  const isConfidential =
    otherPerson?.isOtherPersonAddressConfidential === YesOrNo.YES
      ? YesOrNo.YES
      : otherPerson?.isOtherPersonAddressConfidential ?? YesOrNo.NO;

  return updateFormFields(form, generateFormFields(isConfidential).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const otherPersonId = content.additionalData?.req.params.otherPersonId;
  const userCase = content.userCase ?? {};

  const otherPerson = getPartyDetails(otherPersonId, userCase.oprs_otherPersons) as C100RebuildPartyDetails;
  const { firstName, lastName } = otherPerson;

  const children = userCase.cd_children ?? [];

  const childrenWhoLiveWithPerson = children.filter(child => {
    const childrenMainlyLiveWith = child.mainlyLiveWith as
      | string
      | string[]
      | Record<string, unknown>
      | Record<string, unknown>[];

    if (!childrenMainlyLiveWith) {
      return false;
    }

    if (Array.isArray(childrenMainlyLiveWith)) {
      return childrenMainlyLiveWith.some(mainlyLiveWith =>
        typeof mainlyLiveWith === 'string'
          ? mainlyLiveWith === otherPersonId
          : (mainlyLiveWith as Record<string, unknown>)?.id === otherPersonId
      );
    }
    if (typeof childrenMainlyLiveWith === 'object') {
      return childrenMainlyLiveWith?.id === otherPersonId;
    }

    return childrenMainlyLiveWith === otherPersonId;
  });
  const childNames = childrenWhoLiveWithPerson.map(child => `${child.firstName} ${child.lastName}`);

  let childNameStr: string;
  if (childNames.length === 1) {
    childNameStr = childNames[0];
  } else if (childNames.length === 2) {
    // Exactly two children: "A and B"
    childNameStr = `${childNames[0]} and ${childNames[1]}`;
  } else {
    // Three or more: "A, B and C"
    const allButLast = childNames.slice(0, -1).join(', ');
    const last = childNames[childNames.length - 1];
    childNameStr = `${allButLast} and ${last}`;
  }

  const isPlural = childrenWhoLiveWithPerson.length > 1;
  const language = content.language as string;

  const verbMapping = {
    en: { singular: 'lives with', plural: 'live with' },
    cy: { singular: 'byw', plural: 'byw' },
  };

  const livesWith = isPlural ? verbMapping[language].plural : verbMapping[language].singular;

  const isConfidential =
    otherPerson?.isOtherPersonAddressConfidential === YesOrNo.YES
      ? YesOrNo.YES
      : otherPerson?.isOtherPersonAddressConfidential ?? YesOrNo.NO;

  return {
    ...translations,
    title: interpolate(translations.title, { firstName, lastName }),
    line2: interpolate(translations.line2, {
      childName: childNameStr,
      livesWith,
      firstName,
      lastName,
    }),
    keepDetailsPrivate: interpolate(translations.keepDetailsPrivate, { firstName, lastName }),
    errors: {
      ...translations.errors,
      confidentiality: {
        ...translations.errors.confidentiality,
        required: interpolate(translations.errors.confidentiality.required, { firstName, lastName }),
      },
    },
    form: updateFormFields(form, generateFormFields(isConfidential).fields),
  };
};
