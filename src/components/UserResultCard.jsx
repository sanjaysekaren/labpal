import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";
import React from "react";

const UserResultComponent = () => {
  return (
    <Container className="card-result-container">
      <Card className="card-result-item">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "wheat" }} aria-label="recipe">
              S
            </Avatar>
          }
          title="Senthil Thadiyan"
          subheader="Mentally affected"
        ></CardHeader>
        <CardContent>
          <div className="card-content-header">Patient Details:</div>
          <div className="card-content-fields">
            <span>Age</span>
            <span>71</span>
          </div>
          <div className="card-content-fields">
            <span>Gender</span>
            <span>Not applicable</span>
          </div>
          <div className="card-content-fields">
            <span>Placec</span>
            <span>Hell</span>
          </div>
          <div className="card-content-fields">
            <span>Status</span>
            <span>Active</span>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserResultComponent;
