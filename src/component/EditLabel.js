import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { Divider} from "@material-ui/core";
import {  Tooltip } from "@material-ui/core";
import { addLabel, DisplayAllLabel, editLabel } from "./Service";
import Editshowordelete from "./Editshowordelete";
import Showeditlabelcreatererame from "./Showeditlabelcreatererame";

class AlertDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allLable: [],
      createLabel: "",
      editlabel: "",
      labelid: "",
      open1: true
    };
  }

  state = {
    open: false
  };
  handleeditdata = label => {
    console.log(label);
    this.setState({
      labelid: label
    });
  };
  handleeditlabel = event => {
    this.setState({
      editlabel: event.target.value
    });
    console.log("ddd" + this.state.editlabel);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  Handlelabeldata = event => {
    this.setState({
      createLabel: event.target.value
    });
  };
  handleClose = () => {
    this.setState({ open: false });

    let token = localStorage.getItem("Token");
    editLabel(this.state.editlabel, this.state.labelid, token)
      .then(Response => {
        console.log("label edit sucess");
        this.props.refresh()
      })
      .catch(err => {
        console.log("label not edit sucess");
      });
  };

  UNSAFE_componentWillMount() {
    this.getAllLabel();
  }
  getAllLabel = () => {
    let token = localStorage.getItem("Token");
    DisplayAllLabel(token)
      .then(Response => {
        let array = [];

        Response.data.data.forEach(element => {
          array.push(element);
        });
        this.setState({
          allLable: array
        });
      })
      .catch(err => {
        console.log("Note not found");
      });
  };
  handleClickCreatelabel = () => {
    console.log("hello" + this.state.createLabel);
    let token = localStorage.getItem("Token");

    addLabel(this.state.createLabel, token)
      .then(Response => {
        console.log("label created..");
        this.props.refresh()
        this.getAllLabel();
      })
      .catch(err => {
        console.log("label not created..");
      });
  };

  render() {
    return (
      <div>
        <div variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Edit labels
        </div>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
                width: "120%"
              }}
            >
              <div style={{ padding: "5%" }}>
                <b>Edit Labels</b>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "row"
                }}
              >
                <Tooltip title="Cancel">
                  <ClearIcon style={{ paddingTop: "10px" }} />
                </Tooltip>
                <TextField
                  id="standard-dense"
                  placeholder="Create new label"
                  margin="dense"
                  style={{ paddingLeft: "5%" }}
                  onChange={this.Handlelabeldata}
                />
                <Tooltip title="Create label">
                  <CheckIcon
                    style={{ paddingLeft: "5%", paddingTop: "10px" }}
                    onClick={this.handleClickCreatelabel}
                  />
                </Tooltip>
              </div>
              <div>
                {this.state.allLable.map(label => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      paddingTop: "5%"
                    }}
                  >
                    <span>
                      <Editshowordelete deleteidprops={label.id}  refresh={this.getAllLabel}/>
                    </span>
                    <span onClick={() => this.handleeditdata(label.id)}>
                      <TextField
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        defaultValue={label.lable_title}
                        multiline
                        fullWidth
                        margin="normal"
                        InputProps={{
                          disableUnderline: true
                        }}
                        onChange={this.handleeditlabel}
                      />
                    </span>
                    <Showeditlabelcreatererame />
                  </div>

                  //
                  //
                ))}
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "5%",
                  paddingBottom: "5%"
                }}
                onClick={this.handleClose}
              >
                Done
              </div>
            </div>
          </Typography>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
