import logo from './logo.svg';
import './App.css';
import { AppBar, Button, Container, Divider, Input, TextField, Toolbar } from '@mui/material';
import { useState } from 'react';
import UserResultComponent from './components/UserResultCard';
import { Link } from 'react-router-dom';

function App() {
  const [patientId, setPatientId]  = useState("");
 const handleSearchButton = async(e) => {
    console.log(patientId)
  }
  const handlePatientInput = (e) => {
    console.log(e.target.value)
    setPatientId(e.target.value)
  }
  return (
    <div className="App">
      <div className='header-image-container'>
      </div>
      <div className='main-content'>
        <div className='header-container'>
          <h1>laBPal</h1>
          <h2>Welcome to laBPal!!</h2>
        </div>
        <div>
          <Button  variant='contained'><Link to="/add-patient">Add New Patient</Link></Button>
        </div>
        <Divider textAlign="left">Search For Patient Details</Divider>
        <Container className='mt-3'>
        <TextField
            id="filled-search"
            className='patient-search-box'
            placeholder="Enter Patient ID"
            type="search"
            fullWidth
            autoFocus
            margin='dense'
            value={patientId}
            onChange={(e) => handlePatientInput(e)}
          />
          <Button onClick={handleSearchButton} variant='contained'>
            Get Patient Details
          </Button>
        </Container>
      </div>
      <UserResultComponent/>
    </div>
  );
}

export default App;
