import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from "@material-ui/core";
import {
  Avatar,
  TextField,
  Dialog,
  DialogTitle,

  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { chanageprofile } from "./Service";
const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

export default function SimplePopover(props) {
  let name = localStorage.getItem("Name");
  let email = localStorage.getItem("Email");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [file, setFile] = React.useState('');
  const [opensnackbar, setopensnackbar] = React.useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleloginChange1 = () => {
    console.log(props);
    localStorage.removeItem("Token")
  console.log(localStorage.getItem("Token"));
  

    props.PropsDashboard.history.push("/");
  };

  const handleClose1 = () => {
    setopensnackbar(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleOpenFileChange = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleFileSubmitChange = () => {

      
    let token = localStorage.getItem("Token");
    const formData = new FormData();
    
    
    formData.append("file",file,file.name);
    console.log(formData);
    chanageprofile(formData, token)
      .then(Response => {
        console.log("profle update success",Response.data.data);
        localStorage.setItem("ProfilePic",Response.data.data);
        setOpenDialog(true);

      })
      .catch(err => {
        console.log("profile not  update",err);
      });
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : null;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Avatar
          alt={name}
          src={localStorage.getItem("ProfilePic")}
          onClick={handleClick}
        />
      </div>
      <Popover
        style={{ top: "5%" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Typography className={classes.typography}>
          <div className="mainprofle">
            <div
              style={{ justifyContent: "center", display: "flex", top: "3%" }}
            >
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                badgeContent={
                  <CameraAltIcon
                    style={{ backgroundColor: "white", borderRadius: "50%" }}
                    onClick={HandleOpenFileChange}
                  />
                }
              >
                <Avatar
                  alt={localStorage.getItem("Name")}
                  src={localStorage.getItem("ProfilePic")}
                  style={{ width: "77px", height: "77px" }}
                />
              </Badge>
            </div>

            <div
              style={{ justifyContent: "center", display: "flex", top: "3%" }}
            >
              <b> {name}</b>
            </div>
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                top: "2%",
                padding: "2%"
              }}
            >
              {email}
            </div>
            <div
              className="profileaccount"
              style={{
                backgroundColor: "#e0e0e0",
                padding: "3% ",
                paddingBottom: "3%",
                borderradius: "10px"
              }}
            >
              Manage Your Fundoo Account
            </div>

            <Divider />
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                padding: "9%"
              }}
            >
              <Button
                variant="contained"
                color="white"
                style={{ justifyContent: "center", display: "flex" }}
                onClick={handleloginChange1}
              >
                sign out
              </Button>
            </div>
            <Divider />
            <div className="profilefooter">
              {" "}
              Privacy Policy . Terms of Service
            </div>
          </div>
        </Typography>
      </Popover>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="changeProfile"
      >
        <DialogTitle id="max-width-dialog-title"
          style={{

            display: 'flex',
            justifyContent: 'center',
            fontSize:' x-large',
            fontfamily: 'monospace',
            fontStyle: 'unset'
          }}
        >changeProfile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection:'column',
                width: '131%'

              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
  
                }}
              >
                <TextField type="file" onChange={handleFileChange}
                
                ></TextField>
              </div>
              <div
               style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection:'row',
                paddingTop: '22%'
              }} 
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleFileSubmitChange}
                >
                  Upload
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCloseDialog}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>


      
    </div>
  );
}
