import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUser: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUser = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to add an avatar in an existing user', async () => {
    const user = await fakeUsersRepository.create({
      email: 'a@a.a',
      name: 'jon',
      password: '123456',
    });

    const userUpdated = await updateUser.execute({
      user_id: user.id,
      avatar_filename: 'avatar.png',
    });

    expect(userUpdated.avatar).toBe('avatar.png');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUser.execute({
        user_id: 'invalid id',
        avatar_filename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating tha avatar from valid user', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      email: 'a@a.a',
      name: 'jon',
      password: '123456',
    });

    await updateUser.execute({
      user_id: user.id,
      avatar_filename: 'avatar.png',
    });

    await updateUser.execute({
      user_id: user.id,
      avatar_filename: 'outroAvatar.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
  });
});
