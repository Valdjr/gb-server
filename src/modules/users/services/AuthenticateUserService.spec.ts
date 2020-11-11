import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate an user', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'john doe',
      email: 'a@a.a',
      password: '123456',
    });

    const authenticateUserService = new AuthenticateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    const res = await authenticateUserService.execute({
      email: 'a@a.a',
      password: '123456',
    });

    expect(res).toHaveProperty('token');
  });

  it('should not be able to authenticate an user within an invalid user', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUserService.execute({
        email: 'a@a.a',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user within an invalid password', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'john doe',
      email: 'a@a.a',
      password: '123456',
    });

    const authenticateUserService = new AuthenticateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUserService.execute({
        email: 'a@a.a',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
