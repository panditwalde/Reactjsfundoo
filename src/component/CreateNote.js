import React, { Component } from "react";
import { Paper, InputBase, Card, Button, TextField } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ClearIcon from "@material-ui/icons/Clear";

import "../Cssfile/CreateNote.css";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import { createNote } from "./Service";
import AddArchive from "./AddArchive";
import { Tooltip } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { Divider, IconButton } from "@material-ui/core";
import SetColor from "../component/SetColor";
import AddReminder from "./AddReminder";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Chip from "@material-ui/core/Chip";
import Showmoreoption from "./Showmoreoption";
import Collaborator from "./Collaborator";
import Createcollabrator from "./Createcollabrator";
import { connect } from "react-redux";

export class CreateNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: "",
      description: "",
      allNote: [],
      opensnackbar: false,
      setcolor: "",
      reminders: "",
      collabrators: [],
      Archivenote: false,
      pinunpin: false,
      labelarray: []
    };
  }

  handlesetLabel = labels => {
    console.log("display" + labels);
    console.log("display" + labels.length);


    this.setState({
      labelarray:labels
    });
  };

  handleClose1 = () => {
    this.setState({
      opensnackbar: false
    });
  };
  handleDeleteChange = () => {
    this.setState({ reminders: null });
  };
  handleReminder = reminder => {
    this.setState({ reminders: reminder });
  };
  handlesetColor = color => {
    this.setState({ setcolor: color });
    console.log("color set in parernt" + this.state.setcolor);
  };
  handlesetArchive = archive => {
    this.setState({ Archivenote: archive });
    console.log("color set in parernt" + this.state.Archivenote);
  };

  handleCollabrator = handleCollabrator => {
    this.setState({ collabrators: handleCollabrator });
    console.log("collabrators set in parernt" + this.state.collabrators);
  };

  HandleUnpinChange = () => {
    this.setState({ pinunpin: true });
  };
  HandlePinChange = () => {
    this.setState({ pinunpin: false });
  };
  handleOpenNoteChange = () => {
    this.setState({ open: true });
  };
  handleCloseChange = () => {
    this.setState({ open: false });
  };
  handlechangetitle = event => {
    this.setState({
      title: event.target.value
    });
    console.log(this.state.title);
  };
  handlechangedescription = event => {
    this.setState({
      description: event.target.value
    });
    console.log(this.state.description);
  };


  handleDeleteLabel=(index)=>{

    const list = this.state.labelarray;
    list.splice(index, 1);
    this.setState({ labelarray: list });
  }
  handleClose3 = () => {
    this.setState({ open: false });
  };
  handleOnClickAwayChange = () => {
    this.setState({ open: false });
    let note = {};

    console.log("color set in parernt2" + this.state.setcolor);

    if (note !== null) {
      note.title = this.state.title;
      note.description = this.state.description;
      note.color = this.state.setcolor;
      note.reminder = this.state.reminders;
      note.archive = this.state.Archivenote;
      note.collabrators = this.state.collabrators;
      note.pin = this.state.pinunpin;
      let token = localStorage.getItem("Token");

      createNote(note, token)
        .then(Response => {
          console.log("note  created..");
          this.setState({ opensnackbar: true });
          this.props.refresh();
        })
        .catch(err => {
          console.log("note not created..");
        });
    }
  };

  render() {
    console.log(
      
       
    );
    console.log(this.props.set_Color);

    return (
      <ClickAwayListener>
        <div
          className="createnote"
          onClickAway={this.handleClose3}
          onClose={this.handleClose3}
        >
          <Paper
            style={{
              width: "550px",
              position: "relative",
              margin: "auto",

              backgroundColor: this.state.setcolor
            }}
          >
            {!this.state.open ? (
              <Card>
                <div
                  style={{
                    justifyContent: "space-around",
                    display: "flex",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    overflow: 'hidden',
                    boxShadow: "0 0 0 1px rgba(0, 0, 0, .125)",

                  }}
                >
                  <InputBase
                    color="white"
                    placeholder="Take a note..."
                    onClick={
                      this.state.open
                        ? this.handleCloseChange
                        : this.handleOpenNoteChange
                    }
                  />

                  <CheckBoxOutlinedIcon />
                  <CreateOutlinedIcon />
                  <ImageOutlinedIcon />
                </div>
              </Card>
            ) : (
              <Card>
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    padding: "3%",
                    backgroundColor: this.state.setcolor,
                   


                  }}
                >
                  <TextField
                    id="standard-full-width"
                    style={{ margin: 8 }}
                    color="white"
                    placeholder="Title"
                    name="notetitle"
                    multiline
                    fullWidth
                    margin="normal"
                    InputProps={{
                      disableUnderline: true
                    }}
                    onChange={this.handlechangetitle}
                  />
                  <div style={{ paddingTop: "2%" }}>
                    {this.state.pinunpin !== true ? (
                      <Tooltip title="pin note ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          onClick={this.HandleUnpinChange}
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            fill="#000"
                            d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"
                          />
                        </svg>
                      </Tooltip>
                    ) : (
                      <Tooltip title="unpin note ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          onClick={this.HandlePinChange}
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            fill="#000"
                            d="M17 4a2 2 0 0 0-2-2H9c-1.1 0-2 .9-2 2v7l-2 3v2h6v5l1 1 1-1v-5h6v-2l-2-3V4z"
                          />
                        </svg>
                      </Tooltip>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    paddingLeft: "3%"
                  }}
                >
                  <TextField
                    id="standard-full-width"
                    style={{ margin: 8 }}
                    color="white"
                    multiline
                    fullWidth
                    margin="normal"
                    InputProps={{
                      disableUnderline: true
                    }}
                    color="white"
                    placeholder="Take a Note..."
                    name="takeanote"
                    onChange={this.handlechangedescription}
                  />
                </div>
                {this.state.reminders !== "" ||
                this.state.collabrators.length != 0 ? (
                  <div
                    style={{
                      justifyContent: "spacebetween",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap:'wrap',
                    }}
                  >
                    
                   





                    {this.state.reminders !== null ? (
                      <div
                        style={{
                          paddingLeft:'5%',
                          paddingBottom:'3%'
                        }}
                      >
                        <Chip
                          style={{ backgroundColor: "#rgba(206, 206, 206, 0)" }}
                          label={this.state.reminders}
                          onDelete={this.handleDeleteChange}
                          variant="outlined"
                        />
                      </div>
                    ) : null}


                      
                      
                  
                      {this.state.labelarray.length !== 0
                                     
                        ? this.state.labelarray.map((col,index) => (
                         
                          
                          <div
                          style={{
                            paddingLeft: "5%"
                          }}
                          className="hoverChip"
                        >
                            <Chip
                           
                              size="small"
                              label={col}
                              style={{
                                width: "fit-content"
                              }}
                              icon={
                                <div className="clearButton">
                                   <Tooltip title=" Remove label">
                                  <ClearIcon
                                    onClick={() => this.handleDeleteLabel(index)}
                                    fontSize="small"
                                  />
                                  </Tooltip>
                                </div>
                              }
                              clickable={true}
                            />
                            </div>
                          ))
                        : null}

                  


                      {this.state.collabrators.length != 0
                        ? this.state.collabrators.map(col => (
                            <div
                              style={{
                                paddingLeft: "5%",
                                paddingBottom: "3%"
                              }}
                            >
                              <Tooltip title={col}>
                                <AccountCircleIcon />
                              </Tooltip>
                            </div>
                          ))
                        : null}



                  </div>
                ) : null}

                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    paddingBottom: "13px",
                    paddingLeft: "3%",
                    padding: "3%"
                  }}
                >
                  <AddReminder onSelectReminder={this.handleReminder} />
                  <Createcollabrator
                    onSelectCollabrator={this.handleCollabrator}
                  />
                  <SetColor onSelectColor={this.handlesetColor} />
                  <AddArchive onSelectArchive={this.handlesetArchive} />
                  <Showmoreoption onSelectLabel={this.handlesetLabel} />
                  <Button onClick={this.handleOnClickAwayChange}>
                    <b>close</b>
                  </Button>
                </div>
              </Card>
            )}
          </Paper>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.opensnackbar}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">Note Created</span>}
            action={[
              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={this.handleClose1}
              >
                UNDO
              </Button>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose1}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
      </ClickAwayListener>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.view,
    openDrawer: state.openDrawer,
    set_Color:state.set_Color
  };
};

export default connect(mapStateToProps, null) (CreateNote);
