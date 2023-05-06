import "./App.css";
import {
  Container,
  Divider,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import UserResultComponent from "./components/UserResultCard";
import { Link, useNavigate } from "react-router-dom";
import { root_url } from "./constant";
import noResultsFound from "./assets/images/undraw_Not_found_re_bh2e.png";
import axios from "axios";

function App() {
  const [patientId, setPatientId] = useState("");
  const [patientDetails, setPatientDetails] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    async function getPatientDetails() {
      setLoader(true);
      let response = await axios.get(
        `${root_url}/patients?phoneNumber=&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setPatientDetails(response.data);
      setLoader(false);
    }
    getPatientDetails();
  }, []);

  const handleSearchButton = async (e) => {
    e.preventDefault();
    setLoader(true);
    let response = await axios.get(
      `${root_url}/patients?phoneNumber=${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    setPatientDetails(response.data);
    setLoader(false);
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
        <Divider textAlign="left">Search For Patient Details</Divider>
        <Container className="mt-3">
          <form onSubmit={handleSearchButton}>
            <TextField
              id="filled-search"
              className="patient-search-box"
              placeholder="Enter Patient ID"
              fullWidth
              autoFocus
              margin="dense"
              value={patientId}
              onChange={(e) => handlePatientInput(e)}
            />
            <Button
              onClick={handleSearchButton}
              type="submit"
              variant="contained"
              className="get-patient-details-button"
            >
              Get Patient Details
            </Button>
          </form>
        </Container>
      </div>
      {loader ? (
        <CircularProgress className="progress-loader" />
      ) : (
        <div className="patients-search-results-container scrollbar">
          {!!patientDetails.length ? (
            patientDetails.map((patient) => {
              return <UserResultComponent patient={patient} key={patient.id} />;
            })
          ) : (
            <div className="no-results-found-container">
              <img src={noResultsFound} alt="logo" />
              <p>No Results Found!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
