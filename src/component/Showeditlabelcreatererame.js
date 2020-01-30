import React, { Component } from "react";
import { Tooltip } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

export class Showeditlabelcreatererame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }
  handleopenChange = () => {
    console.log("open");

    this.setState({
      open: true
    });
  };
  handlecloseChange = () => {
    console.log("close");

    this.setState({
      open: false
    });
  };
  render() {
    return (
      <div>
        {this.state.open ? (
          <Tooltip title="Rename label">
            <EditOutlinedIcon
              style={{ paddingTop: "5%" }}
              onClick={this.handlecloseChange}
            />
          </Tooltip>
        ) : (
          <CheckIcon
            style={{ paddingLeft: "5%", paddingTop: "10px" }}
            onClick={this.handleopenChange}
          />
        )}
      </div>
    );
  }
}

export default Showeditlabelcreatererame;
