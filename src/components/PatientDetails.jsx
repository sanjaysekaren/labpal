import axios from "axios";
import React, { useEffect, useState } from "react";
import { root_url } from "../constant";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import UserResultComponent from "./UserResultCard";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

const PatientComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let userId = location.state.id;

  const [patientData, setPatientData] = useState({});
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchPatientData() {
      const response = await axios.get(`${root_url}/patients/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  };
  return (
    <div>
      {!!patientData.id && (
        <div>
          <UserResultComponent patient={patientData} />
          <div className="patient-details-container">
            {!!reports.length ? (
              <Card className="reports-container">
                <CardHeader
                  title={`List of Available Reports for ${patientData.name}`}
                ></CardHeader>
                <CardContent className="reports-list-container">
                  {reports.map((report) => {
                    return (
                      <div
                        className="report-content"
                        key={`report-${report.id}`}
                      >
                        <span className="report-name">{report.name}</span>
                        <span className="report-created-date">
                          {new Date(report.createdAt).toDateString()}
                        </span>
                        <span className="report-download">
                          <DownloadForOfflineIcon
                            onClick={() => handleGetReport(report.id)}
                            sx={{ color: "#62ad62", fontSize: 30 }}
                          />
                        </span>
                        <span className="report-delete">
                          <DeleteOutlineIcon
                            sx={{ color: "#e53d3d", fontSize: 30 }}
                          />
                        </span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ) : (
              <div>No Reports found for this Patient</div>
            )}
            <Card className="upload-container">
              <CardHeader title="Report:"></CardHeader>
              <CardContent className="upload-container-button">
                <div className="upload-area">
                  {!!file && <div className="selected-file">{file && `${file.name} - ${file.type}`}</div>}
                  <div className="buttons-container">
                    
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
                  {!!file && <Button className="remove-file" onClick={() => setFile(null)}>
                    Remove File
                  </Button>}
                    </div>
                </div>
                <Button
                  className="upload-report-button"
                  variant="contained"
                  onClick={handleFileUpload}
                  disabled={!file}
                >
                  Upload Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientComponent;
