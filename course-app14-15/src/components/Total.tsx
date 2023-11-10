import { CoursePart } from '../types';

const Total = ({ courseParts }: { courseParts: CoursePart[]; }) => {
  return (
    <div style={{ marginTop: '10px' }}>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  );
};

export default Total;