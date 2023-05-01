import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
// import { Route, Router } from 'react-router-dom';
import AddPatientComponent from './components/AddPatient';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import HeaderComponent from './components/Header';
import LoginComponent from './components/Login';
import PatientComponent from './components/PatientDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <HeaderComponent/>
    <Router>
      <Routes>
      <Route exact path="/" Component={App}>
      </Route>
      <Route path="/login" Component={LoginComponent}>
      </Route>
      <Route path="/add-patient" Component={AddPatientComponent}>
      </Route>
      <Route path="/patient-details/:id" Component={PatientComponent}>
      </Route>
      </Routes>
    </Router>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
