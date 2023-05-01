import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import React, { useRef } from "react";
import {  useNavigate } from 'react-router-dom';
import { root_url } from "../constant";
import axios from "axios";

const LoginComponent = () => {
  let username = useRef("");
  let password = useRef("");
  const navigate = useNavigate();

  const handleLoginSubmit = async() => {
    const payload = {
        "username": username.current,
        "password": password.current
    }
    const response = await axios.post(root_url+"/technicians:login",payload);
    if(response.status === 200){
        sessionStorage.setItem("session_token",response.data.token);
        navigate("/")
    } else {
        navigate("/login");
    }
  };

  return (
    <Card className="login-container">
      <CardHeader title="Login"></CardHeader>
      <CardContent className="login-content">
        <form onSubmit={handleLoginSubmit}>
          <div className="login-username-field">
            <TextField
              fullWidth
              label="UserName"
              id="username"
              placeholder="Enter Username"
              inputRef={username}
              onChange={(e) => (username.current = e.target.value)}
            />
          </div>
          <div className="login-password-field">
            <TextField
              fullWidth
              label="Password"
              id="password"
              type="password"
              placeholder="Enter Password"
              inputRef={password}
              onChange={(e) => (password.current = e.target.value)}
            />
          </div>
          <Button
            className="login-buttton"
            variant="contained"
            onClick={handleLoginSubmit}
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginComponent;
