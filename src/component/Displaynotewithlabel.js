import React, { Component } from "react";
import { labelWithNote } from "./Service";
import { Card, Tooltip, Button, Snackbar, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SetColor from "./SetColor";
import AddReminder from "./AddReminder";
import Chip from "@material-ui/core/Chip";
import Collaborator from "./Collaborator";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddArchive from "./AddArchive";
import Showmoreoption from "./Showmoreoption";
import "../Cssfile/TrashNote.css";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import { connect } from "react-redux";
import ClearIcon from '@material-ui/icons/Clear';
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import UnArchive from "./UnArchive";
import { Dialog } from "@material-ui/core";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class Displaynotewithlabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labelwithnote: [],
      labelid:'',
      notearr: null,

    };
  }
  getAllLabelWithNotes = () => {

    let token = localStorage.getItem("Token");
    let labelid=this.props.location.state.label.id;

    this.setState({labelid:this.props.label_id})
    
    labelWithNote(this.props.label_id, token).then(Response => {
      console.log("label with notes");
      let array = [];
      console.log(Response.data.data);
         
       if( Response.data.data!==null){
        Response.data.data.forEach(element => {
          array.push(element);
        });
        this.setState({
          labelwithnote: array
      
        }, () =>{console.log("labelwithnote",array.slice());
        });

       }
     
     
    });
  };

  componentDidUpdate(prevProps,prevState) {

        
        console.log(prevProps.label_id);
        

      if(this.props.label_id !== prevProps.label_id){
        console.log("in if");
        
        this.setState({
          labelid : this.props.label_id
        })
                  this.getAllLabelWithNotes();
      }
   
  }
  render() {

          
          console.log(this.state.labelwithnote);
        
         
          
     
    return (
      <div          className={this.props.openDrawer ? "draweropen": "drawerclose"}>
        <div
          style={{
            display: "flex",
            width: "800px",
            flexWrap: "wrap",
            flexDirection: "row",
            paddingLeft: "8%",
            paddingTop: "12%"
          }}
        >
          {this.state.labelwithnote.length !== 0 ? null : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                opacity: ".3",
                alignItems: "center",
                paddingLeft: "25%",
                paddingTop: "24%"
              }}
            >
              <LabelOutlinedIcon style={{ fontSize: "7.5rem" }} />{" "}
              <b>No notes with this label yet</b>{" "}
            </div>
          )}
          {this.state.labelwithnote.map(note => (
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
                    flexWrap:'wrap',

                  }}
                >
                  {note.reminder != null ? (
                    <div style={{
                      paddingLeft:'5%',
                      paddingBottom:'3%'                    }}>
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
                          paddingBottom:'3%'                        }} className="hoverChip"><Chip
                          
                        
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
                              paddingBottom:'3%'                            }}>
                            <Tooltip title={col}>
                              <AccountCircleIcon />
                            </Tooltip>
                            </div>
                         
                        ))
                      : null}
                  
                </div>

                <div className="footerarea">
                  <div
                    className= {this.props.view ?("footer1"):("footer2")} 
                  >
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
                        propsdisplaynote={note.id}
                        onSelectLabel={this.handlesetLabel}

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
                  {/* {this.state.notearr.reminder !== null ? ( */}
                  {/* <div>

                     <Chip
                       style={{ backgroundColor: "#dedede" }}
                       label="Deletable Secondary Chip"
                       onDelete={this.handleDelete}
                       variant="outlined"
                     />
                   </div> */}
                  <div
                    style={{
                      justifyContent: "spacearound",
                      display: "flex"
                    }}
                  >
                    <Chip
                      style={{ backgroundColor: "#rgba(206, 206, 206, 0)" }}
                      label={this.state.notearr.reminder}
                      onDelete={() => this.handleDelete(this.state.notearr.id)}
                      variant="outlined"
                    />
                  </div>

                  {/* ):(null)
                 } */}

                  <div className="footerarea">
                    <div
                      style={{
                        justifyContent: "space-around",
                        display: "flex",
                        paddingTop: "13px",
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
                          onSelectLabel={this.handlesetLabel}
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
        <Snackbar
          // key={messageInfo.key}
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
          message={<span id="message-id">{"messageInfo.message"}</span>}
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

const mapStateToProps = state => {
  return {
    label_id: state.label_id,
    openDrawer:state.openDrawer,
    view:state.view,


  };
};



export default connect(mapStateToProps, null) (Displaynotewithlabel);
