import { CheckinClient } from './watcher.client';

jest.setTimeout(10000);

describe('Watcher Client', () => {
  it('tests do Login', async () => {
    const client = new CheckinClient({
      company: '4266',
      name: '82',
      password: 'Dor',
    });
    const result = await client.checkin();
    await new Promise((resolve, reject) => {
      setTimeout(async () => {
        await client.checkout();
        resolve();
      }, 2000);
    });
  });
});
