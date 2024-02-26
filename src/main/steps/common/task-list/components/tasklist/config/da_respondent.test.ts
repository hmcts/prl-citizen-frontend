import { Respondent } from '../../../../../../app/case/definition';
import { SectionContent } from '../../../definitions';

import { DA_RESPONDENT } from './da_respondent';

describe('da_respondent', () => {
  const data = {
    id: '12',
    caseTypeOfApplication: 'C100',
    respondents: [{} as Respondent],
  };

  test('da respondent tasklist should have 5 sections', () => {
    expect(DA_RESPONDENT).toHaveLength(5);
  });

  test('about you section should contain correct ids and tasks', () => {
    const aboutYouTasks = DA_RESPONDENT[0].tasks(data, {} as SectionContent);

    expect(DA_RESPONDENT[0].id).toBe('aboutYou');
    expect(aboutYouTasks).toHaveLength(3);
    expect(aboutYouTasks[0].id).toBe('keepYourDetailsPrivate');
    expect(aboutYouTasks[1].id).toBe('editYouContactDetails');
    expect(aboutYouTasks[2].id).toBe('yourSupport');
  });

  test('the application section should contain correct ids and tasks', () => {
    const theApplicationTasks = DA_RESPONDENT[1].tasks(data, {} as SectionContent);

    expect(DA_RESPONDENT[1].id).toBe('theApplication');
    expect(theApplicationTasks).toHaveLength(1);
    expect(theApplicationTasks[0].id).toBe('checkTheApplication');
  });

  test('your hearing section should contain correct ids and tasks', () => {
    const yourHearingTasks = DA_RESPONDENT[2].tasks(data, {} as SectionContent);

    expect(DA_RESPONDENT[2].id).toBe('yourHearing');
    expect(yourHearingTasks).toHaveLength(1);
    expect(yourHearingTasks[0].id).toBe('viewHearingDetails');
  });

  test('your documents section should contain correct ids and tasks', () => {
    const yourDocumentsTasks = DA_RESPONDENT[3].tasks(data, {} as SectionContent);

    expect(DA_RESPONDENT[3].id).toBe('yourDocuments');
    expect(yourDocumentsTasks).toHaveLength(2);
    expect(yourDocumentsTasks[0].id).toBe('viewAllDocuments');
    expect(yourDocumentsTasks[1].id).toBe('uploadDocuments');
  });

  test('your orders section should contain correct ids and tasks', () => {
    const yourOrdersTasks = DA_RESPONDENT[4].tasks(data, {} as SectionContent);

    expect(DA_RESPONDENT[4].id).toBe('ordersFromTheCourt');
    expect(yourOrdersTasks).toHaveLength(1);
    expect(yourOrdersTasks[0].id).toBe('viewOrders');
  });
});
