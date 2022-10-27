import React, { useState , useReducer} from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

// register reducer function
import { registerReducer } from './register-reducer.js';

const RegisterComponent = () => {
  const navigate = useNavigate();
  const successMessageWord = "Registration succeeds. You are now redirected to the login page.";
  let [message, setMessage] = useState("");
  let [successMessage, setScMessage] = useState("");
  
  // useState function
  // let [username, setUsername] = useState("");
  // let [username, setUsername] = useState("");
  // let [email, setEmail] = useState("");
  // let [password, setPassword] = useState("");
  // let [role, setRole] = useState("");

  // useReducer function
  const initState = {
    username: null,
    email:null,
    password: null,
    role:null,
  }
  const [state, dispatch] = useReducer(registerReducer, initState)
  
  // useState function
  // const handleChangeUsername = (e) => {
  //   setUsername(e.target.value);
  // };
  // const handleChangeEmail = (e) => {
  //   setEmail(e.target.value);
  // };
  // const handleChangePassword = (e) => {
  //   setPassword(e.target.value);
  // };
  // const handleChnageRole = (e) => {
  //   setRole(e.target.value);
  // };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const changeValue = { name, value };
    dispatch({ type: 'CHANGE_ITEM', changeValue: changeValue });
  };
  

  const handleRegister = () => {
    dispatch({ type: 'REGISTER'});    
    AuthService.register(state.username,state.email,state.password,state.role)
      .then((data) => {
        setScMessage(successMessageWord)
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
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
          <label htmlFor="password">role</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="role"
          />
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
