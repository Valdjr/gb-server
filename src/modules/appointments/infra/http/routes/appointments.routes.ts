import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticate);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
