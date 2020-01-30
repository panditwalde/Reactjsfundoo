import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import "../Cssfile/addReminder.css";
import Datetimepicker from "./Datetimepicker";
import {  Tooltip } from "@material-ui/core";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Divider, IconButton } from "@material-ui/core";

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});

class SimplePopover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usernoteid: "",
      opensnackbar:false,
      reminders:''

    };
  }

  state = {
    anchorEl: null
  };

  handleReminder1=(reminder1)=>{
    this.setState({reminders:reminder1})
    
 }
  handleClick = event => {
    let noteid = this.props.propsRemindernote;
    this.setState({ usernoteid: noteid });
    console.log("noteid" + noteid);

    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose1 = () => {
    this.setState({
      opensnackbar:false    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
    console.log("add reminder"+ this.state.reminders);
    this.props.onSelectReminder(this.state.reminders);


  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    

    return (
      <div  >
        <Tooltip title="Remind me">
          <AddAlertOutlinedIcon onClick={this.handleClick} />
        </Tooltip>

        <Popover
        
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <div className="main">
            <div
              onClick={this.handleClose}
              className="today"
              style={{ fontSize: "20px" }}
            >
              Reminder :
            </div>
            <div className="today" onClick={this.handleClose}>
              <div> Later today</div>
              <div>Mon,8:00 PM</div>
            </div>

            <div className="today"   onClick={this.handleClose}>
              <div>Tomorrow</div>
              <div>Thu,8:00 PM</div>
            </div>

            <div className="today"   onClick={this.handleClose}>
              <div>Next week</div>
              <div>Fri,8:00 PM</div>
            </div>
          </div>
          <Datetimepicker
              onClick={this.handleClose}
            propsnoteid={this.state.usernoteid}
            refresh1={this.props.refresh}
            onSelectReminder1={this.handleReminder1}
          />
        </Popover>
      </div>
    );
  }
}

SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimplePopover);
