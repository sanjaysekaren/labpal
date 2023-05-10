import React from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LaunchIcon from "@mui/icons-material/Launch";
import noDataFound from "../assets/images/undraw_No_data_re_kwbl.png";

const ReportComponent = ({ patientData, reports, loader, handleGetReport, handleDeleteReport }) => {
    return (
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
                                                onClick={() => handleDeleteReport(report.id)}
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
    )

}

export default ReportComponent;