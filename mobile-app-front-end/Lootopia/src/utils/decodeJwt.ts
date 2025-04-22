import {jwtDecode} from 'jwt-decode';

export type TokenPayload = {
  activeHuntId: number;
  sub: number;
  email: string;
  role: string;
  type: string;
  exp: number;
};

export const decodeJwt = (token: string): TokenPayload => {
  return jwtDecode<TokenPayload>(token);
};
