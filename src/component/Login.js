import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "../Cssfile/Login.css";
import IconButton from "@material-ui/core/IconButton";


import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { userLogin } from "./Service";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
      userName: "",
      userPassword: "",
      email: "",
      password1: "",
      isValid: true,
      error: {}
    };
    this.handleValid = this.handleValid.bind(this);
  }
  handleValid = () => {
    let error = this.state.error;
    let password = this.state.userPassword;
    let isValid = this.state.isValid;
    
   
    
    if (password === "") {
      isValid = false;
      error["password"] = "Password is required";
    }
    this.setState({
      error: error
    });
    return isValid;
  };

  handleUsernameChange = event => {
    this.setState({
      userName: event.target.value
    });
   
  };
  handleloginChange = () => {
    if (this.handleValid() === true) {
      let userlogin = {};
      userlogin.email = this.state.userName;
      userlogin.password1 = this.state.userPassword;
      userLogin(userlogin)
        .then(Response => {
          let Name = Response.data.data.user.firstname+" "+Response.data.data.user.lastname;
          console.log(Name);
         localStorage.setItem("Name",Name)
         localStorage.setItem("Email",Response.data.data.user.email)
         localStorage.setItem("ProfilePic",Response.data.data.user.profile)
         localStorage.setItem("Token",Response.data.data.token)


          this.props.history.push("/Dashboard/note");
        })
        .catch(err => {
          console.log(Response, "user login fail");
          alert(`${Response.data}`);
        });
    }
  };

  handleLoginPasswordChange1 = event => {
    this.setState({
      userPassword: event.target.value
    });
    // console.log(this.state.userPassword);
  };
  forgotpassword = () => {
    this.props.history.push("/ForgotPassword");
  };
  handleregister = () => {
    this.props.history.push("/register");
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    return (
      <div className="login">
        {/*  */}
        <div className="fundooLogin">
          <span style={{ color: "blue" }}>f</span>
          <span style={{ color: "red" }}>u</span>
          <span style={{ color: "orange" }}>n</span>
          <span style={{ color: "blue" }}>d</span>
          <span style={{ color: "green" }}>o</span>
          <span style={{ color: "red" }}>o</span>
        </div>
        <div className="signInLogin">
          {" "}
          <span>Sign in</span>
        </div>

        <div className="usernameLogin">
          {" "}
          <TextField
            margin="dense"
            size="small"
            name="username"
            id="outlined-required"
            label="username"
            variant="outlined"
            onChange={this.handleUsernameChange}
          />
        </div>
        <span style={{ color: "red" }}>{this.state.error.username}</span>
        <br></br>
        <div className="passwordLogin">
          <TextField
            style={{ width: "100%" }}
            name="password"
            margin="dense"
            size="small"
            id="outlined-adornment-password"
            //   className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            type={this.state.showPassword ? "text" : "password"}
            label="password"
            value={this.state.password}
            onChange={this.handleChange("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sytle={{ width: "1px" }}>
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={this.handleLoginPasswordChange1}
          />
        </div>
        <span style={{ color: "red" }}>{this.state.error.password}</span>
        <div className="buttonLogin">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleloginChange}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleregister}
          >
            Register
          </Button>
        </div>
        <div className="Forgotpassword">
          {" "}
          <Button onClick={this.forgotpassword} style={{textTransform:'lowercase',color: '#0423ce'}}>Forgot Password?</Button>
        </div>
      </div>
    );
  }
}

export default Login;
