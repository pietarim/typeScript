import axios, { AxiosError } from 'axios';
import { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaryEntries = async () => {
  return axios.get<DiaryEntry[]>(baseUrl).then(response => {
    response.data;
  });
};

export const addDiaryEntry = async (newDiaryEntry: NewDiaryEntry) => {
  return axios.post<NewDiaryEntry>(baseUrl, newDiaryEntry).then(response => {
    const newDiary = response.data as DiaryEntry;
    return newDiary;
  }).catch((e: AxiosError) => {
    throw e.response?.data || 'Unknown Error';
  });
};