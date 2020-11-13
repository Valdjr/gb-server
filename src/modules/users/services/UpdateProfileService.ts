import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
export default class UpdateProfileService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('HashProvider')
    storageProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = storageProvider;
  }

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const checkEmailUser = await this.usersRepository.findByEmail(email);

    if (checkEmailUser && checkEmailUser.id !== user_id) {
      throw new AppError('This email already in use');
    }

    user.name = name;
    user.email = email;

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Wrong old password.');
      }

      user.password = await this.hashProvider.generateHash(password);
    } else if (password && !old_password) {
      throw new AppError('You need inform an old passowrd.');
    }

    return this.usersRepository.save(user);
  }
}
