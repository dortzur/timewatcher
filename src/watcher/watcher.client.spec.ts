import { login } from './watcher.client';
import { UserDto } from './user.dto';
jest.setTimeout(10000);

describe('Watcher Client', () => {
  it('tests nothing', async () => {
    const baba = await login(new UserDto('4266', '82', 'Dor'));
    console.log('BABA', baba);
  });
});
