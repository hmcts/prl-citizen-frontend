import Axios, { AxiosResponse } from 'axios';
import config from 'config';
import jwt_decode from 'jwt-decode';

import { PageLink } from '../../../steps/urls';
import { CosApiClient } from '../../case/CosApiClient';
import { CaseWithId } from '../../case/case';
import { AppRequest, UserDetails } from '../../controller/AppRequest';

export const getRedirectUrl = (serviceUrl: string, callbackUrlPageLink: PageLink): string => {
  const id: string = config.get('services.idam.clientID');
  const loginUrl: string = config.get('services.idam.authorizationURL');
  const callbackUrl = encodeURI(serviceUrl + callbackUrlPageLink);

  return `${loginUrl}?client_id=${id}&response_type=code&redirect_uri=${callbackUrl}`;
};

export const getUserDetails = async (
  serviceUrl: string,
  rawCode: string,
  callbackUrlPageLink: PageLink
): Promise<UserDetails> => {
  const id: string = config.get('services.idam.clientID');
  const secret: string = config.get('services.idam.citizenClientSecret');
  const tokenUrl: string = config.get('services.idam.tokenURL');
  const callbackUrl = encodeURI(serviceUrl + callbackUrlPageLink);
  console.log('id is: ' + id);
  console.log('secret is: ' + secret);
  console.log('tokenUrl is: ' + tokenUrl);
  console.log('callbackUrl is: ' + callbackUrl);

  const code = encodeURIComponent(rawCode);
  const data = `client_id=${id}&client_secret=${secret}&grant_type=authorization_code&redirect_uri=${callbackUrl}&code=${code}`;
  const headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };
  const response: AxiosResponse<OidcResponse> = await Axios.post(tokenUrl, data, { headers });
  const jwt = jwt_decode(response.data.id_token) as IdTokenJwtPayload;
  return {
    accessToken: response.data.access_token,
    id: jwt.uid,
    email: jwt.sub,
    givenName: jwt.given_name,
    familyName: jwt.family_name,
  };
};

export const getSystemUser = async (): Promise<UserDetails> => {
  const id: string = config.get('services.idam.clientID');
  const secret: string = config.get('services.idam.citizenClientSecret');
  const tokenUrl: string = config.get('services.idam.tokenURL');
  const systemUsername: string = config.get('services.idam.systemUsername');
  const systemPassword: string = config.get('services.idam.systemPassword');

  console.log('id is: ' + id);
  console.log('secret is: ' + secret);
  console.log('tokenUrl is: ' + tokenUrl);
  console.log('systemUsername is: ' + systemUsername);
  console.log('systemPassword is: ' + systemPassword);

  const headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };
  const data = `grant_type=password&username=${systemUsername}&password=${systemPassword}&client_id=${id}&client_secret=${secret}&scope=openid%20profile%20roles%20openid%20roles%20profile`;
  const response: AxiosResponse<OidcResponse> = await Axios.post(tokenUrl, data, { headers });
  const jwt = jwt_decode(response.data.id_token) as IdTokenJwtPayload;
  return {
    accessToken: response.data.access_token,
    id: jwt.uid,
    email: jwt.sub,
    givenName: jwt.given_name,
    familyName: jwt.family_name,
  };
};

export const getCaseDetails = async (req: AppRequest): Promise<CaseWithId[]> => {
  const cosApiClient = new CosApiClient(req.session.user.accessToken, 'http://localhost:3001');
  const response = await cosApiClient.retrieveCasesByUserId(req.session.user);
  console.log('******* got the response for case details')
  return response;
};

interface IdTokenJwtPayload {
  uid: string;
  sub: string;
  given_name: string;
  family_name: string;
  roles: string[];
}

export interface OidcResponse {
  id_token: string;
  access_token: string;
}
