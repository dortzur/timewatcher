import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import * as AxiosLogger from 'axios-logger';
import {
  BASE_CLIENT_PARAMS,
  CheckinStatus,
  getCheckinStatusParams,
  getLoginParams,
} from './watcher.params';
import { User } from './user.interface';
import { Injectable } from '@nestjs/common';

const authTokenRegex = /ixee: (.*)}/;
const LOGIN_PATH = '/punch2.php';
const CHECKIN_STATUS_PATH = '/punch3.php';
AxiosLogger.setGlobalConfig({ headers: true });

const createClient = () => {
  const client = axios.create(BASE_CLIENT_PARAMS);
  if (process.env.DEBUG_AXIOS) {
    client.interceptors.request.use(AxiosLogger.requestLogger);
    client.interceptors.response.use(AxiosLogger.responseLogger);
  }

  return client;
};
const login = async (user: User) => {
  const client = createClient();
  const params = qs.stringify(getLoginParams(user));
  const response = await client.post(LOGIN_PATH, params, {
    withCredentials: true,
  });
  const cookies = response.headers['set-cookie'].join(';');
  const result = authTokenRegex.exec(response.data);
  if (!result || !result[1]) {
    throw new Error('Login Failed');
  }
  const authToken = result[1];
  return { client, cookies, authToken };
};

const changeCheckinStatus = async (user: User, status: CheckinStatus) => {
  const { client, cookies, authToken } = await login(user);
  const params = getCheckinStatusParams(user, authToken, status);
  return client.post(CHECKIN_STATUS_PATH, qs.stringify(params), {
    withCredentials: true,
    headers: { Cookie: cookies },
  });
};

@Injectable()
export class WatcherClient {
  checkin = (user: User) => changeCheckinStatus(user, CheckinStatus.Checkin);
  checkout = (user: User) => changeCheckinStatus(user, CheckinStatus.Checkout);
}
