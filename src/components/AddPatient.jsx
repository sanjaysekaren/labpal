import React, { useEffect, useReducer } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { root_url } from "../constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  patientName: "",
  patientAge: "",
  patientGender: "male",
  patientDOB: null,
  patientAddress: "",   
  patientPhoneNumber: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "handleName":
      return { ...state, patientName: action.patientName };
    case "handleAge":
      return { ...state, patientAge: action.patientAge };
    case "handleGender":
      return { ...state, patientGender: action.patientGender };
    case "handleDob":
      return { ...state, patientDOB: action.patientDOB };
    case "handleAddress":
      return { ...state, patientAddress: action.patientAddress };
    case "handlePhoneNumber":
      return { ...state, patientPhoneNumber: action.patientPhoneNumber };
    case "handleReset":
      return {
        ...initialState,
        patientDOB: initialState.patientDOB,
      };
    default:
      throw new Error();
  }
}

const AddPatientComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleAddPatient = async () => {
    const payload = {
      name: state.patientName,
      age: state.patientAge,
      gender: state.patientGender,
      dateOfBirth: state.patientDOB,
      address: state.patientAddress,
      phoneNumber: state.patientPhoneNumber,
    };
    let response = await axios.post(root_url + "/patients", payload, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      navigate("/");
    }
  };

  const handleReset = () => {
    dispatch({ type: "handleReset" });
  };

  const handleGenderChange = (e) => {
    dispatch({ type: "handleGender", patientGender: e.target.value });
  };
  return (
    <Container className="add-patient-form-container">
      <Card>
        <CardHeader title="Enter Patient Details">
          Enter Patient Details
        </CardHeader>
        <CardContent className="add-patient-form-content">
          <div className="add-patient-form-content-field">
            <label className="add-patient-form-label">Patient Name</label>
            <TextField
              variant="outlined"
              className="add-patient-form-value"
              placeholder="Enter Patient Name"
              onChange={(e) =>
                dispatch({ type: "handleName", patientName: e.target.value })
              }
              value={state.patientName}
            ></TextField>
          </div>
          <div className="add-patient-form-content-field">
            <label className="add-patient-form-label">Age</label>
            <TextField
              variant="outlined"
              className="add-patient-form-value"
              placeholder="Enter Patient Age"
              onChange={(e) =>
                dispatch({ type: "handleAge", patientAge: e.target.value })
              }
              value={state.patientAge}
            ></TextField>
          </div>
          <div className="add-patient-form-content-field">
            <label className="add-patient-form-label">Gender</label>
            <Select
              className="add-patient-form-value gender-select"
              value={state.PatientGender}
              onChange={handleGenderChange}
              defaultValue={"Male"}
            >
              <MenuItem disabled value={""}>
                <em>Select Gender</em>
              </MenuItem>
              <MenuItem value={"male"} selected>
                Male
              </MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"others"}>Others</MenuItem>
            </Select>
          </div>
          <div className="add-patient-form-content-field">
            <label className="add-patient-form-label">Date of Birth</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select/Enter Date Of Birth"
                className="add-patient-form-value"
                onChange={(newValue) =>
                  dispatch({ type: "handleDob", patientDOB: newValue })
                }
                value={state.patientDOB}
                disableFuture
              />
            </LocalizationProvider>
          </div>
          <div className="add-patient-form-content-field">
            <label className="add-patient-form-label">Address</label>
            <TextField
              variant="outlined"
              className="add-patient-form-value"
              placeholder="Enter Patient Address"
              onChange={(e) =>
                dispatch({
                  type: "handleAddress",
                  patientAddress: e.target.value,
                })
              }
              value={state.patientAddress}
            ></TextField>
          </div>
          <div className="add-patient-form-content-field">
            <label className="add-patient-form-label">Phone Number</label>
            <TextField
              variant="outlined"
              className="add-patient-form-value"
              placeholder="Enter Patient Phone Number"
              onChange={(e) =>
                dispatch({
                  type: "handlePhoneNumber",
                  patientPhoneNumber: e.target.value,
                })
              }
              value={state.patientPhoneNumber}
            ></TextField>
          </div>
        </CardContent>
        <div className="add-patient-button-container">
          <Button
            variant="contained"
            className="add-patient-submit-button"
            onClick={handleAddPatient}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            className="add-patient-reset-button"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            className="add-patient-reset-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default AddPatientComponent;
