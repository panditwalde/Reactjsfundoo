import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import LabelIcon from "@material-ui/icons/Label";
import { typography } from "@material-ui/system";
import {Tooltip} from "@material-ui/core";
import { deletelabel } from "./Service";

export class editshowordelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }
  handleopenChange = () => {
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
  handledeleteChange = () => {
    console.log("yes");
    let lable_id = this.props.deleteidprops;
    let token = localStorage.getItem("Token");
    console.log(lable_id);

    deletelabel(lable_id, token)
      .then(Response => {
        console.log("label delete ");
        this.props.refresh();
      })
      .catch(err => {
        console.log("label not delete");
      });
  };

  render() {
    return (
      <div
        onMouseOver={this.handleopenChange}
        onMouseLeave={this.handlecloseChange}
      >
        <typography>
          <div>
            {this.state.open === false ? (
              <LabelIcon style={{ paddingTop: "5%" }} />
            ) : (
              <Tooltip title=" delete label">
                <DeleteIcon
                  style={{ paddingTop: "5%" }}
                  onClick={this.handledeleteChange}
                />
              </Tooltip>
            )}
          </div>
        </typography>
      </div>
    );
  }
}

export default editshowordelete;
