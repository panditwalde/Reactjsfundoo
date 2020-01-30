import React, { Component } from "react";
import "../Cssfile/TrashNote.css";
import { DisplayAllNotes } from "./Service";
import {Redirect} from 'react-router-dom'
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Card, Tooltip, Button, Snackbar, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ClearIcon from '@material-ui/icons/Clear';
import Chip from "@material-ui/core/Chip";

import Restoretrash from "./Restoretrash";
import DeleteNotepermanent from "./DeleteNotepermanent";
import TextField from "@material-ui/core/TextField";
import {connect} from 'react-redux';

const mapStateToProps= state=>{
  return {
       view:state.view,
       openDrawer:state.openDrawer
  
  }
}

export class TrashNote extends Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem("Token");
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      open: false,
      more: false,
      allNote: []
    };
  }

  getAllNotes = () => {
    let token = localStorage.getItem("Token");

    DisplayAllNotes(token)
      .then(Response => {
        let array = [];
        Response.data.data.forEach(element => {
          if (
            element.trash === true ||
            (element.trash === true && element.archive === true)
          ) {
            array.push(element);
          }
        });
        this.setState({
          allNote: array
        });
      })
      .catch(err => {
        console.log("error");
      });
  };

  UNSAFE_componentWillMount() {
    this.getAllNotes();
  }
  handledisplaynote = () => {
    this.setState({ open: true });
  };
  handleclosenote = () => {
    this.setState({ open: false });
  };

  render() {

      console.log();
      
    if (this.state.loggedIn === false) {

      return <Redirect to="/login"/>  }

    return (
      <div  className={this.props.openDrawer ? "draweropen": "drawerclose"}
        style={{
          width: "800px",
          position: "relative",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          paddingTop: "105px",
          paddingLeft: "7%"
        }}
      >
              {this.state.allNote.length !== 0 ? null : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                opacity: ".3",
                width:'600px',
                alignItems: "center",
                paddingTop: "19%"
              }}
            >
              <DeleteForeverIcon style={{ fontSize: "7.5rem" }} />{" "}
              <b>No notes in Trash</b>{" "}
            </div>
          )}

        {this.state.allNote.map(note => (
          <div className="trashnoted" style={{ padding: 5 }}>
            <Card   className= {this.props.view ?("listview"):("gridview")} 
              style={{
                boxShadow:
                  " 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                borderRadius: "11px",
                 backgroundColor: note.color,
                 padding: "12px"

              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "7px"
                }}
              >
                <div>
                  <b>
                    {" "}
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
                  </b>
                </div>
                <div></div>
              </div>
              <div
                style={{
                  justifyContent: "spacearound",
                  display: "flex",
                  top: "3%",
                  padding: "12px",
                  paddingTop: "11px"
                }}
              >
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
                    flexWrap:'wrap',

                  }}
                >
                  {note.reminder != null ? (
                    <div style={{
                      paddingLeft:'5%',
                      paddingBottom:'3%'
                    }}>
                         <Chip
                        style={{                   
                       backgroundColor: "#rgba(206, 206, 206, 0)" }}
                        label={note.reminder}
                        // label={moment(note.reminder).format('YYYY MMM D, HH:mm A')}

                        onDelete={() => this.handleDelete(note.id)}
                        variant="outlined"
                      /></div>
                
                  ) : null}

                 
                     
                    {note.listOfLabels.length !== 1
                       
                        
                      ? (note.listOfLabels.map(col => (
                           
                          
                         
                         col.lable_title!==null?(   <div    style={{
                          paddingLeft:'5%',
                          paddingBottom:'3%'
                        }} className="hoverChip"><Chip
                          
                        
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
                        /></div>):(null)
                       
                        )))
                      : null}
                
                    {note.collabrators != null
                      ? note.collabrators.map(col => (
                          
                            <div style={{
                              paddingLeft:'5%',
                              paddingBottom:'3%'
                            }}>
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
                    justifyContent: "space-start",
                    display: "flex",
                    padding: "12px",
                    paddingBottom: "13px"
                  }}
                >
                  <DeleteNotepermanent noterestoretrash={note.id}  refresh={this.getAllNotes} />

                  <Restoretrash noterestoretrash={note.id}  refresh={this.getAllNotes} />
                </div>
              </div>
            </Card>

          </div>
        ))}
           
      </div>
    );
  }
}

export  default connect(mapStateToProps) (TrashNote);
