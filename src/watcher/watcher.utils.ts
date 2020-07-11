// import randomInt from 'random-int';
import FormData from 'form-data';
// import { User } from './user.interface';

export const toFormData = (data: Record<string, any>): FormData =>
  Object.entries(data).reduce((form: FormData, [key, value]) => {
    form.append(key, value);
    return form;
  }, new FormData());
