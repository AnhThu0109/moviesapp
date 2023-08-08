import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KEY } from "../../utils/key";
import { BASE_URL } from "../../utils/api";
import { useDispatch } from "react-redux";
import { loginFail, loginSuccess } from "../../redux/loginSlice";
import "./style.css";
import { Button, IconButton, Skeleton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [session, setSession] = useState(1);
  const [errMess, setErrMess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((show) => !show);
  };

  const handleLogin = async () => {
    setUsernameError(false);
    setPasswordError(false);

    if (username.trim() === "") {
      setUsernameError(true);
      setErrMess("Username cannot be empty.");
    }
    if (password.trim() === "") {
      setPasswordError(true);
      setErrMess("Password cannot be empty");
    }
    if (username.trim() === "" && password.trim() === "") {
      setUsernameError(true);
      setPasswordError(true);
      setErrMess("Username and Password cannot be empty");
    }
    if (username.trim() !== "" && password.trim() !== "") {
      // Get a request token
      const tokenResponse = await fetch(
        `${BASE_URL}/authentication/token/new?${KEY}`
      );
      const tokenData = await tokenResponse.json();
      let requestToken = tokenData.request_token;
      console.log("requestToken", requestToken);

      // Validate the request token with the user's credentials
      const loginUrl = `https://api.themoviedb.org/3/authentication/token/validate_with_login?${KEY}&username=${username}&password=${password}&request_token=${requestToken}`;
      const loginParams = {
        username: username, //anhthu010997
        password: password, //010997
        request_token: requestToken,
      };
      await fetch(loginUrl, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${requestToken}`,
        },
        body: JSON.stringify(loginParams),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === false) {
            setErrMess(data.status_message);
            dispatch(loginFail());
            return;
          } else {
            requestToken = data.request_token;
          }
        })
        .catch((err) => console.log(err));

      // Create a session
      const sessionResponse = await fetch(
        `${BASE_URL}/authentication/session/new?${KEY}&request_token=${requestToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const sessionData = await sessionResponse.json();
      const sessionId = sessionData.session_id;
      setSession(sessionId);

      // Store the session ID in local storage
      localStorage.setItem("session_id", sessionId);
      if (
        localStorage.getItem("session_id") !== "undefined" &&
        localStorage.getItem("session_id") != null
      ) {
        dispatch(loginSuccess());
        navigate("/welcome");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    localStorage.setItem("noti", true);
    await handleLogin()
      .then((res) => console.log(res))
      .then((data) => setIsLoading(false))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isLoading === true ? (
        <>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </>
      ) : (
        <div
          className="p-5 d-flex justify-content-center position-relative"
          id="containerLogin"
        >
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            id="loginForm"
            className="p-5 mt-5 rounded-4"
          >
            <h2 className="fw-bolder">Login to your account</h2>
            <p className="fw-bolder">Please log in to see more information.</p>
            <TextField
              label="Username"
              onChange={handleUsernameChange}
              required
              variant="outlined"
              color="info"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={username}
              error={usernameError}
            />
            <TextField
              label="Password"
              onChange={handlePasswordChange}
              required
              variant="outlined"
              color="info"
              type={showPassword ? "text" : "password"}
              value={password}
              error={passwordError}
              fullWidth
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button variant="outlined" color="info" type="submit">
              Login
            </Button>
            {session === undefined ? (
              <h5 className="text-danger pt-4">{errMess}</h5>
            ) : (
              <></>
            )}
          </form>
          <div id="loginColor"></div>
        </div>
      )}
    </>
  );
};

export default Login;
