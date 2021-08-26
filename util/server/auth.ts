import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import qs from 'querystring';
import { hasProperty } from 'util/type';

export const oAuthRequest = (
  endpoint: string,
  payload: Record<string, unknown>
) =>
  fetch(process.env.NEXT_PUBLIC_LOGIN_URL + endpoint, {
    method: 'post',
    body: qs.stringify({
      client_id: process.env.OAUTH_ID,
      client_secret: process.env.OAUTH_SECRET,
      ...payload,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

export const tokenNeedsRefresh = (accessToken: string) => {
  const tokenPayload = jwt.decode(accessToken);
  if (typeof tokenPayload === 'string' || !tokenPayload?.exp) return null;

  return dayjs().add(30, 'minute').isAfter(dayjs.unix(tokenPayload.exp));
};

export const refreshAccountData = async (accountData: {
  accessToken?: string;
  refreshToken?: string;
  [key: string]: unknown;
}) => {
  const { accessToken, refreshToken } = accountData;
  const newAccountData: Record<string, unknown> = {};

  if (!accessToken || !refreshToken)
    throw new Error('Missing current tokens for refresh');

  if (!tokenNeedsRefresh(accessToken)) return accountData;

  await oAuthRequest('/token', {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  })
    .then((response) => response.json())
    .then((data: unknown) => {
      if (
        !hasProperty(data, 'access_token') ||
        !hasProperty(data, 'refresh_token')
      )
        throw new Error('Missing new tokens for refresh');

      newAccountData.accessToken = data.access_token;
      newAccountData.refreshToken = data.refresh_token;
    });

  return {
    ...accountData,
    ...newAccountData,
  };
};

export const revokeToken = async (accessToken?: string) =>
  oAuthRequest('/token/revocation', {
    token: accessToken,
    token_type_hint: 'access_token',
  });
