import express, { Request, Response } from 'express';
import exerciseRouter from './routes/exerciseRoute';
import bmiRouter from './routes/bmiRouter';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.use('/exercises', exerciseRouter);
app.use('/bmi', bmiRouter);

app.use('/api/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});