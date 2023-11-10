import express, { Request, Response } from 'express';
import { diagnoses } from '../data/diagnose';
import { Diagnose } from '../types';

const diagnosisRouter = express.Router();

diagnosisRouter.get('/', (_req: Request, res: Response) => {
  const diagnosesToSend: Array<Diagnose> = diagnoses;
  res.send(diagnosesToSend);
}
);

export default diagnosisRouter;