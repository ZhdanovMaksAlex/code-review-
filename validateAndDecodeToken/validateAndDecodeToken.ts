import { jwtDecode, JwtPayload } from 'jwt-decode';
import { MyAxios } from '@services/SettingAxios';
import { ServiceCookies } from '@services/ServiceCookies';
import { checkedValidateToken } from '@sharedHelpers/checkedValidateToken';
import { NoToken } from '@app/exceptions/NoToken';

export interface ReturnValidateToken extends JwtPayload {
  phone: string;
  email: string;
  id: number
}

export interface JWTType {
  token: string;
  refresh_token: string
}

export const validateAndDecodeToken = async(): Promise<ReturnValidateToken | null> => {
  try {
    if (!ServiceCookies.jwtAccess || !ServiceCookies.jwtRefresh) {
      throw new NoToken();
    }
    const isValid = checkedValidateToken();
    if (!isValid) {
      const response = await MyAxios.post<{data: JWTType}>('/api/auth/refresh', {}, {
        headers: {
          [ServiceCookies.JWT_HEADER]: ServiceCookies.jwtRefresh,
        }
      });
      const data = response.data?.data;
      ServiceCookies.updateJWTTokens(data.token, data.refresh_token, false);
      return jwtDecode<ReturnValidateToken>(data.token);
    }

    return jwtDecode<ReturnValidateToken>(ServiceCookies.jwtAccess);
  } catch (error) {
    ServiceCookies.jwtAccess &&
    ServiceCookies.jwtRefresh &&
    console.log('@error checkedValidateToken', error);
    ServiceCookies.removeJWTTokens();
    return null;
  }
};
