import React, { useState, useContext, useEffect } from "react";
import "./login.css";
import AuthContext from "../../context/auth/authcontext";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// const dotenv = require("dotenv");
// dotenv.config();
function Login(props) {
  const [btnTxt, setBtnTxt] = useState("Login"); // text on button: login or signup
  const [newUser, setNewUser] = useState(false); // check if user already exist or not

  const linkStyle = {
    style: {
      textDecoration: "none",
      color: "blue",
      cursor: "pointer"
    }
  };
  const auth = useContext(AuthContext);
  //to toggle newUser and button text;
  function signUpHandler(e) {
    e.preventDefault(); //to prevent reloading
    if (newUser) {
      setNewUser(false);
      setBtnTxt("Login");
    } else {
      setNewUser(true);
      setBtnTxt("Sign Up");
    }
  }
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [confirmPass, setConfirmPass] = useState("");
  const [username, setUsername] = useState({ fname: "", lname: "" });
  const [redAlert, setRedAlert] = useState(false)
  const [yellowAlert, setYellowAlert] = useState(false)
  const [greenAlert, setGreenAlert] = useState(false)
  const [errorMSg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  // API for login
  const login = async (e) => {
    e.preventDefault(); //to prevent reloading.
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        credentials: "include",
        withCredentials: true,
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      if (json.errors) {
        setErrorMsg(json.errors[0].msg);
        setRedAlert(true);
      }
      else if (json.error) {
        setErrorMsg(json.error)
        setRedAlert(true);
      }
      else {
        auth.setAuthToken(json.authToken)
        getUserdetails(json.authToken);
        navigate("/user");
      }

    } catch (error) {
      console.log(error);
    }
  }

  // API for getting details
  const getUserdetails = async (authToken) => {
    try {
      const response = await fetch('http://localhost:5000/auth/getuserdetails', {
        method: 'POST',
        credentials: "include",
        withCredentials: true,
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        }
      });
      const json = await response.json();
      //console.log(json);
      if (json.error) {
        alert(json.error);
        auth.setAuthToken("");
        auth.setData({ lname: "", fname: "", email: "", id: "" });
      }
      else {
        auth.setName(json.name)
        auth.setData({ fname: json.fname, lname: json.lname, email: json.email, id: json.id, phone: json.phone, address: json.address, course: json.course, department: json.department, year: json.year, scholar: json.scholar });
        console.log("Logged in successfully !!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  // API for signup
  const signup = async (e) => {
    e.preventDefault();
    if (confirmPass !== credentials.password)
      setYellowAlert(true);
    else {
      try {
        const response = await fetch("http://localhost:5000/auth/signup", {
          method: 'POST',
          credentials: "include",
          withCredentials: true,
          mode: "cors",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fname: username.fname, lname: username.lname, email: credentials.email, password: credentials.password })
        })
        const json = await response.json();

        if (json.errors) {
          setErrorMsg(json.errors[0].msg);
          setRedAlert(true);
        }
        else if (json.error) {
          setErrorMsg(json.error);
          setRedAlert(true);
        }
        else {
          setGreenAlert(true);
          setUsername("");
          setCredentials({ email: "", password: "" });
          setConfirmPass("");
          setNewUser(false);
          setBtnTxt("Login");
        }
        //console.log(json);
      } catch (error) {
        console.log(error);
      }
    }

  }

  var color;
  const dissappearRed = () => {
    setTimeout(() => {
      setRedAlert(false);
    }, 2500)
  }
  const dissappearYellow = () => {
    setTimeout(() => {
      setYellowAlert(false);
    }, 2500)
  }
  const dissappearGreen = () => {
    setTimeout(() => {
      setGreenAlert(false);
    }, 2500)
  }
  // functions for showing alerts
  const alerts = () => {
    if (redAlert) {
      color = "Red";
      return (
        <div class="alert alert-danger" role="alert">
          {errorMSg}<span style={{ cursor: "pointer", float: "right" }} onClick={() => { setRedAlert(false) }}>&times;</span>
        </div>
      )
    }
    else if (yellowAlert) {
      return (
        <div class="alert alert-warning" role="alert">
          Both passwords should match !! <span style={{ cursor: "pointer", float: "right" }} onClick={() => { setYellowAlert(false) }}>&times;</span>
        </div>
      )
    }
    else if (greenAlert) {
      return (
        <div class="alert alert-success" role="alert">
          Successfully registered !! You can now login with your credentials. <span style={{ cursor: "pointer", float: "right" }} onClick={() => { setGreenAlert(false) }}>&times;</span>
        </div>
      )
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const onChangeForSignUp = (e) => {
    var val = e.target.value;
    if (e.target.name === "fname")
      setUsername({ ...username, fname: val });
    if (e.target.name === "lname")
      setUsername({ ...username, lname: val });
    else if (e.target.name === "confirmPass")
      setConfirmPass(val);
  }
  return (
    <>
      <div className="d-flex flex-column w-100">
        {alerts()}
        {redAlert && dissappearRed()}
        {yellowAlert && dissappearYellow()}
        {greenAlert && dissappearGreen()}
        <div className="login container d-flex justify-content-center align-items-center">

          <div className="row p-2">
            <div className="info col-md-6 d-flex flex-column align-items-center">
              <img src={logo} width="100" height="100" alt="logo" />
              <br />
              <h2>Training and Placement Cell, MANIT</h2>
              <br />
            </div>
            <div className="form col-md-6">
              <form action="">
                {newUser && (
                  <div className="mb-3 form-group d-flex justify-content-between">
                    <input
                      type="username"
                      name="fname"
                      placeholder="First Name"
                      className="form-control"
                      value={username.fname}
                      onChange={onChangeForSignUp}
                    />
                    <input
                      type="username"
                      name="lname"
                      placeholder="Last Name"
                      className="form-control"
                      value={username.lname}
                      onChange={onChangeForSignUp}
                    />
                  </div>
                )}
                <div className="form-group mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={credentials.email}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3 form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    value={credentials.password}
                    onChange={onChange}
                  />
                </div>
                {newUser && (
                  <div className="mb-3 form-group">
                    <input
                      type="password"
                      name="confirmPass"
                      placeholder="Confirm Password"
                      className="form-control"
                      value={confirmPass}
                      onChange={onChangeForSignUp}
                    />
                  </div>
                )}
                <span className="d-flex flex-column">

                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={btnTxt === "Login" ? login : signup}
                  >
                    {btnTxt}
                  </button>
                </span>
                <br />
                {!newUser ? (
                  <p>
                    New user ?&nbsp;
                    <span onClick={signUpHandler} {...linkStyle}>
                      Sign up here
                    </span>
                  </p>
                ) : (
                  <p>
                    Existing user ?&nbsp;
                    <span onClick={signUpHandler} {...linkStyle}>
                      Login here
                    </span>
                  </p>
                )}
                <div>
                  <form>
                    <Link to="/">
                      <button type="submit" className="" style={{ backgroundColor: "transparent", border: "none", color: "red" }}
                      >Go to Home</button>
                    </Link>
                  </form>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
