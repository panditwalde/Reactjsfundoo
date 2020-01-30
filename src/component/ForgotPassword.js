import React, { Component } from 'react'
import '../Cssfile/ForgotPassword.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { forgotPassword } from './Service';


export class ForgotPassword extends Component {

      constructor(props) {
          super(props)
      
               this.state = {
               showPassword: false,
               emailuser:"",
               email:"",
               isvalid:true,
               error:{}
          };
          this.ForgotPasswordhandle=this.ForgotPasswordhandle.bind(this);

      }      
      ForgotPasswordhandle =()=>{
        
          

        let error=this.state.error;
        let emaild=this.state.email
        let isvalid=this.state.isvalid
        var emailPattern = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\. [A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")

        if(emailPattern.test(emaild)===false){
          
                  
           isvalid=false
           error["email"]="Your email address is invalid"
        }
        this.setState({
            error: error
          });
          return isvalid;
     
      };
    

    handleemailchange = event => {
        this.setState({
          email: event.target.value
        });
        console.log(event.target.value);
      };

      handleforgotpassword  = () => {


        // if(this.ForgotPasswordhandle()==true){
           
            forgotPassword(this.state.email).then(Response =>{
              console.log("a"+Response.data.data);
              alert(" verfication link send  your email id");
          
              

              localStorage.setItem("Token",Response.data.data)
            })
            .catch(err => {
              console.log(Response, "user login fail");
              alert(`${Response.data}`);
            });


        // }
      };
    handlecancel=()=>{
      
        this.props.history.push("/")
    }
    render() {
        return (
            <div className="userForgotPassword">
                 <div className="fundooLogin">
                 <span style={{ color: "blue" }}>f</span>
                 <span style={{ color: "red" }}>u</span>
                 <span style={{ color: "orange" }}>n</span>
                 <span style={{ color: "blue" }}>d</span>
             <span style={{ color: "green" }}>o</span>
          <span style={{ color: "red" }}>o</span>
          </div>
                <div className="ForgotPasswordtitle">ForgotPassword</div>

                <div className="emailtext">
                <TextField id="outlined-search"  margin="dense"
                    size="small" label="Enter the Email id" type="search" variant="outlined" 
                    name="email"
                   
                    onChange = {this.handleemailchange}
              />
                </div>
                <span style={{color:"red"}}>{this.state.error.email}</span>
                <div className="forgotbutton">
                    <Button variant="contained" color="primary" onClick={this.handleforgotpassword}>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={this.handlecancel}>
                        Cancel
                  </Button>
                </div>
            </div>
        )
    }
}

export default ForgotPassword
