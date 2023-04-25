import logo from './logo.svg';
import './App.css';
import { Button, Container, Divider, Input, TextField } from '@mui/material';
import { useState } from 'react';

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
      <div className='header-container'>
        <img src='/assets/orange-background.png' alt="background"/>
      </div>
      <div>
        <h1>laBPal</h1>
        <h2>Welcome to laBPal!!</h2>
      </div>
      <Divider textAlign="left">Search For Patient Details</Divider>
      <Container className='mt-3'>
      <TextField
          id="filled-search"
          label="Enter Patient ID"
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
  );
}

export default App;
