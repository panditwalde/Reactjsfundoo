import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import { addInArchive } from "./Service";
import { Tooltip } from "@material-ui/core";
import {Redirect} from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Divider, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { ADD_ARCHIVE } from "../Redux/actionType";

const styles = theme => ({
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing.unit
  }
});

class MouseOverPopover extends React.Component {
  constructor(props) {
    super(props)
    let token = localStorage.getItem("Token");
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      opensnackbar:false,

    }
  }
  
  state = {
    anchorEl: null
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose1 = () => {
    this.setState({
      opensnackbar:false    });
  };
  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };
  handleaddArchiveChange = () => {
    let token = localStorage.getItem("Token");
    let noteid = this.props.propsarchivenote;
    this.props.onSelectArchive(true);


    addInArchive(noteid, token)
      .then(Response => {
        this.props.refresh()
       

        console.log("note is archive");
        this.setState({opensnackbar:true})

      })
      .catch(err => {
        console.log("error");
      });
  };

  render() {

    
    if (this.state.loggedIn === false) {

      return <Redirect to="/login"/>  }
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className= {this.props.view ?(null):("footerpadding")} >
        {/* <Typography
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={this.handlePopoverOpen}
          onMouseLeave={this.handlePopoverClose}
         
        > */}

            <Tooltip title=" Archive">
              <ArchiveOutlinedIcon  onClick={this.handleaddArchiveChange}    />
            </Tooltip>
        {/* </Typography> */}

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.opensnackbar}
          autoHideDuration={6000}
          onClose={this.handleClose1}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Note Archived</span>}
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
      </div>
    );
  }
}

MouseOverPopover.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateToProps = state => {
  return {
    view: state.view
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addArchive: () => dispatch(ADD_ARCHIVE())
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (MouseOverPopover);
