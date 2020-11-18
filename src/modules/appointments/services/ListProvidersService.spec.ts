import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'a@a.a',
      name: 'jon a',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'b@b.b',
      name: 'jon b',
      password: '123456',
    });

    const logged = await fakeUsersRepository.create({
      email: 'logged@logged.com',
      name: 'logged',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      except_user_id: logged.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
