import React, { useState } from "react";
import { addDiaryEntry } from "../diaryService";
import { Weather, Visibility, DiaryEntry } from "../types";

interface AddDiaryEntryProps {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaries: DiaryEntry[];
}

const AddDiaryEntry: React.FC<AddDiaryEntryProps> = ({ setDiaries, diaries }) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (weather === null || visibility === null) {
      setError("Please select weather and visibility");
      setTimeout(() => {
        setError("");
      }
        , 5000);
      return;
    }
    const newDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };
    addDiaryEntry(newDiaryEntry).then((returnedDiaryEntry) => {
      if (returnedDiaryEntry === null) {
        setError("Invalid response from server");
        setTimeout(() => {
          setError("");
        }, 5000);
        return;
      }
      else {
        const savedDiaryEntry = returnedDiaryEntry;
        setDiaries([...diaries, savedDiaryEntry]);
        setDate("");
        setWeather(null);
        setVisibility(null);
        setComment("");
      }
    }).catch((error) => {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 5000);
    });
  };

  return (<div>
    <h1>Add a Diary Entry</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <form onSubmit={handleSubmit}>
      <div>
        <label>date</label>
        <input type="date" id="date" value={date} onChange={({ target }) => setDate(target.value)} />
      </div>
      <div>
        <div>
          <label style={{ marginRight: "4px" }}>visibility</label>
          <label>good</label>
          <input type="radio" id="visibility1" value={Visibility.Good} checked={visibility === Visibility.Good} onChange={({ target }) => setVisibility(target.value as Visibility)} />
          <label>ok</label>
          <input type="radio" id="visibility2" value={Visibility.Ok} checked={visibility === Visibility.Ok} onChange={({ target }) => setVisibility(target.value as Visibility)} />
          <label>bad</label>
          <input type="radio" id="visibility3" value={Visibility.Bad} checked={visibility === Visibility.Bad} onChange={({ target }) => setVisibility(target.value as Visibility)} />
        </div>
        <label style={{ marginRight: "4px" }}>weather</label>
        <label>sunny</label>
        <input type="radio" id="weather1" value={Weather.Sunny} checked={weather === Weather.Sunny} onChange={({ target }) => setWeather(target.value as Weather)} />
        <label>rainy</label>
        <input type="radio" id="weather3" value={Weather.Rainy} checked={weather === Weather.Rainy} onChange={({ target }) => setWeather(target.value as Weather)} />
        <label>cloudy</label>
        <input type="radio" id="weather2" value={Weather.Cloudy} checked={weather === Weather.Cloudy} onChange={({ target }) => setWeather(target.value as Weather)} />
        <label>stormy</label>
        <input type="radio" id="weather4" value={Weather.Stormy} checked={weather === Weather.Stormy} onChange={({ target }) => setWeather(target.value as Weather)} />
        <label>windy</label>
        <input type="radio" id="weather5" value={Weather.Windy} checked={weather === Weather.Windy} onChange={({ target }) => setWeather(target.value as Weather)} />
      </div>
      <div>
        <label>comment</label>
        <input id="comment" value={comment} onChange={({ target }) => setComment(target.value)} />
      </div>
      <button type="submit">add</button>
    </form>
  </div>);
};

export default AddDiaryEntry;