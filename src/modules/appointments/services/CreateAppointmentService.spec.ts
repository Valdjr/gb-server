import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '12331231',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12331231');
  });

  it('should not be able to create two appointment in the same date', async () => {
    const date = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date,
      provider_id: '12331231',
    });

    expect(
      createAppointmentService.execute({
        date,
        provider_id: '12331231',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
