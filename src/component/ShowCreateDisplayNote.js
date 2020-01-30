import React, { Component } from "react";
import Displaynotes from "./Displaynotes";

export class ShowCreateDisplayNote extends Component {
  render() {
    return (
      
      <div className="displaynotess">
        
        {this.state.allNote.map((value, index) => (
          <Displaynotes
            title={this.state.allNote[index].title}
            description={this.state.allNote[index].description}
            id={this.state.allNote[index].id}
          />
        ))}
      </div>
    );
  }
}

export default ShowCreateDisplayNote;
