import React, { Component } from "react";
import { Tooltip } from "@material-ui/core";
import { addInArchive } from "./Service";
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { Divider, IconButton } from "@material-ui/core";
import "../Cssfile/TrashNote.css";

import {

  Button
} from "@material-ui/core";
export class UnArchive extends Component {
 
  constructor(props) {
    super(props)
  
    this.state = {
      opensnackbar:false, snackbarmsg:''

    }
  }
  handleClose1 = (event ) => {
    this.setState({
      opensnackbar:false    });
  };
  
  handleUnarchiveChange = () => {
    let token = localStorage.getItem("Token");
    let noteid = this.props.propsarchivenote;
    console.log(token);
    console.log(noteid);
    addInArchive(noteid, token)
      .then(Response => {
        console.log("note is Unarchive");
        this.setState({opensnackbar:true,snackbarmsg:'note Unarchive'})

        this.props.refresh()

      })
      .catch(err => {
        console.log("error");
      });
  };
  render() {
    return (
      <div  className= {this.props.view ?(null):("footerpadding")}>
        <Tooltip title=" Unarchive">
          <UnarchiveOutlinedIcon onClick={this.handleUnarchiveChange} />
        </Tooltip>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.opensnackbar}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
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

export default UnArchive;
