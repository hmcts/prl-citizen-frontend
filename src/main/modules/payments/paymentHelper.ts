import { getTokenFromApi } from '../../app/auth/service/get-service-auth-token';
import { AppRequest } from '../../app/controller/AppRequest';
import { PAYMENT_RETURN_URL } from '../../steps/urls';

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
    let { caseId } = req.session.userCase;
    const { accessToken } = req.session.user;
    const returnURL = `${req.protocol}://${req.headers.host}${PAYMENT_RETURN_URL}`;
    let token = '';
    caseId = caseId + '';
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
      caseId,
      applicantCaseName: 'Test',
    };
  };
}
