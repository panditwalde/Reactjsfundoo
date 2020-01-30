import React from "react";
import PropTypes from "prop-types";
import Popover from "@material-ui/core/Popover";
import "../Cssfile/addReminder.css";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Divider, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import moment from 'moment'

import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";

import DateFnsUtils from "@date-io/date-fns";
import { addReminder } from "./Service";
import { ADD_REMINDER } from "../Redux/actionType";

const theme = createMuiTheme({
  overrides: {
    MuiPopover: {
      paper: {
        width: "16%"
      }
    }
    // ,
    // typography: {
    //   margin: theme.spacing.unit * 2
    // }
  }
});
class SimplePopover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedReminder: new Date(),
      currentDate: new Date(),
      opensnackbar:false,

    };
  }

  handleClose2 = () => {
    this.setState({
      opensnackbar:false    });
  };

  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  addReminder = () => {
     
  };
  handleClose1=()=>{
    this.setState({
      anchorEl: null
    });
  }
  handleClose = () => {
    // let currentDate = this.state.currentDate;
    // let selectedDate = this.state.selectedReminder;

    // let currentTime = this.state.currentDate.getTime();
    // let selectedTime = this.state.selectedReminder.getTime();

    // console.log("current" + currentDate);
    // console.log("select" + selectedDate);
    // console.log("current" + currentTime);
    // console.log("select" + selectedTime);

    // if (currentDate.localeCompare(selectedDate) === 0) {
    //   if (currentTime < selectedTime) {
    //     this.addReminder();
    //   } else {
    //     alert("Select correct time and date");
    //   }
    // } else {
    //   if (currentDate.localeCompare(selectedDate) < 0) {
    //     this.addReminder();
    //   } else {
    //     alert("Select correct time and date");
    //   }
    // }
    let noteid = this.props.propsnoteid;
    let token = localStorage.getItem("Token");
    let date = this.state.selectedReminder;
    this.props.onSelectReminder1(date);

    console.log("date" + date);

    addReminder(date, noteid, token).then(Response => {
      console.log(Response.data);
      this.props.refresh1()
      this.setState({opensnackbar:true})

    });

    this.setState({
      anchorEl: null
    });
  };


  handleDateChange = date => {
    console.log(date);

    
 
    this.setState({
      selectedReminder: date.toLocaleString()
    });
  };
 


  

  render() {

    const { anchorEl } = this.state;
    const { selectedReminder } = this.state;
    const { currentDate } = this.state;

    

    const open = Boolean(anchorEl);

    return (
      <div>
        <div onClick={this.handleClick} className="pickdatetime">
          <AccessTimeIcon fontSize="inherit" style={{ position: "fixed" }} />
          <span style={{ marginLeft: "32px" }}> Pick date & time</span>
        </div>
        <Popover
          style={{ top: "-150px", borderRadius: "4%", width: "18%" }}
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
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
            <ArrowBackIcon style={{ position: "fixed", fontSize: "22px" }} onClick={this.handleClose1} />
            <span style={{ marginLeft: "32px" }}> Pick date & time</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              padding: "4%"
            }}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <MuiThemeProvider theme={theme}>
                <DatePicker
                  margin="normal"
                  label="Date picker"
                  value={currentDate}
                  onChange={this.handleDateChange}
                />

                <TimePicker
                  margin="normal"
                  label="Time picker"
                  value={currentDate}
                  onChange={this.handleDateChange}
                />
              </MuiThemeProvider>
            </MuiPickersUtilsProvider>
          </div>

          <div
            onClick={this.handleClose}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "4%"
            }}
          >
            Save
          </div>
        </Popover>
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
          message={<span id="message-id">Add Reminder</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose2}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose2}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateToProps = state => {
  return {
    reminder: state.reminder
  };
};
var temp = "hello"

const mapDispatchToProps = dispatch => {
  return {
    addReminders: (temp) => dispatch(ADD_REMINDER(temp))
  };
};
export default SimplePopover;
