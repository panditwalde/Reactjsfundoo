import React, { Component } from "react";
import { addIntrash } from "./Service";

export class Addtrash extends Component {
  constructor(props) {
    super(props);

    this.state = {
        Noteid1:'',
        opensnackbar: false,

    };
  }

  handleClose2 = () => {
    this.setState({
      opensnackbar: false
    });
  };

  handleDeletenoteChange = () => {

    let token = localStorage.getItem("Token");
    let noteid = this.props.propsdisplaynote;
    this.setState({
      Noteid1: noteid
    });
    console.log(token);
    console.log(noteid);

    console.log("noteddddd   ggfg" + this.state.Noteid1);
    addIntrash(noteid, token)
      .then(Response => {
        console.log("add in trash");

        this.props.refresh();
        this.setState({ opensnackbar: true });

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
    return (
      <div>
        <div
          onClick={this.handleDeletenoteChange}
        >
          Delete note
        </div>

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
          message={<span id="message-id">Add in trash</span>}
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

export default Addtrash;
