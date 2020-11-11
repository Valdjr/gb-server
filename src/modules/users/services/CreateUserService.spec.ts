import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'john doe',
      email: 'a@a.a',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing email', async () => {
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

    expect(
      createUserService.execute({
        name: 'john doe',
        email: 'a@a.a',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
