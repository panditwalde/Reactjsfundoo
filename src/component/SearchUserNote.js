import React, { Component } from "react";
import CreateNote from "./CreateNote";
import Displaynotes from "./Displaynotes";
import { Card, Tooltip } from "@material-ui/core";
import "../Cssfile/Displaynotes.css";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import Showmoreoption from "./Showmoreoption";
import AddArchive from "./AddArchive";
import "../Cssfile/TrashNote.css";
import TextField from "@material-ui/core/TextField";
import SetColor from "./SetColor";
import { Redirect } from "react-router-dom";

export class SearchUserNote extends Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem("Token");
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = { loggedIn };
  }

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <CreateNote />

        <div
          style={{
            display: "flex",
            width: "800px",
            flexWrap: "wrap",
            flexDirection: "row",
            paddingTop: "90px",
            paddingLeft: "13%"
          }}
        >
          {this.props.location.state.allNote !== null ? (
            this.props.location.state.allNote.map(note => {
              return (
                <div>
                  <div className="trashnoted" style={{ padding: 5 }}>
                    <Card
                      style={{
                        width: "222px",
                        boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                        backgroundColor: note.color
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
                            value={note.title}
                            multiline
                            fullWidth
                            margin="normal"
                            InputProps={{
                              disableUnderline: true
                            }}
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

                      <div className="footerarea">
                        <div
                          style={{
                            justifyContent: "space-around",
                            display: "flex",
                            padding: "12px",
                            paddingBottom: "13px"
                          }}
                        >
                          <Tooltip title="Remind me">
                            <AddAlertOutlinedIcon />
                          </Tooltip>
                          <Tooltip title="Collaborator">
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

                          <SetColor
                            propsColornote={note.id}
                            refresh={this.getAllNotes}
                          />
                          <AddArchive
                            propsarchivenote={note.id}
                            refresh={this.getAllNotes}
                          />
                          <Tooltip title=" More">
                            <Showmoreoption
                              propsdisplaynote={note.id}
                              refresh={this.getAllNotes}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })
          ) : (
            <Displaynotes />
          )}
        </div>
      </div>
    );
  }
}

export default SearchUserNote;
