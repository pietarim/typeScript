interface UserInfo {
  hours: number[];
  target: number;
}

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseInfo: Array<string>): ExerciseResult => {

  const getHoursAndTarget = (args: Array<string>): UserInfo => {
    if (args.length < 4) throw new Error('Not enough arguments');
    args.slice(2,).forEach((arg: string) => {
      if (isNaN(Number(arg))) {
        throw new Error('Provided values were not numbers!');
      }
    });
    const numberArgs = args.slice(2,).map((arg: string) => Number(arg));
    const hours: number[] = numberArgs.slice(1,);
    const target: number = numberArgs[numberArgs.length - 1];
    return { hours, target };
  };

  const { hours, target } = getHoursAndTarget(exerciseInfo);

  const numberOfDays: number = hours.length;
  const numberOfTrainingDays: number = hours.filter((hours: number) => hours > 0).length;
  const averageTrainingHours: number = hours.reduce((acc: number, cur: number) => acc + cur) / numberOfDays;
  const targetReached: boolean = averageTrainingHours >= target;
  const poinst: number = averageTrainingHours / target;

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
    periodLength: numberOfDays,
    trainingDays: numberOfTrainingDays,
    success: targetReached,
    rating: rating(poinst),
    ratingDescription: ratingMessage(rating(poinst)),
    target,
    average: averageTrainingHours
  };
};

console.log(calculateExercises(process.argv));