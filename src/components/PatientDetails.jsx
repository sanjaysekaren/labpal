import axios from "axios";
import React, { useEffect, useState } from "react";
import { root_url } from "../constant";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
} from "@mui/material";
import UserResultComponent from "./UserResultCard";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import LaunchIcon from "@mui/icons-material/Launch";
import noDataFound from "../assets/images/undraw_No_data_re_kwbl.png";

const PatientComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let userId = location.state.id;

  const [patientData, setPatientData] = useState({});
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState();
  const [loader, setLoader] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);

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

    fetchPatientData();
  }, [userId]);

  useEffect(() => {
    async function getPatientReports() {
      setLoader(true);
      if (!file) {
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
      setLoader(false);
    }
    getPatientReports();
  }, [userId, file]);

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
    console.log(e.target.files);
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveSelectedFile = () => {
    setFile("");
    document.getElementById("file").value = "";
  };

  const handleFileUpload = async () => {
    if (!file) {
      return;
    }
    setUploadLoader(true);
    let fileResponse = await getUploadFileDetails();
    if (fileResponse.status === 200) {
      uploadFileBasedOnURL(
        fileResponse.data.fileUploadUrl,
        fileResponse.data.fileId
      );
    }
    setUploadLoader(false);
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
    let fileUploadResponse = await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    if (fileUploadResponse.status === 200) {
      await PostReportDetailsAfterFileUpload(fileId);
    }
  };

  const PostReportDetailsAfterFileUpload = async (fileId) => {
    let response = await axios.post(
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
    if (response.status === 200) {
      handleRemoveSelectedFile();
    }
  };

  return (
    <div>
      {!!patientData.id && (
        <div>
          <UserResultComponent patient={patientData} />
          <div className="patient-details-container">
            <Card className="reports-container">
              <CardHeader
                title={`List of Available Reports for ${patientData.name}`}
              ></CardHeader>
              {loader ? (
                <CircularProgress className="progress-loader" />
              ) : (
                <CardContent className="reports-list-container">
                  {!!reports.length ? (
                    <>
                      {reports.map((report) => {
                        return (
                          <div
                            className="report-content"
                            key={`report-${report.id}`}
                          >
                            <div className="report-meta-details">
                              <span className="report-name">{report.name}</span>
                              <span className="report-created-date">
                                {new Date(report.createdAt).toDateString()}
                              </span>
                            </div>
                            <Divider className="report-divider"></Divider>
                            <div className="report-action-buttons">
                              <Button
                                className="report-download"
                                variant="contained"
                                onClick={() => handleGetReport(report.id)}
                              >
                                View
                                <LaunchIcon
                                  sx={{ color: "#FFF", fontSize: 25 }}
                                />
                              </Button>
                              <Button
                                className="report-delete"
                                variant="outlined"
                              >
                                Delete
                                <DeleteOutlineIcon
                                  sx={{ color: "#FFF", fontSize: 25 }}
                                />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="no-reports-found-container">
                      <img src={noDataFound} alt="logo" />
                      <p>No Reports found for this Patient</p>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
            <Card className="upload-container">
              <CardHeader title="Report:"></CardHeader>
              {uploadLoader ? (
                <CircularProgress className="progress-loader" />
              ) : (
                <CardContent className="upload-container-button">
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
                    disabled={!file}
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
