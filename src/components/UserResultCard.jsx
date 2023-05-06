import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserResultComponent = (props) => {
  const { patient } = props;
  const navigate = useNavigate();
  return (
    <Container className="card-result-container">
      <Card
        className="card-result-item"
        onClick={() => navigate(`/patient-details/${patient.id}`, { state: {
          id: patient.id,
        }})}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#0086B3" }} aria-label="recipe">
              {patient.name[0]}
            </Avatar>
          }
          title={patient.name}
        ></CardHeader>
        <CardContent>
          <div className="card-content-header">Patient Details:</div>
          <div className="card-content-fields">
            <span>Age:</span>
            <span>{patient.age}</span>
          </div>
          <div className="card-content-fields">
            <span>Gender:</span>
            <span>{patient.gender}</span>
          </div>
          <div className="card-content-fields">
            <span>Date of Birth:</span>
            <span>{patient.dateOfBirth}</span>
          </div>
          <div className="card-content-fields">
            <span>Address:</span>
            <span>{patient.address}</span>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserResultComponent;
