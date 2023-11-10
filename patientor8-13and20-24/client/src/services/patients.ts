import axios from "axios";
import { Patient, NewPatientEntry } from "../types";

import { apiBaseUrl } from "../constants";

type PatientFields = Awaited<Promise<Patient>>;

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: NewPatientEntry) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<PatientFields>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};


export default {
  getAll, create, getOne
};

