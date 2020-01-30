import React, { Component } from "react";
import {
  IconButton,
  Drawer,
  createMuiTheme,
  List,
  ListItem,
  ListItemIcon,
  Divider
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { MuiThemeProvider } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import { DisplayAllLabel } from "./Service";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import EditLabel from "./EditLabel";
import "../Cssfile/Drawer.css";
import { label_id, drawer, openDrawer } from "../Redux/action";
import { connect } from "react-redux";

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        marginTop: "70px",
        width: "20%"
      }
    }
  }
});

export class MyDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      AnchorEl: null,
      allLable: []
    };
  }
  handleDrawer = event => {

    this.props.openDrawer();

    const { currentTarget } = event;
    this.setState({
      AnchorEl: currentTarget,
      open: !this.state.open
    });
  };

  componentWillMount() {
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
        console.log("label not found");
      });
  };

  render() {
    let open = this.state.open;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <IconButton onClick={this.handleDrawer}>
            <MenuIcon />
          </IconButton>
          <div style={{ textAlign: "initial" }}>
            <Drawer variant="persistent" anchor="left" open={open}>
              <List>
                <ListItem  className="over"
                  onClick={() => this.props.showNoteclick()}
                  button
                  key="Notes"
                
                >
                  <ListItemIcon>
                    <EmojiObjectsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Notes" />
                </ListItem>

                <ListItem className="over"
                  onClick={() => this.props.reminderClick()}
                  button
                  key="Reminders"
                  className="over"
                >
                  <ListItemIcon>
                    <AddAlertOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reminder" />
                </ListItem>
              </List>
              <Divider></Divider>
              <div
                class="JNdkSc-tJHJj"

                style={{
                  paddingLeft: "10%",
                  paddingTop: "5%",
                  paddingBottom: "5%"
                }}
              >
                Labels
              </div>
              <List>
                {this.state.allLable.map(label => (
                  <ListItem  
                   
                  onClick={() => {
                    console.log('labelid---'+label.id);
                    
                    this.props.label_id(label.id)
                    this.props.handleLabelclick(label)
                  }}
                    button
                    key="label"
                  className="over"
                  >
                    <ListItemIcon>
                      <LabelOutlinedIcon />
                    </ListItemIcon>
                    <div > {label.lable_title}</div>
                  </ListItem>
                ))}
                <ListItem  className="over">
                  <EditOutlinedIcon />
                  <div style={{ paddingLeft: "31px" }}>
                    <EditLabel    refresh={this.getAllLabel} />
                  </div>
                </ListItem>
              </List>
              <Divider></Divider>
              <List   >
                <ListItem
                  onClick={() => this.props.archiveclick()}
                  butto
                  key="Archive"
                  className="over"
                >
                  <ListItemIcon>
                    <ArchiveOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Archive" />
                </ListItem>
                <ListItem  className="over"
                  onClick={() => this.props.trashclick()}
                  button
                  key="Trash"
                 
                >
                  <ListItemIcon>
                    <DeleteOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Trash" />
                </ListItem>
              </List>
            </Drawer>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

var tmp=""
const mapDispatchToProps = dispatch => {
  return {
    
    label_id:(tmp)=>dispatch(label_id(tmp)),
    openDrawer:()=>dispatch(openDrawer()),
    
     
  };

};
export default connect(null, mapDispatchToProps) (MyDrawer);
