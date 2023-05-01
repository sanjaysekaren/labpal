import logo from "./logo.svg";
import "./App.css";
import {
  AppBar,
  Button,
  Container,
  Divider,
  Input,
  TextField,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import UserResultComponent from "./components/UserResultCard";
import { Link } from "react-router-dom";
import { root_url } from "./constant";
import axios from "axios";

function App() {
  const [patientId, setPatientId] = useState("");
  const [patientDetails, setPatientDetails] = useState([]);

  const handleSearchButton = async (e) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("session_token")}`;
    let response = await axios.get(`${root_url}/patients`);
    setPatientDetails(response.data);
  };
  const handlePatientInput = (e) => {
    setPatientId(e.target.value);
  };
  return (
    <div className="App">
      <div className="header-image-container"></div>
      <div className="main-content">
        <div className="add-patient-button-container">
          <Button variant="contained">
            <Link to="/add-patient">Add New Patient</Link>
          </Button>
        </div>
        <Divider light textAlign="left">
          Search For Patient Details
        </Divider>
        <Container className="mt-3">
          <TextField
            id="filled-search"
            className="patient-search-box"
            placeholder="Enter Patient ID"
            type="search"
            fullWidth
            autoFocus
            margin="dense"
            value={patientId}
            onChange={(e) => handlePatientInput(e)}
          />
          <Button onClick={handleSearchButton} variant="contained">
            Get Patient Details
          </Button>
        </Container>
      </div>
      <div className="patients-search-results-container">
      {!!patientDetails.length &&
        patientDetails.map((patient) => {
          return (
            <UserResultComponent patient={patient}  key={patient.id}/>
          );
        })}
      </div>
    </div>
  );
}

export default App;
