/* eslint-disable jest/expect-expect */
import { YesNoNotsure } from '../../../../app/case/definition';
import { languageAssertions } from '../../test/languageAssertions';

import { Radios } from './radios';

const fieldName = 'birthFatherNameOnCertificate';

const enContent = {
  section: 'Section',
  label: "Is the birth father's name on the birth certificate?",
  hint: "Ask the Private Law court if you're not sure.",
  yes: 'Yes',
  no: 'No',
  unsure: 'Not sure',
  continue: 'Save and continue',
  saveAsDraft: 'Save as draft',
};

const cyContent = {
  section: 'Section (in Welsh)',
  label: "Is the birth father's name on the birth certificate? (in Welsh)",
  hint: "Ask the adoption agency or social worker if you're not sure. (in Welsh)",
  yes: 'Yes (in Welsh)',
  no: 'No (in Welsh)',
  unsure: 'Not sure (in Welsh)',
  continue: 'Save and continue (in Welsh)',
  saveAsDraft: 'Save as draft (in Welsh)',
};

const values = [
  { key: 'yes', value: YesNoNotsure.YES },
  { key: 'no', value: YesNoNotsure.NO },
  { key: 'unsure', value: YesNoNotsure.NOT_SURE },
];

const { generateContent } = new Radios({
  enContent,
  cyContent,
  fieldName,
  values,
  label: 'label',
  hint: 'hint',
});

describe('steps > common > component', () => {
  it('should return correct English content', () => {
    languageAssertions('en', enContent, generateContent);
  });

  it('should return correct Welsh content', () => {
    languageAssertions('cy', cyContent, generateContent);
  });
});
