import axios from 'axios';
import randomInt from 'random-int';
import { User } from './user.interface';
import qs from 'qs';

const ixeeRegex = /ixee: (.*)}/;
const LOGIN_PATH = '/punch2.php';
const CHECKIN_CHECKOUT_PATH = '/punch3.php';

const BASE_PARAMS = {
  baseURL: 'https://checkin.timewatch.co.il/punch',
  headers: {
    Host: 'checkin.timewatch.co.il',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
    Referer: 'http://checkin.timewatch.co.il/punch/punch2.php',
    'Accept-Language': 'en-US,en;q=0.9,he;q=0.8,la;q=0.7',
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
};

interface LoginParams {
  comp: string;
  name: string;
  pw: string;
  'B1.x': string;
  'B1.y': string;
}

export const login = async user => {
  const client = axios.create(BASE_PARAMS);
  const params = qs.stringify(toLoginParams(user));
  const response = await client.post(LOGIN_PATH, params);
  const result = ixeeRegex.exec(response.data);
  if (!result || !result[1]) {
    throw new Error('Login Failed');
  }
  const ixee = result[1];
  return { client, ixee };
};

const toLoginParams = (user: User): LoginParams => ({
  comp: user.company,
  name: user.name,
  pw: user.password,
  'B1.x': randomInt(1, 30).toString(),
  'B1.y': randomInt(1, 30).toString(),
});
