import { Respondent } from '../../../../../../app/case/definition';
import { SectionContent } from '../../../definitions';

import { CA_APPLICANT } from './ca_applicant';

describe('ca_applicant', () => {
  const data = {
    id: '12',
    caseTypeOfApplication: 'C100',
    respondents: [{} as Respondent],
  };

  test('ca applicant tasklist should have 6 sections', () => {
    expect(CA_APPLICANT).toHaveLength(6);
  });

  test('about you section should contain correct ids and tasks', () => {
    const aboutYouTasks = CA_APPLICANT[0].tasks(data, {} as SectionContent);

    expect(CA_APPLICANT[0].id).toBe('aboutYou');
    expect(aboutYouTasks).toHaveLength(4);
    expect(aboutYouTasks[0].id).toBe('editYouContactDetails');
    expect(aboutYouTasks[1].id).toBe('contactPreferences');
    expect(aboutYouTasks[2].id).toBe('keepYourDetailsPrivate');
    expect(aboutYouTasks[3].id).toBe('supportYouNeed');
  });

  test('your application section should contain correct ids and tasks', () => {
    const yourApplicationTasks = CA_APPLICANT[1].tasks(data, {} as SectionContent);

    expect(CA_APPLICANT[1].id).toBe('yourApplication');
    expect(yourApplicationTasks).toHaveLength(2);
    expect(yourApplicationTasks[0].id).toBe('childArrangementApplication');
    expect(yourApplicationTasks[1].id).toBe('yourApplicationPDF');
  });

  test('your documents section should contain correct ids and tasks', () => {
    const yourDocumentsTasks = CA_APPLICANT[2].tasks(data, {} as SectionContent);

    expect(CA_APPLICANT[2].id).toBe('yourDocuments');
    expect(yourDocumentsTasks).toHaveLength(4);
    expect(yourDocumentsTasks[0].id).toBe('uploadDocuments');
    expect(yourDocumentsTasks[1].id).toBe('viewAllDocuments');
    expect(yourDocumentsTasks[2].id).toBe('uploadDocuments');
    expect(yourDocumentsTasks[3].id).toBe('viewAllDocuments');
  });

  test('your orders section should contain correct ids and tasks', () => {
    const yourOrdersTasks = CA_APPLICANT[3].tasks(data, {} as SectionContent);

    expect(CA_APPLICANT[3].id).toBe('ordersFromTheCourt');
    expect(yourOrdersTasks).toHaveLength(1);
    expect(yourOrdersTasks[0].id).toBe('viewOrders');
  });

  test('the response section should contain correct ids and tasks', () => {
    const theResponseTasks = CA_APPLICANT[4].tasks(data, {
      heading: 'heading',
      tasks: {
        theResponsePDF: {
          linkText: 'link text',
        },
      },
    } as SectionContent);

    expect(CA_APPLICANT[4].id).toBe('theResponse');
    expect(theResponseTasks).toHaveLength(1);
    expect(theResponseTasks[0].id).toBe('theResponsePDF');
  });

  test('your hearing section should contain correct ids and tasks', () => {
    const yourHearingTasks = CA_APPLICANT[5].tasks(data, {} as SectionContent);

    expect(CA_APPLICANT[5].id).toBe('yourHearing');
    expect(yourHearingTasks).toHaveLength(1);
    expect(yourHearingTasks[0].id).toBe('viewHearingDetails');
  });
});
