import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import * as AxiosLogger from 'axios-logger';
import { BASE_CLIENT_PARAMS, CheckinStatus, getCheckinStatusParams, getLoginParams } from './watcher.params';
import { User } from './user.interface';

const authTokenRegex = /ixee: (.*)}/;
const LOGIN_PATH = '/punch2.php';
const CHECKIN_STATUS_PATH = '/punch3.php';
AxiosLogger.setGlobalConfig({ headers: true });

export class CheckinClient {
  constructor(user: User) {
    this.user = user;
    this.client = axios.create(BASE_CLIENT_PARAMS);
    if (process.env.NODE_ENV !== 'production') {
      this.client.interceptors.request.use(AxiosLogger.requestLogger);
      this.client.interceptors.response.use(AxiosLogger.responseLogger);
    }
  }

  readonly user: User;

  readonly client: AxiosInstance;

  #authToken: string;
  #cookies: [string];
  #login = async () => {
    if (!this.user || !this.user.company || !this.user.name || !this.user.password) throw new Error('User must be fully defined');
    const params = qs.stringify(getLoginParams(this.user));
    const response = await this.client.post(LOGIN_PATH, params, { withCredentials: true });

    this.#cookies = response.headers['set-cookie'].join(';');
    const result = authTokenRegex.exec(response.data);
    if (!result || !result[1]) {
      throw new Error('Login Failed');
    }
    this.#authToken = result[1];
  };

  checkin = async () => this.#changeStatus(CheckinStatus.Checkin);
  checkout = async () => this.#changeStatus(CheckinStatus.Checkout);

  #changeStatus = async (status: CheckinStatus) => {
    await this.#login();
    const params = getCheckinStatusParams(this.user, this.#authToken, status);
    return this.client.post(CHECKIN_STATUS_PATH, qs.stringify(params), { withCredentials: true, headers: { Cookie: this.#cookies } });
  };
}



