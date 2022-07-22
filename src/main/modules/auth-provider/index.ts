import { initAuthToken } from '../../app/auth/service/get-service-auth-token';

export class AuthProvider {
  public enable(): void {
    initAuthToken();
  }
}
