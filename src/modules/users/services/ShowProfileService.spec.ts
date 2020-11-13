import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show an user profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'a@a.a',
      name: 'jon',
      password: '123456',
    });

    const userUpdated = await showProfile.execute({
      user_id: user.id,
    });

    expect(userUpdated.name).toBe('jon');
    expect(userUpdated.email).toBe('a@a.a');
  });

  it('should be not able to show an user profile from non existing user ', async () => {
    await expect(
      showProfile.execute({
        user_id: 'xxxxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
