import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
//import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',
  title: 'Cannot access a mediator',
  lines: 'Depending on your reason why you cannot attend a MIAM, you might need to provide evidence.',
  subtitle: 'Why can you not access a mediator?',
  noAppointmentAvailable:
    'You are unable to attend a MIAM online or by video link because the  mediators contacted are unable to conduct a MIAM within 15 business days of the date of contact.',
  evidenceHint:
    'You will need to provide evidence you’ve contacted at least 5 mediators within 15 miles of where you live.',
  giveDetails: 'Give details of the mediators you’ve contacted',
  giveDetailsHint:
    'Include the names, addresses, telephone numbers or e-mail addresses for the mediators and when you contacted them.',
  disability:
    'You have a disability or other inability that prevents you from attending a MIAM in person, online or by video link, and the contacted mediators are unable to provide appropriate facilities for you to attend.',
  noMediatorIn15mile:
    'There is no mediator within 15 miles of your home and you cannot attend the MIAM online or by video link.',
  explain: 'Explain why you cannot attend a MIAM',
  inPrison:
    'You are in prison or any other institution and there are no facilities for you to attend a MIAM online or by video link.',
  bailThatPreventContact: 'You are subject to conditions of bail that prevent contact with the other person.',
  releaseFromPrisonOnLicence:
    'You have been released from prison on licence, and you have a non-contact licence condition which includes someone who is a party to the application',
  noneOfTheAbove: 'None of these',
  errors: {
    miam_noMediatorReasons: {
      required: 'Select why you cannot access a mediator',
    },
    miam_noAppointmentAvailableDetails: {
      required: 'Give details of the mediators you’ve contacted',
    },
    miam_unableToAttainDueToDisablityDetails: {
      required: 'Give details of the mediators you’ve contacted',
    },
    miam_noMediatorIn15mileDetails: {
      required: 'Give details of the mediators you’ve contacted',
    },
  },
};

