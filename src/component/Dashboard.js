import React, { Component } from "react";
import "../Cssfile/Dashboard.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import keeplogo from "../image/keeplogo.png";
import keep1 from "../image/1.svg";
import gridview from "../image/gridview.svg";
import SearchIcon from "@material-ui/icons/Search";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import Profile from "../component/Profile";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MyDrawer from "./MyDrawer";
import TextField from "@material-ui/core/TextField";
import { searchNote } from "./Service";
import { Tooltip } from "@material-ui/core";
import { LIST_VIEW, GRID_VIEW } from "../Redux/actionType";
import { connect } from "react-redux";
import { toggleView, label_id } from "../Redux/action";

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        top: "13%"
      }
    },

    PersistentDrawerLeft: {
      drawer: {
        width: "0px"
      }
    }
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      userprofle: false,
      allNote: [],
      SearchData: "",
      list: false
    };
  }

  listviewhandle = () => {
    this.setState({ list: true });
  };
  gridviewhandle = () => {
    this.setState({ list: false });
  };

  handleshowprofile = () => {
    this.setState({ userprofle: true });
  };

  handlehideprofile = () => {
    this.setState({ userprofle: false });
  };

  handleAllReminderNote = () => {
    console.log("reminder method call");
    this.props.history.push("/Dashboard/reminder");
  };
  handleAllTrashnote = () => {
    this.props.history.push("/dashboard/trash");
  };

  handleshowAllNotenote = () => {
    this.props.history.push({
      pathname: "/dashboard/note",
      state: { allNote: this.state.allNote }
    });
  };
  handlesAllArchivenote = () => {
    this.props.history.push("/dashboard/archive");
  };

  showlabelnotehandle = label => {
    console.log(label.id);
    
    //  this.props.label_id(label.id)
     
    console.log(label);
console.log(this.props);

    this.props.history.push({
      pathname: "/dashboard/label/"+ label.lable_title,
      state: { label: label }
    })
  };

  getAllSearchNotes = event => {
    this.setState({
      SearchData: event.target.value
    });

    searchNote(this.state.SearchData)
      .then(Response => {
        this.setState({ allNote: Response.data.data });
        let array = [];
        Response.data.data.forEach(element => {
          if (element.trash === false && element.archive === false) {
            array.push(element);
          }
        });
        this.setState({
          allNote: array
        });
      })
      .catch(err => {
        console.log("error");
      });
    this.props.history.push({
      pathname: "/dashboard/search",
      state: { allNote: this.state.allNote }
    });
  };

  render() {
    return (
      <div className="mainDashboard">
        <MuiThemeProvider theme={theme}>
          <AppBar position="fixed">
            <Toolbar className="toolbar" style={{ backgroundColor: "white" }}>
              <div className="keepAndLogo">
                <div>
                  <MyDrawer
                    handleLabelclick={this.showlabelnotehandle}
                    showNoteclick={this.handleshowAllNotenote}
                    trashclick={this.handleAllTrashnote}
                    reminderClick={this.handleAllReminderNote}
                    archiveclick={this.handlesAllArchivenote}
                  />
                </div>
                <img
                  src={keeplogo}
                  width="50px"
                  height="50px"
                  alt="hello"
                ></img>
                <Typography
                  className="keep"
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  <b style={{ marginLeft: "2%" }}>Fundoo</b>
                </Typography>
              </div>

              <div className="dashboardSearch">
                <div className="dashboardsearchicon">
                  <SearchIcon onClick={this.getAllSearchNotes} />
                </div>
                <div style={{ width: "90%" }}>
                  <TextField
                    color="white"
                    placeholder="Search…"
                    onChange={this.getAllSearchNotes}
                    id="standard-full-width"
                    multiline
                    fullWidth
                    margin="normal"
                    InputProps={{
                      disableUnderline: true
                    }}
                   
                  />
                </div>
              </div>

              <div className="logokeep1">
                <RefreshOutlinedIcon />
                {this.props.view !== true ? (
                  <Tooltip title="Grid view ">
                    <img
                      src={gridview}
     
                      width="22px"
                      height="22px"
                      alt="hello"
                      onClick={() => this.props.toggleView()}
                    ></img>
                  </Tooltip>
                ) : (
                  <Tooltip title="Grid view ">
                    <img
                                                  src={keep1}

                      width="22px"
                      height="22px"
                      alt="hello"
                      onClick={() => this.props.toggleView()}
                    ></img>
                  </Tooltip>
                )}

                <SettingsOutlinedIcon />
              </div>

              <div>
                <Profile PropsDashboard={this.props} />
              </div>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.view
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleView: () => dispatch(toggleView())
  };

};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
