import express, { Request, Response } from 'express';
import { returnPatients, addPatient, returnPatient } from '../controller/patient';

const patientRouter = express.Router();

patientRouter.get('/:id', (req: Request, res: Response) => {
  returnPatient(req, res);
});

patientRouter.get('/', (_req: Request, res: Response) => {
  returnPatients(res);
});

patientRouter.post('/', (req: Request, res: Response) => {
  addPatient(req, res);
});

export default patientRouter;