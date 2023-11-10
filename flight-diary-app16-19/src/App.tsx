import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { DiaryEntry } from './types';
import Content from './components/Content';
import Header from './components/Header';
import AddDiaryEntry from './components/AddDiaryEntry';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/diaries').then(response => {
      setDiaries(response.data);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <AddDiaryEntry diaries={diaries} setDiaries={setDiaries} />
      <Content diaries={diaries} />
    </div>
  );
}

export default App;
