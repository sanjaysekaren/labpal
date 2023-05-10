import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  MenuItem,
  Select,
} from "@mui/material";
import UserResultComponent from "./UserResultCard";
import ReportComponent from "./ReportComponent";
import { fetchDiagnosticDataApi, fetchPatientDataApi, getPatientReportsApi, getUploadFileDetailsApi, handleDeleteReportApi, handleGetReportApi, uploadFileBasedOnURLApi } from "../services/api";

const PatientComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state.id;

  const [patientData, setPatientData] = useState({});
  const [loader, setLoader] = useState(false);
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState();
  const [uploadLoader, setUploadLoader] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState([]);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    async function fetchPatientData() {
      let records = await fetchPatientDataApi(userId);
      setPatientData(records.data)
    }
    async function fetchDiagnosticData() {
      let records = await fetchDiagnosticDataApi();
      setDiagnosticData(records.data);
    }
    fetchPatientData();
    fetchDiagnosticData();
  }, [navigate, userId]);

  const getPatientReports = useCallback(async (userId) => {
    setLoader(true);
    let response = await getPatientReportsApi(userId);
    if (response.status === 200) {
      setReports(response.data);
    }
    setLoader(false);
  }, [])

  useEffect(() => {
    getPatientReports(userId);
  }, [userId, getPatientReports]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDiagnosticSelection = (e) => {
    setSelectedDiagnostic(e.target.value)
  }

  const handleRemoveSelectedFile = async() => {
    setFile();
    let fileElement = document.getElementById("file");
    if(fileElement) fileElement.value = "";
    await getPatientReports(userId);
  };

  const handleFileUpload = async () => {
    if (!file) {
      return;
    }
    setUploadLoader(true);
    let fileResponse = await getUploadFileDetailsApi();
    if (fileResponse.status === 200) {
      let response = await uploadFileBasedOnURLApi(
        fileResponse.data.fileUploadUrl,
        fileResponse.data.fileId,
        patientData.id,
        file,
        selectedDiagnostic
      );
      setUploadLoader(false);
      if (response.status === 200) {
        await handleRemoveSelectedFile();
      }
    }
    setUploadLoader(false);
  };

  const handleDeleteReport = async (id) => {
    setLoader(true);
    let response = await handleDeleteReportApi(id);
    if (response.status === 200) {
      await getPatientReports(userId);
    }
    setLoader(false);
  }

  const handleGetReport = async (id) => {
    let response = await handleGetReportApi(id)
    if (response.status === 200) {
      open(response.data.url);
    }
  };

  function open(url) {
    const win = window.open(url, "_blank");
    if (win != null) {
      win.focus();
    }
  }

  return (
    <div>
      {!!patientData.id && (
        <div>
          <UserResultComponent patient={patientData} />
          <div className="patient-details-container">
            <ReportComponent
              userId={userId}
              patientData={patientData}
              reports={reports}
              loader={loader}
              getPatientReports={() => getPatientReports(userId)}
              handleDeleteReport={handleDeleteReport}
              handleGetReport={handleGetReport}
            />
            <Card className="upload-container">
              <CardHeader title="Report:"></CardHeader>
              {uploadLoader ? (
                <CircularProgress className="progress-loader" />
              ) : (
                <CardContent className="upload-container-button">
                  <div className="select-diagnostic-area">
                    <label>Select Diagnostic</label>
                    <Select
                      className="select-diagnostic-drop-down"
                      value={selectedDiagnostic}
                      onChange={handleDiagnosticSelection}
                    >
                      {diagnosticData.length && diagnosticData.map((diagnostic) => (
                        <MenuItem value={diagnostic.id} key={diagnostic.id} selected>
                          {diagnostic.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="upload-area">
                    {!!file && (
                      <div className="selected-file">
                        {file && `${file.name} - ${file.type}`}
                      </div>
                    )}
                    <div className="buttons-container">
                      <Button variant="contained" component="label">
                        Select Report
                        <input
                          hidden
                          id="file"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </Button>
                      {!!file && (
                        <Button
                          className="remove-file"
                          onClick={handleRemoveSelectedFile}
                        >
                          Remove File
                        </Button>
                      )}
                    </div>
                  </div>
                  <Button
                    className="upload-report-button"
                    variant="contained"
                    onClick={handleFileUpload}
                    disabled={!file || !selectedDiagnostic}
                  >
                    Upload Report
                  </Button>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientComponent;
