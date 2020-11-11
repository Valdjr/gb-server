import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointent = this.appointments.find(a => isEqual(a.date, date));
    return findAppointent;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
