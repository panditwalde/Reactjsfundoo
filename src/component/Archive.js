import React, { Component } from "react";
import { Card, Tooltip, Button, Snackbar, Typography } from "@material-ui/core";
import "../Cssfile/Displaynotes.css";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import { Dialog } from "@material-ui/core";
import {
  DisplayAllNotes,
  editNote,
  removeReminder,
  pinUnpin,
  deletelabel
} from "./Service";
import Showmoreoption from "./Showmoreoption";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import AddArchive from "./AddArchive";
import "../Cssfile/TrashNote.css";
import TextField from "@material-ui/core/TextField";
import SetColor from "./SetColor";
import AddReminder from "./AddReminder";
import Chip from "@material-ui/core/Chip";
import CreateNote from "./CreateNote";
import Collaborator from "./Collaborator";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import UnArchive from "./UnArchive";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

const mapStateToProps = state => {
  return {
    view: state.view,
    openDrawer: state.openDrawer
  };
};

export class Displaynotes extends Component {
  queue = [];
  constructor(props) {
    super(props);
    let token = localStorage.getItem("Token");
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }

    this.state = {
      open: false,
      dialogOpen: false,
      more: false,
      allNote: [],
      notearr: null,
      title: "",
      description: "",
      pinUnpinArray: [],
      loggedIn,
      opensnackbar: false,
      messageInfo: {},
      Snackbarmsg: "",
      labelarray: []
    };
  }

  handlesetArchive = archive => {};

  handlesetLabel = labels => {
    console.log("display" + labels);

    this.setState({
      labelarray: labels
    });
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        opensnackbar: true
      });
    }
  };
  handleExited = () => {
    this.processQueue();
  };

  handleDeleteLabel = id => {
    console.log(id);

    let token = localStorage.getItem("Token");

    deletelabel(id, token)
      .then(Response => {
        console.log("remove label");
        this.setState({ opensnackbar: true, Snackbarmsg: "remove label" });

        this.getAllNotes();
      })
      .catch(err => {
        console.log("remove label");
      });
  };

  handleReminder = reminder => {};
  handleUpdatetitle = event => {
    this.setState({
      title: event.target.value
    });
    console.log("ddd" + this.state.title);
  };

  handleUpdatedescription = event => {
    this.setState({
      description: event.target.value
    });
    console.log(this.state.description);
  };

  handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ opensnackbar: false });
  };
  handleClose = () => {
    console.log("close ");
    this.setState({
      dialogOpen: false
    });

    let updatenote = {};
    console.log(this.state.title);
    console.log(this.state.description);

    updatenote.title = this.state.title;
    updatenote.description = this.state.description;
    let token = localStorage.getItem("Token");
    let noteid = this.state.notearr.id;

    editNote(updatenote, noteid, token)
      .then(Response => {
        let message = "Note update successfully ";
        console.log("update note");

        this.getAllNotes();
        this.queue.push({
          message,
          key: new Date().getTime()
        });
        this.setState({ opensnackbar: true, Snackbarmsg: message });
      })
      .catch(err => {
        console.log("not update note");
      });
  };

  getAllNotes = () => {
    let token = localStorage.getItem("Token");

    DisplayAllNotes(token)
      .then(Response => {
        let array = [];
        let array1 = [];
        Response.data.data.forEach(element => {
          if (element.archive === true && element.trash === false) {
            array.push(element);
          }
        });
        this.setState({
          allNote: array
        });

        console.log("a" + array);

        this.setState({
          pinUnpinArray: array1
        });
        console.log("b" + this.state.pinUnpinArray);
      })
      .catch(err => {
        console.log("error");
      });
  };

  handleDialogOpen = note => {
    console.log(note);
    this.setState({
      dialogOpen: !this.state.dialogOpen,
      notearr: note
    });
  };

  handlesetColor = color => {};

  handlepinunpin = noteid => {
    console.log("dd");

    let message = "pin change";

    let token = localStorage.getItem("Token");
    pinUnpin(token, noteid)
      .then(Response => {
        console.log("pinunpin done");

        this.getAllNotes();
        this.setState({ opensnackbar: true, Snackbarmsg: message });
      })
      .catch(err => {
        console.log("not done error");
      });
  };

  handleDelete = noteid => {
    let message = "remove reminder";

    let token = localStorage.getItem("Token");
    removeReminder(noteid, token)
      .then(Response => {
        console.log("remove reminder");
        this.getAllNotes();
        this.queue.push({
          message,
          key: new Date().getTime()
        });
        this.setState({ opensnackbar: true, Snackbarmsg: message });
      })
      .catch({
        // console.log("fail..");
      });
  };

  UNSAFE_componentWillMount() {
    this.getAllNotes();
    console.log("ddd" + this.props.drawer);
    console.log("ddd" + this.props.view);
  }

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { messageInfo } = this.state;

    console.log(this.state.pinUnpinArray);
    console.log(this.props.openDrawer);

    return (
      <div className={this.props.openDrawer ? "draweropen" : "drawerclose"}>
        <div
          style={{
            display: "flex",
            width: "800px",
            flexWrap: "wrap",
            flexDirection: "row",
            // paddingLeft: "8%",
            paddingTop: "12%"
          }}
        >
          {this.state.allNote.length !== 0 ||
          this.state.pinUnpinArray.length !== 0 ? null : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                opacity: ".3",
                width: "800px",
                alignItems: "center",
                paddingTop: "19%"
              }}
            >
              <ArchiveOutlinedIcon style={{ fontSize: "7.5rem" }} />{" "}
              <b>Your Archive notes appear here</b>{" "}
            </div>
          )}

          <div
            style={{
              display: "flex",
              width: "800px",
              flexWrap: "wrap",
              flexDirection: "row",
              paddingLeft: "8%",
              paddingTop: "6%"
            }}
          >
            {this.state.allNote.map(note => (
              <div className="trashnoted" style={{ padding: 5 }}>
                <Card
                  className={this.props.view ? "listview" : "gridview"}
                  style={{
                    boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                    backgroundColor: note.color,
                    borderRadius: "10px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "2%"
                    }}
                  >
                    <div>
                      <TextField
                        onClick={() => this.handleDialogOpen(note)}
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        value={note.title}
                        multiline
                        fullWidth
                        margin="normal"
                        InputProps={{
                          disableUnderline: true
                        }}
                      />
                    </div>
                    <div
                      className="footerarea"
                      onClick={() => this.handlepinunpin(note.id)}
                      style={{ paddingTop: "1%" }}
                    >
                      <Tooltip title="pin note ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            fill="#000"
                            d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"
                          />
                        </svg>
                      </Tooltip>
                    </div>
                  </div>
                  <div
                    style={{
                      justifyContent: "spacearound",
                      display: "flex",
                      padding: "2%"
                    }}
                    onClick={() => this.handleDialogOpen(note)}
                  >
                    {" "}
                    <TextField
                      id="standard-full-width"
                      style={{ margin: 8 }}
                      value={note.description}
                      multiline
                      fullWidth
                      margin="normal"
                      InputProps={{
                        disableUnderline: true
                      }}
                    />
                  </div>

                  <div
                    style={{
                      justifyContent: "spacebetween",
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      paddingLeft: "5%"
                    }}
                  >
                    {note.reminder != null ? (
                      <Chip
                        style={{ backgroundColor: "#rgba(206, 206, 206, 0)" }}
                        label={note.reminder}
                        // label={moment(note.reminder).format('YYYY MMM D, HH:mm A')}

                        onDelete={() => this.handleDelete(note.id)}
                        variant="outlined"
                      />
                    ) : null}

                    {note.listOfLabels.length !== 1
                      ? note.listOfLabels.map(col =>
                          col.lable_title !== null ? (
                            <Chip
                              onClick={() => this.handleDeleteLabel(col.id)}
                              size="small"
                              label={col.lable_title}
                              style={{
                                width: "95px"
                              }}
                              icon={
                                <div className="clearButton">
                                  <ClearIcon
                                    onClick={() =>
                                      this.handleDeleteLabel(col.id)
                                    }
                                    fontSize="small"
                                  />
                                </div>
                              }
                              clickable={true}
                            />
                          ) : null
                        )
                      : null}

                    {note.collabrators != null
                      ? note.collabrators.map(col => (
                          <Tooltip title={col}>
                            <AccountCircleIcon />
                          </Tooltip>
                        ))
                      : null}
                  </div>

                  <div className="footerarea" style={{ paddingTop: "4%" }}>
                    <div className={this.props.view ? "footer1" : "footer2"}>
                      <AddReminder
                        propsRemindernote={note.id}
                        refresh={this.getAllNotes}
                        onSelectReminder={this.handleReminder}
                      />
                      <Collaborator
                        propsRemindernote={note.id}
                        propscollbratorid={
                          note.collabrators !== null ? note.collabrators : null
                        }
                        refresh={this.getAllNotes}
                      />

                      <SetColor
                        propsColornote={note.id}
                        refresh={this.getAllNotes}
                        onSelectColor={this.handlesetColor}
                      />
                      <UnArchive
                        propsarchivenote={note.id}
                        refresh={this.getAllNotes}
                        onSelectArchive={this.handlesetArchive}
                      />
                      <Tooltip title=" More">
                        <Showmoreoption
                          onSelectLabel={this.handlesetLabel}
                          propsdisplaynote={note.id}
                          refresh={this.getAllNotes}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              </div>
            ))}

            <Dialog
              open={this.state.dialogOpen}
              onClose={this.handleClose}
              aria-labelledby="simple-dialog-title"
              style={{ width: "100%" }}
            >
              {this.state.notearr !== null ? (
                <div className="trashnoted" style={{ padding: 5 }}>
                  <Card
                    style={{
                      width: "484px",
                      boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                      backgroundColor: this.state.notearr.color
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <TextField
                          id="standard-full-width"
                          style={{ margin: 8 }}
                          defaultValue={this.state.notearr.title}
                          multiline
                          fullWidth
                          margin="normal"
                          InputProps={{
                            disableUnderline: true
                          }}
                          onChange={this.handleUpdatetitle}
                        />
                      </div>

                      <div className="footerarea">
                        <Tooltip title="pin note ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                              fill="#000"
                              d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z"
                            />
                          </svg>
                        </Tooltip>
                      </div>
                    </div>
                    <div
                      style={{
                        justifyContent: "spacearound",
                        display: "flex"
                      }}
                    >
                      <TextField
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        defaultValue={this.state.notearr.description}
                        multiline
                        fullWidth
                        margin="normal"
                        InputProps={{
                          disableUnderline: true
                        }}
                        onChange={this.handleUpdatedescription}
                      />
                    </div>
                    <div
                      style={{
                        justifyContent: "spacebetween",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap"
                      }}
                    >
                      {this.state.notearr.reminder != null ? (
                        <div
                          style={{
                            paddingLeft: "5%",
                            paddingBottom: "3%"
                          }}
                        >
                          <Chip
                            style={{
                              backgroundColor: "#rgba(206, 206, 206, 0)"
                            }}
                            label={this.state.notearr.reminder}
                            // label={moment(note.reminder).format('YYYY MMM D, HH:mm A')}

                            onDelete={() =>
                              this.handleDelete(this.state.notearr.id)
                            }
                            variant="outlined"
                          />
                        </div>
                      ) : null}

                      {this.state.notearr.listOfLabels.length !== 1
                        ? this.state.notearr.listOfLabels.map(col =>
                            col.lable_title !== null ? (
                              <div
                                style={{
                                  paddingLeft: "5%",
                                  paddingBottom: "3%"
                                }}
                                className="hoverChip"
                              >
                                <Chip
                                  size="small"
                                  label={col.lable_title}
                                  style={{
                                    width: "fit-content"
                                  }}
                                  icon={
                                    <div className="clearButton">
                                      <Tooltip title=" Remove label">
                                        <ClearIcon
                                          onClick={() =>
                                            this.handleDeleteLabel(col.id)
                                          }
                                          fontSize="small"
                                        />
                                      </Tooltip>
                                    </div>
                                  }
                                  clickable={true}
                                />
                              </div>
                            ) : null
                          )
                        : null}

                      {this.state.notearr.collabrators != null
                        ? this.state.notearr.collabrators.map(col => (
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

                    <div className="footerarea">
                      <div
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                          paddingTop: "13px",
                          paddingBottom: "13px"
                        }}
                      >
                        <AddReminder
                          propsRemindernote={this.state.notearr.id}
                          refresh={this.getAllNotes}
                          onSelectReminder={this.handleReminder}
                        />
                        <Collaborator
                          propsRemindernote={this.state.notearr.id}
                          propscollbratorid={
                            this.state.notearr.collabrators !== null
                              ? this.state.notearr.collabrators
                              : null
                          }
                          refresh={this.getAllNotes}
                        />
                        <SetColor
                          propsColornote={this.state.notearr.id}
                          refresh={this.getAllNotes}
                          onSelectColor={this.handlesetColor}
                        />
                        <AddArchive
                          propsarchivenote={this.state.notearr.id}
                          refresh={this.getAllNotes}
                          onSelectArchive={this.handlesetArchive}
                        />
                        <Tooltip title=" More">
                          <Showmoreoption
                            propsdisplaynote={this.state.notearr.id}
                            refresh={this.getAllNotes}
                          />
                        </Tooltip>
                        <Button onClick={this.handleClose}>close</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : null}
            </Dialog>
          </div>
        </div>
        <Snackbar
          key={messageInfo.key}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.opensnackbar}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.Snackbarmsg}</span>}
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
    );
  }
}

export default connect(mapStateToProps, null)(Displaynotes);
