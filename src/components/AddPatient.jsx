import React from "react";
import { Card, CardContent, CardHeader, TextField } from "@mui/material";

const AddPatientComponent = () => {
    return (
        <Card>
            <CardHeader>
                Enter Patient Details
            </CardHeader>
            <CardContent>
                <div>
                    <label>
                        Patient Name
                    </label>
                    <TextField variant="outlined">

                    </TextField>
                </div>
                <div>
                    <label>
                        Age
                    </label>
                    <TextField variant="outlined">

                    </TextField>
                </div>
                <div>
                    <label>
                        Date of Birth
                    </label>
                    <TextField variant="outlined">

                    </TextField>
                </div>
            </CardContent>
        </Card>
    )
}

export default AddPatientComponent;