const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Ni allwch gael mynediad at gyfryngwr',
  lines: 'Gan ddibynnu ar eich rheswm pam na allwch chi fynychu MIAM, efallai y bydd angen i chi ddarparu tystiolaeth.',
  subtitle: 'Pam na allwch chi gael mynediad at gyfryngwr?',
  noAppointmentAvailable:
    'Ni allwch fynychu MIAM ar-lein neu drwy gyswllt fideo oherwydd ni all y cyfryngwyr y bu ichi gysylltu â nhw gynnal MIAM o fewn 15 diwrnod busnes i ddyddiad y cyswllt.',
  evidenceHint:
    'Bydd angen i chi ddarparu tystiolaeth eich bod wedi cysylltu ag o leiaf 5 cyfryngwr o fewn 15 milltir i ble rydych yn byw.',
  giveDetails: 'Rhowch fanylion y cyfryngwyr rydych wedi cysylltu â nhw',
  giveDetailsHint:
    'Dylech gynnwys enwau, cyfeiriadau, rhifau ffôn neu gyfeiriadau e-bost y cyfryngwyr a pha bryd y gwnaethoch gysylltu â nhw',
  disability:
    'Mae gennych anabledd neu analluogrwydd arall sy’n eich atal rhag mynychu MIAM yn bersonol, ar-lein neu drwy gyswllt fideo, ac ni all y cyfryngwyr y bu ichi gysylltu â nhw ddarparu cyfleusterau i chi fynychu.',
  noMediatorIn15mile:
    'Nid oes yna gyfryngwr o fewn 15 milltir i’ch cartref ac ni allwch fynychu MIAM ar-lein neu drwy gyswllt fideo.',
  explain: 'Eglurwch pam na allwch chi fynychu MIAM',
  inPrison:
    'Rydych yn y carchar neu mewn unrhyw fath arall o sefydliad ac nid oes yna gyfleusterau i chi fynychu MIAM ar-lein neu drwy gyswllt fideo.',
  bailThatPreventContact: 'Rydych yn destun amodau mechniaeth sy’n eich atal rhag cysylltu â’r unigolyn arall.',
  releaseFromPrisonOnLicence:
    'Rydych wedi cael eich rhyddhau o’r carchar ar drwydded, ac mae gennych amod dim cysylltu ar eich trwydded sy’n cynnwys rhywun sy’n barti i’r cais',
  noneOfTheAbove: 'Dim un o’r rhain',
  errors: {
    miam_noMediatorReasons: {
      required: 'Dewiswch pam na allwch chi gael mynediad at gyfryngwr',
    },
    miam_noAppointmentAvailableDetails: {
      required: 'Rhowch fanylion y cyfryngwyr rydych wedi cysylltu â nhw',
    },
    miam_unableToAttainDueToDisablityDetails: {
      required: 'Rhowch fanylion y cyfryngwyr rydych wedi cysylltu â nhw',
    },
    miam_noMediatorIn15mileDetails: {
      required: 'Rhowch fanylion y cyfryngwyr rydych wedi cysylltu â nhw',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('miam should contain miam other reasons content', () => {
  let form;
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain miam other reasons field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const miam_noMediatorReasons_field = fields.miam_noMediatorReasons as FormOptions;
    expect(miam_noMediatorReasons_field.type).toBe('radios');
    expect((miam_noMediatorReasons_field.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.noAppointmentAvailable
    );
    expect((miam_noMediatorReasons_field.values[1].label as LanguageLookup)(generatedContent)).toBe(en.disability);
    expect((miam_noMediatorReasons_field.values[0].hint as LanguageLookup)(generatedContent)).toBe(en.evidenceHint);
    expect(
      (miam_noMediatorReasons_field.values[0].subFields?.miam_noAppointmentAvailableDetails.label as Function)(
        generatedContent
      )
    ).toBe(en.giveDetails);
    expect(
      (miam_noMediatorReasons_field.values[0].subFields?.miam_noAppointmentAvailableDetails.hint as Function)(
        generatedContent
      )
    ).toBe(en.giveDetailsHint);
    expect((miam_noMediatorReasons_field.values[1].hint as LanguageLookup)(generatedContent)).toBe(en.evidenceHint);
    expect((miam_noMediatorReasons_field.values[1].hint as LanguageLookup)(generatedContent)).toBe(en.evidenceHint);
    expect(
      (miam_noMediatorReasons_field.values[1].subFields?.miam_unableToAttainDueToDisablityDetails.label as Function)(
        generatedContent
      )
    ).toBe(en.giveDetails);
    expect(
      (miam_noMediatorReasons_field.values[1].subFields?.miam_unableToAttainDueToDisablityDetails.hint as Function)(
        generatedContent
      )
    ).toBe(en.giveDetailsHint);
    expect((miam_noMediatorReasons_field.values[2].label as LanguageLookup)(generatedContent)).toBe(
      en.noMediatorIn15mile
    );
    expect(
      (miam_noMediatorReasons_field.values[2].subFields?.miam_noMediatorIn15mileDetails.label as Function)(
        generatedContent
      )
    ).toBe(en.explain);
    expect(
      (miam_noMediatorReasons_field.values[2].subFields?.miam_noMediatorIn15mileDetails.hint as Function)(
        generatedContent
      )
    ).toBe(en.explain);
    expect((miam_noMediatorReasons_field.values[3].label as LanguageLookup)(generatedContent)).toBe(en.inPrison);
    expect((miam_noMediatorReasons_field.values[4].label as LanguageLookup)(generatedContent)).toBe(
      en.bailThatPreventContact
    );
    expect((miam_noMediatorReasons_field.values[5].label as LanguageLookup)(generatedContent)).toBe(
      en.releaseFromPrisonOnLicence
    );
    expect((miam_noMediatorReasons_field.values[7].label as LanguageLookup)(generatedContent)).toBe(en.noneOfTheAbove);

    (miam_noMediatorReasons_field.validator as Validator)('localAuthority');
    expect(isFieldFilledIn).toHaveBeenCalledWith('localAuthority');
  });
  test('should contain Continue and save and comeback later button', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    form = generatedContent.form as FormContent;
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
