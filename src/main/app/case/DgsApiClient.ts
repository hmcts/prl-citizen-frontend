import { getServiceAuthToken } from 'app/auth/service/get-service-auth-token';
import { UserDetails } from 'app/controller/AppRequest';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import { CaseWithId } from './case';
import { CaseData } from './definition';
import { fromApiFormat } from './from-api-format';


export class DgsApiClient {
    client: AxiosInstance;

    constructor(authToken: string, readonly returnUrl: string) {
        this.client = Axios.create({
          baseURL: config.get('services.dgs.url'),
          headers: {
            Authorization: 'Bearer ' + authToken,
            serviceAuthorization: getServiceAuthToken(),
            'return-url': returnUrl,
          },
        });
      }

      public async generatePdf(
        user: UserDetails,
        caseId: string,
        data: Partial<CaseData>,
        eventId: string
      ): Promise<CaseWithId> {
        data.applicantCaseName = 'Legend';
        try {
          const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.accessToken,
            serviceAuthorization: getServiceAuthToken(),
          };
          const response: AxiosResponse<CaseWithId> = await Axios.post(
            config.get('services.dgs.url') + `/version/1/generateDraftPDF`,
            data,
            { headers }
          );
    
          return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data) };
        } catch (err) {
          throw new Error('Case could not be updated.');
        }
      }
}