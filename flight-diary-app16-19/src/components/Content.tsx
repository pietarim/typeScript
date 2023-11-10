import React from "react";
import { DiaryEntry } from "../types";

interface ContentProps {
  diaries: DiaryEntry[];
}

const Content: React.FC<ContentProps> = ({ diaries }) => {
  return (
    <div>
      <h1>Diaries</h1>
      <ul style={{ padding: '0' }}>
        {diaries.map(diary => (
          <li style={{ listStyle: 'none' }} key={diary.id}>
            <h2>{diary.date}</h2>
            <p>{diary.visibility}</p>
            <p>{diary.weather}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Content;