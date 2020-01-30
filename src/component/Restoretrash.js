import React, { Component } from "react";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import { Tooltip } from "@material-ui/core";
import {  addIntrash } from "./Service";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
export class Restoretrash extends Component {
  constructor(props) {
    super(props);

    this.state = {

      opensnackbar:false 
    };
  }
  
  handleClose1 = () => {
    this.setState({
      opensnackbar:false    });
  };

  handleDeleteNoteChange = () => {
    this.setState({
      opensnackbar:true,
    })
     
    let token = localStorage.getItem("Token");
    let noteid = this.props.noterestoretrash;
     addIntrash(noteid,token).then(Response=>{
         
         console.log("restore success");
         this.props.refresh()
         this.setState({opensnackbar:true})

       
         
     }).catch(err=>{
        console.log(" not restore success");
     })
     this.setState({
      open:true
    })

  };

  render() {
    return (
      <div>
        <Tooltip title="Restore">
          <RestoreFromTrashIcon
            style={{ paddingLeft: "22px" }}
            onClick={this.handleDeleteNoteChange}
          />
        </Tooltip>


        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.opensnackbar}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Note restore</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose1}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose1}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />


      

      </div>
      
    );
  }
}

export default Restoretrash;
