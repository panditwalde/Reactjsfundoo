import React, { Component } from "react";
import { Card, Tooltip, DialogContent, Button } from "@material-ui/core";
import "../Cssfile/Displaynotes.css";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ReplayOutlinedIcon from "@material-ui/icons/ReplayOutlined";
import RedoOutlinedIcon from "@material-ui/icons/RedoOutlined";
import {Dialog,DialogTitle} from '@material-ui/core';
import { DisplayAllNotes, editNote } from "./Service";
import Showmoreoption from "./Showmoreoption";
import AddArchive from "./AddArchive";
import "../Cssfile/TrashNote.css";
import TextField from "@material-ui/core/TextField";
export class EditNote extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
         
      notedetail:this. props.noteprops1
       
    }
  }
 
  render() {

      
    return (
      <div>
     {this.state.notearr !== null ? (
            <div className="trashnoted" style={{ padding: 5 }}>
              <Card
                style={{
                  width: "484px",
                  boxShadow: "2px 2px 8px rgba(0,0,0,0.2)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px"
                  }}
                >
                  <div>
                    <TextField
                      id="standard-full-width"
                      style={{ margin: 8 }}
                      value={this.notearr.title}
                      multiline
                      fullWidth
                      margin="normal"
                      InputProps={{
                        disableUnderline: true
                      }}
                      onChange={this.HandleUpdateTitleChange}
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
                    display: "flex",
                    padding: "12px"
                  }}
                >
                  {" "}
                  <TextField
                    id="standard-full-width"
                    style={{ margin: 8 }}
                    value={this.notearr.description}
                    multiline
                    fullWidth
                    margin="normal"
                    InputProps={{
                      disableUnderline: true
                    }}
                    onChange={this.HandleUpdateDescriptionChange}
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
                    <Tooltip title=" Change color">
                      <PaletteOutlinedIcon />
                    </Tooltip>
                    <AddArchive propsarchivenote={this.state.notearr.id} />
                    <Tooltip title=" More">
                      <Showmoreoption
                        propsdisplaynote={this.state.notearr.id}
                      />
                    </Tooltip>
                    <Button onClick={this.handleClose}>close</Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : null}
        
      </div>
    )
  }
}

export default EditNote
