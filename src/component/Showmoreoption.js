import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import { addIntrash } from "./Service";
import { Tooltip } from "@material-ui/core";
import Addlabel from "./Addlabel";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});

class SimplePopover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Noteid1: "",
      opensnackbar: false,
      labelarray: []
    };
  }
  state = {
    anchorEl: null
  };

  handlesetLabel1 = label => {
    this.setState({ labelarray: label });
    console.log("show more" + label);

    this.props.onSelectLabel(label);
  };
  handleClose1 = () => {
    this.setState({
      opensnackbar: false
    });
  };
  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleDeletenoteChange = () => {
    let token = localStorage.getItem("Token");
    let noteid = this.props.propsdisplaynote;
    this.setState({
      Noteid1: noteid
    });

    addIntrash(noteid, token)
      .then(Response => {
        console.log("add in trash");
        this.setState({ opensnackbar: true });
        console.log("add" + this.state.opensnackbar);

        this.props.refresh();
      })
      .catch(err => {
        console.log("error");
      });
  };

  UNSAFE_componentWillMount() {
    let noteid = this.props.propsdisplaynote;
    this.setState({
      Noteid1: noteid
    });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={this.props.view ? null : "footerpadding"}>
        <Tooltip title=" More">
          <MoreVertOutlinedIcon onClick={this.handleClick} />
        </Tooltip>

        <Popover
          style={{ top: "18px", left: "40px", width: "150px" }}
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
          <Typography
            className={classes.typography}
            style={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              width: "91px"
            }}
          >
            <div
              onClick={this.handleDeletenoteChange}
              style={{
                paddingBottom: "10%"
              }}
            >
              {" "}
              Delete note
            </div>

            <Addlabel
              noteid2={this.state.Noteid1}
              onSelectLabel1={this.handlesetLabel1}
              refresh={this.props.refresh}
            />
          </Typography>
        </Popover>
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
          message={<span id="message-id">note add in trash</span>}
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

SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimplePopover);
