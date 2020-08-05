import { format } from 'date-fns';
import { User } from './user.interface';
import randomInt from 'random-int';
import {
  DynamicParams,
  LoginParams,
  UserAuth,
} from './watcher.params.interface';

enum CheckinStatus {
  Checkin = 'checking',
  Checkout = 'checkout',
}
export const BASE_CLIENT_PARAMS = {
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
const CONST_CHECKIN_STATUS_PARAMS = {
  allowremarks: '1',
  msgfound: '0',
  thetask: '0',
  teamleader: '0',
  speccomp: '',
  remark: '',
  tasks: '',
  taskdescr: '',
  prevtask: '0',
  prevtaskdescr: '',
  withtasks: '0',
};

const getDynamicCheckinStatusParams = (userAuth: UserAuth): DynamicParams => ({
  name: userAuth.user,
  comp: userAuth.company,
  ts: format(new Date(), '2006-01-02 15:04:05'),
  ix: userAuth.ixee,
});

const getCheckinStatusParams = (
  userAuth: UserAuth,
  checkinStatus: CheckinStatus
) => ({
  ...CONST_CHECKIN_STATUS_PARAMS,
  ...getDynamicCheckinStatusParams(userAuth),
  B1: checkinStatus === CheckinStatus.Checkin ? 'כניסה' : 'יציאה',
  tflag: checkinStatus === CheckinStatus.Checkin ? '' : '1',
});
export const getCheckinParams = (userAuth: UserAuth) =>
  getCheckinStatusParams(userAuth, CheckinStatus.Checkin);

export const getCheckoutParams = (userAuth: UserAuth) =>
  getCheckinStatusParams(userAuth, CheckinStatus.Checkout);

export const getLoginParams = (user: User): LoginParams => ({
  comp: user.company,
  name: user.name,
  pw: user.password,
  'B1.x': randomInt(1, 30).toString(),
  'B1.y': randomInt(1, 30).toString(),
});
