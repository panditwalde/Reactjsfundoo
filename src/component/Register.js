import React, { Component } from "react";
import "../Cssfile/Register.css";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import fundoo from "../image/account.svg";
import { UserRegistration } from "./Service";

export class Register extends Component {
  constructor(props) { 
    super(props);

    this.state = {
      showPassword: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      confPassword: "",
      isvalid:true,
      error:{}
    };
    // this.Registerhandle=this.Registerhandle.bind(this);
  }
  Registerhandle =()=>{
    
    var emailPattern = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\. [A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
    var phonepattern=new RegExp("(0/91)?[7-9][0-9]{9}") 

    let error=this.state.error;
    let firstname=this.state.firstName
    let lastname=this.state.lastName
    let email=this.state.email
    let phonenumber=this.state.phoneNumber
   
    let password=this.state.password
    let cofpassword=this.state.confPassword
    let isvalid=this.state.isvalid
    console.log(firstname);
    console.log(phonenumber );
    
    if(firstname===""){

      console.log("firstname");      
      isvalid=false;
      error["firstname"]="First name is required";
    }


    if(lastname ===""){
      console.log("lastname");
       isvalid=false
       error["lastname"]="Last name is  required"
    }

    if(emailPattern.test(email)===false){
       console.log("email");
       
      isvalid=false
      error["email"]="Your email address is invalid"
   }
   
   console.log(phonenumber.length);
   
   if(phonepattern.test(phonenumber)===false){

    isvalid=false
    error["phonenumber"]="moible number should be  10 digit"
 }

 if(password===""){
  console.log("password");
  isvalid = false;
  error["password"] = "Password is required";
}

if(cofpassword===""){
  console.log("cfmpassword");
  
  isvalid = false;
  error["cofpassword"] = "confirm password  is required";
}

    this.setState({
        error:error
    });

    return isvalid;
  };

  alreadyregister = () => {
    this.props.history.push("/");
  };
  handelRegister = () => {
     if(this.Registerhandle()===true){
       console.log(this.state.password ); 
       console.log( this.state.confPassword);
       
       
    if (this.state.password === this.state.confPassword) {
   
      let user = {};
      user.firstname = this.state.firstName;
      user.lastname = this.state.lastName;
      user.email = this.state.email;
      user.password = this.state.password;
      user.phonenumber = this.state.phoneNumber;
      console.log(user);
      
      UserRegistration(user)
        .then(Response => {
          console.log(Response, "user registered success");
          alert(`${Response.data.message}`);

          this.props.history.push("/");
        })
        .catch(err => {
          console.log(Response, "registration fail");
           alert("Email id already Registered");
        });
    } else {

      alert("both passwords should be same");
    }}
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handelFirstNameChange = event => {
    this.setState({
      firstName: event.target.value
    });
    console.log(this.state.firstName);
  };
  handleLastNameChange = event => {
    this.setState({
      lastName: event.target.value
    });
    console.log(this.state.lastName);
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
    console.log(this.state.email);
  };

  handelPhonenoChange = event => {
    this.setState({
      phoneNumber: event.target.value
    });
    console.log(this.state.phoneNumber);
  };

  handlePassowrdChange = event => {
    this.setState({
      password: event.target.value
    });
    console.log(this.state.password);
  };
  handlecfrmpasswordChange = event => {
    this.setState({
      confPassword: event.target.value
    });
    console.log(this.state.confPassword);
  };

  render() {
    return (
      <div className="userregister">
        <div className="userfundoo">
          <span style={{ color: "blue" }}>f</span>
          <span style={{ color: "red" }}>u</span>
          <span style={{ color: "orange" }}>n</span>
          <span style={{ color: "blue" }}>d</span>
          <span style={{ color: "green" }}>o</span>
          <span style={{ color: "red" }}>o</span>
        </div>
        <div className="userSignUp">SignUp</div>
        <div className="main" style={{flexDirection:'row'}}>
          <div>
            <div className="userfirstlastname">
              <TextField
                margin="dense"
                size="small"
                name="firstname"
                id="outlined"
                label="First Name"
                variant="outlined"
                style={{ width: "44%" }}
                onChange={this.handelFirstNameChange}
              />
              <TextField
                margin="dense"
                size="small"
                name="lastname"
                required
                id="outlined"
                label="Last Name"
                variant="outlined"
                style={{ width: "44%" }}
                onChange={this.handleLastNameChange}
              />
            </div>
            <div className="passwordvalid">
                 <span style={{color:"red"}}>{this.state.error.firstname}</span>
                 <span style={{color:"red"}}>{this.state.error.lastname}</span>
            </div>
            <div className="useremail1">
              <TextField
                margin="dense"
                size="small"
                name="email"
                id="outlined"
                label="Email"
                variant="outlined"
                onChange={this.handleEmailChange}
              />
               <span style={{color:"red", justifyContent:"flex-start",display:"flex"}}>{this.state.error.email}</span>
            </div>
            <div className="phoneNumber">
              <TextField
                  margin="dense"
                size="small"
                className="phoneNumber"
                name="phonenumber"
                id="outlined"
                label="Phone Number"
                variant="outlined"
               
                onChange={this.handelPhonenoChange}
              />
            </div>
            <span style={{color:"red",  justifyContent:"flex-start",display:"flex"}}>{this.state.error.phonenumber}</span>

            <div className="userPassword">
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
                style={{ width: "44%" }}
                onChange={this.handlePassowrdChange}
              />
              <br></br>
          

              
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
                style={{ width: "44%" }}
                onChange={this.handlecfrmpasswordChange}
              />


            </div>
            <div className="passwordvalid">
                 <span style={{color:"red"}}>{this.state.error.password}</span>
                 <span style={{color:"red"}}>{this.state.error.cofpassword}</span>
            </div>
           
            <div className="userbutton">
              <Button
                margin="dense"
                size="small"
                variant="contained"
                color="primary"
                onClick={this.handelRegister}
              >
                Submit
              </Button>
              <Button onClick={this.alreadyregister}>
                Already Registered?
              </Button>
            </div>
          </div>

          <div className="img1">
            <img src={fundoo} width="80%" height="60%" alt="hello"></img>
            <p style={{ alignItems: "center" }}>
              One account.All of Fundoo working for you
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;