import axios from "axios";
import { root_url } from "../constant";

const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
}

export const fetchPatientDataApi = async (userId) => {
    const response = await axios.get(`${root_url}/patients/${userId}`, {
        headers: headers,
    });
    return response;
}

export const getPatientReportsApi = async (userId) => {
    const response = await axios.get(
        `${root_url}/reports?patientId=${userId}`,
        {
            headers: headers,
        }
    );
    return response;
}

export const fetchDiagnosticDataApi = async() => {
    const response = await axios.get(`${root_url}/diagnostics`, {
        headers: headers,
    });
    return response;
}

export const getUploadFileDetailsApi = async () => {
    return await axios.post(
        `${root_url}/reports:upload`,
        {},
        {
            headers: headers,
        }
    );
};

export const uploadFileBasedOnURLApi = async (uploadUrl, fileId, patientId, file, selectedDiagnostic) => {
    let fileUploadResponse = await axios.put(uploadUrl, file, {
        headers: {
            "Content-Type": file.type,
        },
    });
    if (fileUploadResponse.status === 200) {
        return await PostReportDetailsAfterFileUploadApi(fileId, patientId, selectedDiagnostic);
    }
    return fileUploadResponse;
};

export const PostReportDetailsAfterFileUploadApi = async (fileId, patientId, selectedDiagnostic) => {
    let response = await axios.post(
        `${root_url}/reports`,
        {
            patientId: patientId,
            fileId: fileId,
            diagnosticsId: selectedDiagnostic,
        },
        {
            headers: headers,
        }
    );
    return response;
};

export const handleDeleteReportApi = async (id) => {
    let response = await axios.delete(`${root_url}/reports/${id}`, {
        headers: headers
    })
    return response;
}

export const handleGetReportApi = async (id) => {
    let response = await axios.get(`${root_url}/reports/${id}`, {
        headers: headers,
    });
    return response
};
