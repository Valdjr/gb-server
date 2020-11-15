import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNOtificationDTO from '@modules/notifications/dtos/ICreateNOtificationDTO';
import Notification from '../schemas/Notification';

export default class NotificationsRepository
  implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNOtificationDTO): Promise<Notification> {
    const notifications = this.ormRepository.create({
      content,
      recipient_id,
    });
    await this.ormRepository.save(notifications);
    return notifications;
  }
}
