import ICreateNOtificationDTO from '../dtos/ICreateNOtificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNOtificationDTO): Promise<Notification>;
}
