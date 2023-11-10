import express, { Router, Request, Response } from 'express';

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseRouter: Router = express.Router();

exerciseRouter.post('/', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;


  const calculateExercises = (exercises: unknown, target: unknown): ExerciseResult => {
    if (target === undefined || exercises === undefined) {
      throw new Error('parameters missing');
    }
    const targetNumber: number = Number(target);
    const daily_exercises_number = exercises as number[];

    if (!(Number(targetNumber))) {
      throw new Error('malformatted parameters');
    }
    const hours: number[] = daily_exercises_number.map((hours: number) => Number(hours));
    const hasNaN = hours.some(Number.isNaN);
    if (hasNaN) {
      throw new Error('malformatted parameters');
    }
    const periodLength: number = hours.length;
    const trainingDays: number = hours.filter((hours: number) => hours > 0).length;
    const average: number = hours.reduce((acc: number, cur: number) => acc + cur) / periodLength;

    const success: boolean = average >= targetNumber;
    const poinst: number = average / targetNumber;

    const rating = (points: number): number => {
      if (points < 0.5) {
        return 1;
      } else if (points < 1) {
        return 2;
      } else {
        return 3;
      }
    };

    const ratingMessage = (rating: number): string => {
      if (rating === 1) {
        return 'bad';
      } else if (rating === 2) {
        return 'not too bad but could be better';
      } else {
        return 'god';
      }
    };

    return {
      periodLength,
      trainingDays,
      success,
      rating: rating(poinst),
      ratingDescription: ratingMessage(rating(poinst)),
      target: targetNumber,
      average
    };
  };

  try {
    const info = calculateExercises(daily_exercises, target);
    res.send(info);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.send({
        error: e.message
      });
    } else {
      res.send({
        error: 'Unknown error'
      });
    }
  }

});

export default exerciseRouter;