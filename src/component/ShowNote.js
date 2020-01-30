import React, { Component } from "react";
import Displaynotes from "./Displaynotes";
import "../Cssfile/Displaynotes.css";

import "../Cssfile/TrashNote.css";
import {Redirect} from 'react-router-dom'
export class ShowNote extends Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem("Token");
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      open: false,
      more: false,
      loggedIn
    };

    
  }

  render() {
      
    if (this.state.loggedIn === false) {

      return <Redirect to="/login"/>  }
    


    return (
      <div>
       

  
       
          
         
                 
            
                <Displaynotes/>
              
               
                         
         
      
      </div>
    );
  }
}

export default ShowNote;
