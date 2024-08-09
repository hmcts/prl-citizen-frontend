import { Respondent } from '../../../../../../app/case/definition';
import { SectionContent } from '../../../definitions';

import { DA_APPLICANT } from './da_applicant';

describe('da_applicant', () => {
  const data = {
    id: '12',
    caseTypeOfApplication: 'C100',
    respondents: [{} as Respondent],
  };

  test('da applicant tasklist should have 5 sections', () => {
    expect(DA_APPLICANT).toHaveLength(5);
  });

  test('about you section should contain correct ids and tasks', () => {
    const aboutYouTasks = DA_APPLICANT[0].tasks(data, {} as SectionContent);

    expect(DA_APPLICANT[0].id).toBe('aboutYou');
    expect(aboutYouTasks).toHaveLength(3);
    expect(aboutYouTasks[0].id).toBe('keepYourDetailsPrivate');
    expect(aboutYouTasks[1].id).toBe('editYouContactDetails');
    expect(aboutYouTasks[2].id).toBe('supportYouNeed');
  });

  test('your application section should contain correct ids and tasks', () => {
    const yourApplicationTasks = DA_APPLICANT[1].tasks(data, {} as SectionContent);

    expect(DA_APPLICANT[1].id).toBe('yourApplication');
    expect(yourApplicationTasks).toHaveLength(2);
    expect(yourApplicationTasks[0].id).toBe('yourApplicationPDF');
    expect(yourApplicationTasks[1].id).toBe('yourApplicationWelshPDF');
  });

  test('your hearing section should contain correct ids and tasks', () => {
    const yourHearingTasks = DA_APPLICANT[2].tasks(data, {} as SectionContent);

    expect(DA_APPLICANT[2].id).toBe('yourHearing');
    expect(yourHearingTasks).toHaveLength(1);
    expect(yourHearingTasks[0].id).toBe('viewHearingDetails');
  });

  test('your documents section should contain correct ids and tasks', () => {
    const yourDocumentsTasks = DA_APPLICANT[3].tasks(data, {} as SectionContent);

    expect(DA_APPLICANT[3].id).toBe('yourDocuments');
    expect(yourDocumentsTasks).toHaveLength(2);
    expect(yourDocumentsTasks[0].id).toBe('uploadDocuments');
    expect(yourDocumentsTasks[1].id).toBe('viewAllDocuments');
  });

  test('your orders section should contain correct ids and tasks', () => {
    const yourOrdersTasks = DA_APPLICANT[4].tasks(data, {} as SectionContent);

    expect(DA_APPLICANT[4].id).toBe('ordersFromTheCourt');
    expect(yourOrdersTasks).toHaveLength(1);
    expect(yourOrdersTasks[0].id).toBe('viewOrders');
  });
});
