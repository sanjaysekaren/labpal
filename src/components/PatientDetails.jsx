import axios from "axios";
import React, { useEffect, useState } from "react";
import { root_url } from "../constant";
import { useLocation } from "react-router-dom";
import { Button, Card, CardContent } from "@mui/material";
import UserResultComponent from "./UserResultCard";

const PatientComponent = () => {
  const location = useLocation();
  let userId = location.state.id;

  const [patientData, setPatientData] = useState({});
  useEffect(() => {
    async function fetchData() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("session_token")}`;

      const response = await axios.get(`${root_url}/patients/${userId}`);
      if (response.status === 200) {
        setPatientData(response.data);
      }
    }
    fetchData();
  }, [userId]);
  return (
    <div>
      {!!patientData.id && 
      <div>
        <UserResultComponent patient={patientData} />
        <Card className="upload-container">
            <CardContent className="upload-container-button">
                <div className="upload-area">
                    <Button variant="contained" component="label">
                        Upload New Report
                        <input hidden accept="image/*" multiple type="file" />  
                    </Button>
                </div>
            </CardContent>
        </Card>
        </div>}
    </div>
  );
};

export default PatientComponent;
