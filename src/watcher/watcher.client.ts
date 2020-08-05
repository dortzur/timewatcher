import axios from 'axios';
import qs from 'qs';

import { BASE_CLIENT_PARAMS, getLoginParams } from './watcher.params';

const ixeeRegex = /ixee: (.*)}/;
const LOGIN_PATH = '/punch2.php';
const CHECKIN_CHECKOUT_PATH = '/punch3.php';

export const login = async user => {
  const client = axios.create(BASE_CLIENT_PARAMS);
  const params = qs.stringify(getLoginParams(user));
  const response = await client.post(LOGIN_PATH, params);
  const result = ixeeRegex.exec(response.data);
  if (!result || !result[1]) {
    throw new Error('Login Failed');
  }
  const ixee = result[1];
  return { client, ixee };
};
