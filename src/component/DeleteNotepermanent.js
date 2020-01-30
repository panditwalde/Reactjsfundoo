import React, { Component } from "react";
import { Tooltip } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { deleteNote } from "./Service";

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});
export class DeleteNotepermanent extends Component {
  constructor(props) {
    super(props);

    this.state = {

      open:false
    };
  }
  handleDeleteNoteChange = () => {
   
    let token = localStorage.getItem("Token");
    let noteid = this.props.noterestoretrash;

    deleteNote(noteid, token)
      .then(Response => {
         alert('Delete note forever?')
        console.log("delete successfull");

        this.props.refresh()
        this.setState({open:true})

      })
      .catch(err => {
        console.log("delete not successfull",err);
      });
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Tooltip title="delate Forever">
          <DeleteForeverIcon onClick={this.handleDeleteNoteChange} />
        </Tooltip>
          

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Note archived</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

      </div>
    );
  }
}

export default DeleteNotepermanent;
