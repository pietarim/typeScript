import { Request, Response } from 'express';
import { patients } from '../data/patient';
import { NonSensitivePatient, Patient, Gender } from '../types';
import { v1 as uuid } from 'uuid';

let patientList: Array<Patient> = patients;

export const returnPatients = (res: Response) => {
  const nonSensitivePatients: NonSensitivePatient[] = patientList.map(patient => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, entries, ...nonSensitivePatient } = patient;
    return nonSensitivePatient;
  });
  res.send(nonSensitivePatients);
};

export const returnPatient = (req: Request, res: Response) => {
  const id = req.params.id;
  const patient = patientList.find(patient => patient.id === id);

  if (typeof patient !== 'undefined') {
    res.send(patient);
  } else {
    res.send('Not found');
  }
};

export const addPatient = (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, occupation, dateOfBirth, gender, ssn } = req.body;

  if (!name || !occupation || !dateOfBirth || !gender) {
    return res.send({
      error: 'parameters missing'
    });
  }

  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
  };

  const parseString = (text: unknown): string => {
    if (!text || !isString(text)) {
      throw new Error('Incorrect or missing text');
    }
    return text;
  };

  const parseGender = (gender: unknown) => {
    if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect gender');
    }
    return gender;
  };

  const newPatient = {
    name: parseString(name),
    ssn: parseString(ssn),
    occupation: parseString(occupation),
    dateOfBirth: parseString(dateOfBirth),
    gender: parseGender(gender),
    id: uuid(),
    entries: []
  };
  patientList = patientList.concat(newPatient);
  return res.send(newPatient);
};