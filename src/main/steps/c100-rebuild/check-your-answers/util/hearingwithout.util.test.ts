import { hearingDetailsContents } from './hearingwithout.util';

describe('test cases for hearing details contents', () => {
  test('english', () => {
    expect(hearingDetailsContents('en')).toStrictEqual({
      doYouNeedAWithoutNoticeHearingLabel:
        'Are you asking for a without notice hearing because the other person or people may do something that would obstruct the order you are asking for if they knew about the application?',
      doYouRequireAHearingWithReducedNoticeHint:
        'This may be relevant in cases of exceptional urgency where the order is needed to prevent a threatened wrongful act. In some cases you may still be expected to have tried to give informal notice for example by telephone, text message, or email.',
      doYouRequireAHearingWithReducedNoticeLabel:
        'Are you asking for a without notice hearing because there is literally no time to give notice of the application to the other person or people?',
      errors: '',
      hearing2title: 'Details of without notice hearing',
      hearingWithoutLine1: 'Give details of why you’re asking for a without notice hearing',
      hint: 'A judge will need to be sure that there is a good reason why the other people in the application should not be told about the application before the hearing takes place.',
      one: 'Yes',
      provideDetails: 'Provide details',
      title: 'Details of without notice hearing',
      two: 'No',
    });
  });
  test('notenglish', () => {
    expect(hearingDetailsContents('cy')).toStrictEqual({
      doYouNeedAWithoutNoticeHearingLabel:
        'Are you asking for a without notice hearing because the other person or people may do something that would obstruct the order you are asking for if they knew about the application? - welsh',
      doYouRequireAHearingWithReducedNoticeHint:
        'This may be relevant in cases of exceptional urgency where the order is needed to prevent a threatened wrongful act. In some cases you may still be expected to have tried to give informal notice for example by telephone, text message, or email. - welsh',
      doYouRequireAHearingWithReducedNoticeLabel:
        'Are you asking for a without notice hearing because there is literally no time to give notice of the application to the other person or people? - welsh',
      hearing2title: 'Details of without notice hearing - welsh',
      errors: '',
      hearingWithoutLine1: 'Give details of why you’re asking for a without notice hearing - welsh',
      hint: 'A judge will need to be sure that there is a good reason why the other people in the application should not be told about the application before the hearing takes place. - welsh',
      one: 'Yes - welsh',
      provideDetails: 'Provide details -welsh',
      title: 'Details of without notice hearing',
      two: 'No - welsh',
    });
  });
});
