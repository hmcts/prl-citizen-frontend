import { YesOrNo } from '../../../../app/case/definition'
import { TranslationFn } from 'app/controller/GetController';
import { languages,form as responseForm } from '../../../common/safety-concerns/concerns-for-safety/content'
import { isFieldFilledIn } from '../../../../app/form/validation'
import { rest } from 'lodash'

export const form = {...responseForm,
  fields:{
      ...rest,
      PRL_c1A_haveSafetyConcerns: {
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

  }},}

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form: { ...form },
  };
}; 