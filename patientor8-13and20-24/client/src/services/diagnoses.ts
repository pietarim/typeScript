import axios from 'axios';
import { Diagnose } from '../types';

const baseUrl = 'http://localhost:3001/api/diagnoses';

type DiagnoseData = Awaited<Promise<Diagnose[]>>;

export const getAll = async (): Promise<Diagnose[]> => {
  const response = await axios.get<DiagnoseData>(baseUrl);
  return response.data;
};