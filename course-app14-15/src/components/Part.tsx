import { CoursePart } from '../types';
import '../index.css';

let requirments: string[] = [];

const Part = ({ part }: { part: CoursePart; }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div className='partBlock'>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div className='partBlock'>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div className='partBlock'>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>{part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      requirments = part.requirements.map((req, i) => {
        if (i === part.requirements.length - 1) {
          return req;
        }
        return req + ", ";
      });

      return (
        <div className='partBlock'>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>required skills: {requirments.map(r => <li key={r} style={{ display: "inline" }}>{r}</li>)}</p>
        </div>
      );
    default:
      return null;
  }
};

export default Part;