import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'a@a.a',
      name: 'jon',
      password: '123456',
    });

    const userUpdated = await updateProfile.execute({
      user_id: user.id,
      name: 'maria',
      email: 'b@b.b',
    });

    expect(userUpdated.name).toBe('maria');
    expect(userUpdated.email).toBe('b@b.b');
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'a@a.a',
      name: 'jon',
      password: '123456',
    });

    const userUpdated = await updateProfile.execute({
      user_id: user.id,
      name: 'maria',
      email: 'b@b.b',
      old_password: '123456',
      password: '123123',
    });

    expect(userUpdated.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'a@a.a',
      name: 'jon',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'maria',
        email: 'b@b.b',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'a@a.a',
      name: 'jon',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'maria',
        email: 'b@b.b',
        old_password: 'xxxxxx',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able change the email if it is already in use', async () => {
    await fakeUsersRepository.create({
      email: 'd@d.d',
      name: 'UserWithEmail',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      email: 'a@a.a',
      name: 'User',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'maria',
        email: 'd@d.d',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to update an user profile from non existing user ', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'xxxxxx',
        name: 'maria',
        email: 'd@d.d',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
