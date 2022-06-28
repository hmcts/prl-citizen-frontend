import Axios, { AxiosResponse } from 'axios';
import config from 'config';
import jwt_decode from 'jwt-decode';

import { PageLink } from '../../../steps/urls';
import { UserDetails } from '../../controller/AppRequest';

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
  const id: string = 'prl-citizen-frontend';//'prl-cos-api'; //config.get('services.idam.clientID');
  const secret: string = 'GBFSEUMBUXTTDSSR';//config.get('services.idam.clientSecret');
  const tokenUrl: string = config.get('services.idam.tokenURL');
  const callbackUrl = encodeURI(serviceUrl + callbackUrlPageLink);
  const code = encodeURIComponent(rawCode);
  const data = `client_id=${id}&client_secret=${secret}&grant_type=authorization_code&redirect_uri=${callbackUrl}&code=${code}`;
  const headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };
  const response: AxiosResponse<OidcResponse> = await Axios.post(tokenUrl, data, { headers });
  const jwt = jwt_decode(response.data.id_token) as IdTokenJwtPayload;

  console.log("*****************************************************");
  console.log("29===GET USER DETAILS METHOD ===============");
  console.log("29===OIDC==id=====>"+id);
  console.log("29===OIDC==secret=====>"+secret);
  console.log("29===OIDC==tokenUrl=====>"+tokenUrl);
  console.log("29===OIDC==callbackUrl=====>"+callbackUrl);
  console.log("29===OIDC==data=====>"+data);
  console.log("29===OIDC==code=====>"+code);
  console.log("29===OIDC==headers=====>"+headers);
  console.log("29===OIDC==jwt=====>"+jwt);
  console.log("29===RESPONSE FROM SERVER getUserDetails =====>"+JSON.stringify(response.data));
  console.log("*****************************************************");

  return {
    accessToken: response.data.access_token,
    id: jwt.uid,
    email: jwt.sub,
    givenName: jwt.given_name,
    familyName: jwt.family_name,
  };
};

export const getSystemUser = async (): Promise<UserDetails> => {
  const id: string = 'prl-cos-api'//config.get('services.idam.clientID');
  const secret: string = config.get('services.idam.clientSecret');
  const tokenUrl: string = config.get('services.idam.tokenURL');
  const systemUsername: string = config.get('services.idam.systemUsername');
  const systemPassword: string = config.get('services.idam.systemPassword');
  const headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };
  const data = `grant_type=password&username=${systemUsername}&password=${systemPassword}&client_id=${id}&client_secret=${secret}&scope=openid%20profile%20roles%20openid%20roles%20profile`;
  const response: AxiosResponse<OidcResponse> = await Axios.post(tokenUrl, data, { headers });
  const jwt = jwt_decode(response.data.id_token) as IdTokenJwtPayload;

  console.log("##########################################################");
  console.log("9999===GET SYSTEM USER METHOD===============");
  console.log("9999===OIDC==id=====>"+id);
  console.log("9999===OIDC==secret=====>"+secret);
  console.log("9999===OIDC==tokenUrl=====>"+tokenUrl);
  console.log("9999===OIDC==systemUsername=====>"+systemUsername);
  console.log("9999===OIDC==systemPassword=====>"+systemPassword);
  console.log("9999===OIDC==headers=====>"+headers);
  console.log("9999===OIDC==data=====>"+data);
  console.log("9999===OIDC==jwt=====>"+jwt);
  console.log("9999===OIDC==responsedata=====>"+JSON.stringify(response.data));
  console.log("##########################################################");

  return {
    accessToken: response.data.access_token,
    id: jwt.uid,
    email: jwt.sub,
    givenName: jwt.given_name,
    familyName: jwt.family_name,
  };
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
