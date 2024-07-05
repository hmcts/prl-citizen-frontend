import { TranslationFn } from '../../../../app/controller/GetController';
import { form as c100Form, languages } from '../../../common/safety-concerns/concerns-for-safety/content'
//import { FormFieldsFn } from '../../../../app/form/Form';
import { rest } from 'lodash';
import { YesOrNo } from '../../../../app/case/definition';
import { isFieldFilledIn } from '../../../../app/form/validation';

export const form = {...c100Form,
    fields:{
        ...rest,
        c1A_haveSafetyConcerns: {
                    type: 'radios',
                    classes: 'govuk-radios',
                    values: [
                      {
                        label: l => l.yesHaveSafetyConcerns,
                        value: YesOrNo.YES,
                        subFields: {
                          doYouHaveSafetyConcernsYesInfo: {
                            type: 'textAndHtml',
                            textAndHtml: l => l.infoSafetyConcernsYes,
                          },
                        },
                      },{
                                    label: l => l.noHaveSafetyConcerns,
                                    value: YesOrNo.NO,
                                  },
                                ],
                                validator: isFieldFilledIn,

    }},
    saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },}

export const generateContent: TranslationFn = content => {
    const translations = languages[content.language]();
    return {
      ...translations,
      form: { ...form },
    };
  };