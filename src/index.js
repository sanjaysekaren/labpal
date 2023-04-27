import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
// import { Route, Router } from 'react-router-dom';
import AddPatientComponent from './components/AddPatient';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
} from "react-router-dom";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     // <Route exact path="/" element={<App />}>
//     //   <Route exact path="/add-patient" element={<AddPatientComponent />} />
//     // </Route>
//         <Router>
//       <Route exact path="/" Component={App}>
//       </Route>
//       <Route path="/add-patient" Component={AddPatientComponent}>
//       </Route>
//     </Router>
//   )
// );

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Router>
      <Routes>
      <Route exact path="/" Component={App}>
      </Route>
      <Route path="/add-patient" Component={AddPatientComponent}>
      </Route>
      </Routes>
    </Router>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
