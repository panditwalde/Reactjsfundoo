import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import "../Cssfile/TrashNote.css";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Divider, InputBase } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import {  Tooltip } from "@material-ui/core";
import {
  addCollabrator,
  DisplayAllNotes,
  removeCollabrator
} from "./Service";
import ClearIcon from "@material-ui/icons/Clear";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { IconButton } from "@material-ui/core";
const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing.unit
  }
});
const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {
        width: "513px",
        height: "1.875em",
        paddingLeft: "8px"
      }
    },
    MuiAvatar: {
      img: {
        width: "43%",
        borderRadius: "50%",
        height: "44%"
      }
    }
  }
});

class MaxWidthDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colaboratorId:"",
      doneopen: false,
      allNote: [],
      notearr: null,
      title: "",
      description: "",
      opensnackbar:false,
      collabratorArray1:[]

    };
  }

 

  state = {
    open: false,
    fullWidth: true,
    maxWidth: "sm"
  };

  donenotClickhandle = () => {
    this.setState({ doneopen: false });

   
    this.state. collabratorArray1.push(this.state.colaboratorId);

    this.props.onSelectCollabrator(this.state.collabratorArray1);

     
     
  };

  doneClickhandle = event => {
    this.setState({ doneopen: true });

       console.log(event.target.value);
       
      
    this.setState({
      colaboratorId: event.target.value
    });

   

      
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };



  handleClose = () => {
    this.setState({ open: false });

    this.props.onSelectCollabrator(this.state.collabratorArray1);
    
  };






  handleMaxWidthChange = event => {
    this.setState({ maxWidth: event.target.value });
  };

  handleFullWidthChange = event => {
    this.setState({ fullWidth: event.target.checked });
  };

  handledeleteclick = colid => {
    const list=this.state.collabratorArray1;
    list.splice(colid,1);
     this.setState({collabratorArray1:list})
      
    console.log("dsssd" + colid);

    let token = localStorage.getItem("Token");
    removeCollabrator(colid, this.props.propsRemindernote, token)
      .then(Response => {
        console.log("remove ");
        this.props.refresh();
      })
      .catch(err => {
        console.log("not remove");
      });
  };

  render() {
    let name1 = localStorage.getItem("Name");
    let email = localStorage.getItem("Email");
    return (
      <React.Fragment>
        <div className= {this.props.view ?(null):("footerpadding")} >
          <Tooltip title="Collaborator" onClick={this.handleClickOpen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#000"
            >
              <path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z" />
            </svg>
          </Tooltip>
        </div>

        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <MuiThemeProvider theme={theme}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "600px",
                flexDirection: "column"
              }}
            >
              <span
                style={{
                  padding: "2%",
                  fontSize: "large",
                  fontFamily: "inherit",
                  fontStyle: "unset"
                }}
              >
                <b>Collaborators</b>
              </span>
              <span style={{ padding: "2%" }}>
                {" "}
                <Divider />
              </span>
              <div
                style={{
                  display: "flex",
                  justifyContent: ""
                }}
              >
                <span>
                  <Avatar
                    alt={localStorage.getItem("Name")}
                    src={localStorage.getItem("ProfilePic")}
                    style={{ width: "77px", height: "77px" }}
                  />
                </span>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column"
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      marginTop: "22px"
                    }}
                  >
                    <b>{name1}(Owner)</b>
                    <i>{email}</i>
                  </span>
                </div>
              </div>
              <span style={{ padding: "1%" }}>
                {this.state.collabratorArray1.length !== 0
                  ? this.state.collabratorArray1.map((colid,index) => (
                      <div
                        style={{
                          display: "flex",
                          paddingLeft: "10px",
                          flexDirection: "row",
                          paddingTop: "3px",
                          justifyContent: "flex-start"
                        }}
                      >
                        <Avatar></Avatar>
                        <div
                          style={{
                            display: "flex",
                            paddingLeft: "10px",
                            flexDirection: "row",
                            paddingTop: "3px",
                            justifyContent: "space-between"
                          }}
                        >
                          <div style={{ display: "flex",justifyContent:'space-between', marginTop: "9px" }}>
                            <b>{colid}</b>
                            <Tooltip title="delete">
                              <ClearIcon
                                onClick={() => this.handledeleteclick(index)}
                              />
                            </Tooltip>
                          </div>
                        
                        </div>
                      </div>
                   ))
                  : null} 
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "1%"
                }}
              >
                <span style={{ marginLeft: "9px" }}>
                  <Avatar>
                    <PersonAddIcon />
                  </Avatar>
                </span>
                <span>
                  <InputBase
                    width="600px"
                    id="standard-basic"
                    placeholder="Person or email to share with"
                    onChange={this.doneClickhandle}
                  />
                </span>
                {this.state.doneopen !== false ? (
                  <span style={{ paddingRight: "6px" }}>
                    <DoneOutlinedIcon onClick={this.donenotClickhandle} />
                  </span>
                ) : null}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end ",
                  flexDirection: "row",
                  padding: " 3%"
                }}
              >
                <span
                  style={{ marginRight: "56px" }}
                  onClick={this.handleClose}
                >
                  Cancel
                </span>
                <span onClick={this.handleClose}>Save</span>
              </div>
            </div>
          </MuiThemeProvider>
        </Dialog>

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
          message={<span id="message-id">new label Created</span>}
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
      </React.Fragment>
    );
  }
}

MaxWidthDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MaxWidthDialog);
