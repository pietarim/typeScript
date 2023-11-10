import express, { Request, Response } from 'express';
import patientRouter from './routes/patientRouter';
import diagnosesRouter from './routes/diagnosisRouter';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});