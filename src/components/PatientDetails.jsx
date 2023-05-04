import axios from "axios";
import React, { useEffect, useState } from "react";
import { root_url } from "../constant";
import { useLocation } from "react-router-dom";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import UserResultComponent from "./UserResultCard";

const PatientComponent = () => {
  const location = useLocation();
  let userId = location.state.id;

  const [patientData, setPatientData] = useState({});
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState();
  useEffect(() => {
    async function fetchPatientData() {
      const response = await axios.get(`${root_url}/patients/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("session_token")}`,
        },
      });
      if (response.status === 200) {
        setPatientData(response.data);
      }
    }
    async function getPatientReports() {
      const response = await axios.get(
        `${root_url}/reports?patientId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("session_token")}`,
          },
        }
      );
      if (response.status === 200) {
        setReports(response.data);
      }
    }
    fetchPatientData();
    getPatientReports();
  }, [userId]);

  const handleGetReport = async (id) => {
    let response = await axios.get(`${root_url}/reports/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("session_token")}`,
      },
    });
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
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      return;
    }
    let fileResponse = await getUploadFileDetails();
    if (fileResponse.status === 200) {
      uploadFileBasedOnURL(
        fileResponse.data.fileUploadUrl,
        fileResponse.data.fileId
      );
    }
  };

  const getUploadFileDetails = async () => {
    return await axios.post(
      `${root_url}/reports:upload`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("session_token")}`,
        },
      }
    );
  };

  const uploadFileBasedOnURL = async (uploadUrl, fileId) => {
    const dataForm = new FormData();
    dataForm.append("data", file);
    let fileUploadResponse = await axios.put(uploadUrl, dataForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (fileUploadResponse.status === 200) {
      await PostReportDetailsAfterFileUpload(fileId);
    }
  };

  const PostReportDetailsAfterFileUpload = async (fileId) => {
    await axios.post(
      `${root_url}/reports`,
      {
        patientId: patientData.id,
        fileId: fileId,
        diagnosticsId: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("session_token")}`,
        },
      }
    );
  };
  return (
    <div>
      {!!patientData.id && (
        <div>
          <UserResultComponent patient={patientData} />
          <Card className="upload-container">
            <CardHeader title="Report:"></CardHeader>
            <CardContent className="upload-container-button">
              <div className="upload-area">
                <div>{file && `${file.name} - ${file.type}`}</div>
                <Button
                  variant="contained"
                  component="label"
                  onClick={handleFileUpload}
                >
                  Select Report
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleFileChange}
                  />
                </Button>
              </div>
              <Button
                className="upload-report-button"
                variant="contained"
                onClick={handleFileUpload}
              >
                Upload Report
              </Button>
            </CardContent>
          </Card>
          {!!reports.length ? (
            <Card className="reports-container">
              <CardHeader
                title={`List of Available Reports for ${patientData.name}`}
              ></CardHeader>
              <CardContent>
                {reports.map((report) => {
                  return (
                    <div
                      className="report-name"
                      key={`report-${report.id}`}
                      onClick={() => handleGetReport(report.id)}
                    >
                      {report.name}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ) : (
            <div>No Reports found for this Patient</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientComponent;
