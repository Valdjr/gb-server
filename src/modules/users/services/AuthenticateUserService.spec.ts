import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
    await fakeUsersRepository.create({
      name: 'john doe',
      email: 'a@a.a',
      password: '123456',
    });

    const res = await authenticateUserService.execute({
      email: 'a@a.a',
      password: '123456',
    });

    expect(res).toHaveProperty('token');
  });

  it('should not be able to authenticate an user within an invalid user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'a@a.a',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user within an invalid password', async () => {
    await fakeUsersRepository.create({
      name: 'john doe',
      email: 'a@a.a',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'a@a.a',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
