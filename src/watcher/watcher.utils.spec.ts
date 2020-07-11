import { toFormData } from './watcher.utils';
import FormData from 'form-data';

describe('Watcher Client', () => {
  it('should be defined', () => {
    const result = toFormData({
      'B1.x': '12',
      'B1.y': '13',
      name: '42',
      pw: 'baba',
      comp: '4266',
    });
    expect(result).toBeInstanceOf(FormData);
  });
});
