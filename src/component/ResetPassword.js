import React, { Component } from "react";
import "../Cssfile/ResetPassword.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { setNewPassword } from "./Service";
export class ResetPassword extends Component {
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
      password:"",
      confirmpassword:"",
      isvalid:true,
      error:{}
    };

    this.resetpasswordhandle = this.resetpasswordhandle.bind(this);
  }

  handleLastNameChange = event => {
    this.setState({
      lastName: event.target.value
    });
    console.log(this.state.lastName);
  };


  resetpasswordhandle =()=>{
    console.log("ddgfgge");
    
    let error = this.state.error;
    let Password = this.state.password;
    let cofpassword = this.state.confirmpassword;
    let isvalid = this.state.isvalid;

    
      
    if (Password ==="") {
           
      isvalid = false;
      error["Passwordvalid"] = "password is required";
    }

    if (cofpassword ==="") {
      console.log("cfmpassowrddddfgggfddd");
      isvalid = false;
      error["cofpassword"] = "confirm password is required";
    }
    this.setState({
      error: error
    });
    return isvalid;
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
    console.log(this.state.password);
  };
  
  handleconfirmpasswordChange = event => {
    this.setState({
      confirmpassword: event.target.value
    });
    console.log(this.state.confirmpassword);
  };
  
  handleresetpasswordChange = () => {
    

    let token = localStorage.getItem("Token");
    
    
     let array={};

     array.password=this.state.password;
     array.cfmpassword=this.state.confirmpassword;
      
     setNewPassword(token,array).then(Response=>{

      console.log("change password successfull");
      
     }).catch(err=>{
       console.log("not change");
       
     })



  };



  render() {
    return (
      <div className="resetPassword">
        <div className="fundoo1">
          <span style={{ color: "blue" }}>f</span>
          <span style={{ color: "red" }}>u</span>
          <span style={{ color: "orange" }}>n</span>
          <span style={{ color: "blue" }}>d</span>
          <span style={{ color: "green" }}>o</span>
          <span style={{ color: "red" }}>o</span>
        </div>
        <div className="resetPasswordtitle">
          <h2>
            <b>resetpassword</b>
          </h2>
        </div>

        <div className="resetpassword1">
        <TextField
                size="small"
                id="outlined-adornment-password"
                variant="outlined"
                name="password"
                type={this.state.showPassword ? "text" : "password"}
                label="password"
                margin="dense"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sytle={{ width: "1px" }}
                    ></InputAdornment>
                  )
                }}
                onChange={this.handlePasswordChange}
              />
        </div>
        <span style={{ color: "red",justifyContent:"flex-start",display:"flex" }}>{this.state.error.Passwordvalid}</span>
        <div className="password2">
        <TextField
                size="small"
                margin="dense"
                name="cofpassword"
                id="outlined-adornment-password"
                variant="outlined"
                type={this.state.showPassword ? "text" : "password"}
                label=" confirm "
                value={this.state.confPassword}
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
                onChange={this.handleconfirmpasswordChange}
              />
        </div>
        <span style={{ color: "red" ,justifyContent:"flex-start",display:"flex"}}>{this.state.error.cofpassword }</span>

        <div className="Resetbutton">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleresetpasswordChange}
          >
            submit
          </Button>
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
