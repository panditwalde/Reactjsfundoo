import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Checkbox from "@material-ui/core/Checkbox";
import { DisplayAllLabel, addLabelWithnote, updateLabelWithNote } from "./Service";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { Divider, IconButton } from "@material-ui/core";

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});

class SimplePopover extends React.Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem("Token");
    let loggedIn;
    this.state = {
      labelvalue: "",
      allLable: [],
      alllabel1: [],
      opensnackbar: false
    };
  }

  state = {
    anchorEl: null
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
  handleClose1 = () => {
    this.setState({
      opensnackbar: false
    });
  };

  
  HandlelablevalueChange = event => {
    this.setState({
      labelvalue: event.target.value
    });
    let noteid = this.props.noteid2;
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

  handleAdd = labelid => {
    
    let token = localStorage.getItem("Token");
    let noteid = this.props.noteid2;

    updateLabelWithNote(labelid,noteid,token).then(Response=>{
          console.log("assign note");
          this.props.refresh();

          
    }).catch(err=>{
      console.log("error");
      
    })

    
  
  };

  HandlelabelAddChange = () => {
    console.log("ddd");

    let token = localStorage.getItem("Token");
    let noteid = this.props.noteid2;
    let labeldto = {};
    labeldto.lable_title = this.state.labelvalue;

    this.state.alllabel1.push(this.state.labelvalue);
    this.props.onSelectLabel1(this.state.alllabel1);

    labeldto.noteid = noteid;
    addLabelWithnote(labeldto, token)
      .then(Response => {
        console.log("label add with note");
        this.getAllLabel();
        this.setState({ opensnackbar: true });
        this.props.refresh();
      })
      .catch(err => {
        console.log("label add not with note");
      });
  };
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);


    return (
      <div>
        <div
          aria-owns={open ? "simple-popper" : undefined}
          onClick={this.handleClick}
          style={{ paddingRight: "12px" }}
        >
          Add label
        </div>
        <Popover
          style={{ left: "165.492px", top: "-81px" }}
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
          <div style={{ padding: "4.5%" }}>
            <div>Label note</div>
            <div>
              <FormControl className={classes.margin}>
                <Input
                  placeholder="Enter label name"
                  onChange={this.HandlelablevalueChange}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    disableUnderline: true
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            {/* checked={true} */}
            {this.state.allLable !== "" ? (
              <div>
                {this.state.allLable.map(label => (
                  <div>
                    <Checkbox  onClick={()=>this.handleAdd(label.id)} />
                     
                    {label.lable_title}
                  </div>
                ))}
              </div>
            ) : null}
            <Divider />
            {this.state.labelvalue !== "" ? (
              <div>
                <IconButton onClick={this.HandlelabelAddChange}>
                  <AddRoundedIcon />
                </IconButton>
                Create
                <b
                  fullWidth
                  margin="normal"
                  InputProps={{
                    disableUnderline: true
                  }}
                >
                  "{this.state.labelvalue}"
                </b>
              </div>
            ) : null}
          </div>
          {/* </Typography> */}
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
          message={<span id="message-id">new label Created</span>}
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
