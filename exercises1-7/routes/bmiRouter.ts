import express, { Request, Response } from 'express';

const bmiRouter = express.Router();

bmiRouter.get('/', (req: Request, res: Response) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmiNumber = Number(weight) / Math.pow(Number(height) / 100, 2);
    const getBmi = (bmiNumber: number): string => {
      if (bmiNumber < 18.5) {
        return 'Underweight';
      } else if (bmiNumber >= 18.5 && bmiNumber < 25) {
        return 'Normal (healthy weight)';
      } else if (bmiNumber >= 25 && bmiNumber < 30) {
        return 'Overweight';
      } else {
        return 'Obese';
      }
    };

    const bmi = getBmi(bmiNumber);

    res.send({
      weight,
      height,
      bmi
    });
  } else {
    res.send({
      error: 'malformatted parameters'
    });
  }
});

export default bmiRouter;