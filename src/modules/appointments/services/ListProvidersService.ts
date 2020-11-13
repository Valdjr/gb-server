import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  except_user_id: string;
}

@injectable()
export default class ListProvidersService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ except_user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders(except_user_id);

    return users;
  }
}
