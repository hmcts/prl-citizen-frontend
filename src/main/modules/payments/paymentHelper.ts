import { getTokenFromApi } from '../../app/auth/service/get-service-auth-token';
import { AppRequest } from '../../app/controller/AppRequest';

/* A type that is used to define the shape of the object that is returned from the function. */
type ISystemCredentailsToApiData = {
  Authorization: string;
  ServiceAuthorization: string;
  returnUrL: string;
  caseId: string;
  applicantCaseName: string;
};

/* The class is used to get the data needed to make a payment to the api */
export class PaymentHelper {
  SystemCredentailsToApiData = async (req: AppRequest): Promise<ISystemCredentailsToApiData> => {
    const { id } = req.session.userCase;
    const { accessToken } = req.session.user;
    const returnURL = '/reciever/callback';
    let token = '';
    try {
      const ServiceAuthToken = await getTokenFromApi();
      token = ServiceAuthToken;
    } catch (error) {
      console.log(error);
    }
    return {
      Authorization: accessToken,
      ServiceAuthorization: token,
      returnUrL: returnURL,
      caseId: id,
      applicantCaseName: '',
    };
  };
}
