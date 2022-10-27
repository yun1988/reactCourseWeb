import React, { useState, useEffect , useReducer} from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/auth.service";

// register reducer function
import { loginReducer } from './login-reducer.js';

const LoginComponent = (props) => {
  const navigate = useNavigate();
  let { currentUser, setCurrentUser } = props;
  let [successMessage, setScMessage] = useState("");
  let loginSuccessMessage = "Login successfully, you are now redirected to the profile page."
  let [message, setMessage] = useState("");
  
  // useState function
  // let [email, setEmail] = useState("");
  // let [password, setPassword] = useState("");

  // useReducer initState
  const initState = {
    email: null,
    password:null
  }
  const [state, dispatch] = useReducer(loginReducer, initState)

  // useState function
  // const handleChangeEmail = (e) => {
  //   setEmail(e.target.value);
  // };
  // const handleChangePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const changeValue = { name, value };
    dispatch({ type: 'CHANGE_ITEM', changeValue: changeValue });
  };
  
  const handleLogin = () => {
    dispatch({ type: 'LOGIN'});  
    AuthService.login(state.email, state.password)
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        setScMessage(loginSuccessMessage)
        setCurrentUser(AuthService.getCurrentUser());
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-primary btn-block">
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
