import { useState, useEffect } from "react";
import { Patient, Diagnose } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import Male from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Gender } from "../../types";
import { getAll } from "../../services/diagnoses";
import patientService from "../../services/patients";

interface Props {
  patientId: string | undefined | null;
}

const OnePatientPage = ({ patientId }: Props): JSX.Element => {
  const [diagnoseLibrary, setDiagnoseLibrary] = useState<Diagnose[]>([]);
  const [patient, setPatient] = useState<Patient | null | undefined>(null);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await getAll();
      setDiagnoseLibrary(diagnoses);
      if (!patientId) {
        setPatient(null);
      } else {
        const patientData = await patientService.getOne(patientId);
        setPatient(patientData);
      }
    };
    void fetchDiagnoses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (patient === null || patient === undefined) {
    return <div></div>;
  }

  console.log(patient);

  const renderIcon = (gender: Gender) => {
    if (gender === Gender.Female) {
      return (
        <FemaleIcon fontSize="large" className="icons" />
      );
    } else if (gender === Gender.Male) {
      return (
        <Male fontSize="large" className="icons" />
      );
    } else {
      return (
        <TransgenderIcon fontSize="large" className="icons" />
      );
    }
  };

  const renderBasicInfo = (patient: Patient) => {
    return (
      <div>
        <h2 style={{ display: "inline-block" }}>{patient.name}</h2>
        {renderIcon(patient.gender)}
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
      </div>
    );
  };

  if (patient.entries.length === 0) {
    return (
      <div>
        {renderBasicInfo(patient)}
        <p>No entries</p>
      </div>
    );
  } else {
    const formattedEntries = patient.entries.map(e => {
      if (e.diagnosisCodes === undefined) {
        return (
          <div key={e.id}>
            <p>{e.date} {e.description}</p>
          </div>
        );
      } else if (e.diagnosisCodes) {
        const diagnoseCodeDescription = e.diagnosisCodes.map(code => {
          const diagnose = diagnoseLibrary.find(info => info.code === code);
          if (!diagnose) {
            return { name: "Diagnose not found", code: "Diagnose not found" };

          }
          return { name: diagnose.name, code: diagnose.code };
        });
        return (
          <div key={e.id}>
            <p>{e.date} {e.description}</p>
            <ul>
              {diagnoseCodeDescription.map(d => <li key={d.code}>{d.code} {d.name}</li>)}
            </ul>
          </div>
        );
      }
    });
    if (!formattedEntries) {
      return <div></div>;
    } else {
      return (
        <>
          {renderBasicInfo(patient)}
          {formattedEntries}
        </>);
    }
  }
};

export default OnePatientPage;