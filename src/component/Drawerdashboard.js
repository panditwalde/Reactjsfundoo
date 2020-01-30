import React, { Component } from "react";

export class Drawerdashboard extends Component {
    
    //  toggleDrawer = (side, open) => event => {
    //     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //       return;
    //     }
    

    //     setState({ ...state, [side]: open });
    //   };
      

    //    sideList = side => (
    //     <div
          
    //       role="presentation"
    //       onClick={toggleDrawer(side, false)}
    //       onKeyDown={toggleDrawer(side, false)}
    //     >
    //       <List>
    //         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //           <ListItem button key={text}>
    //             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //             <ListItemText primary={text} />
    //           </ListItem>
    //         ))}
    //       </List>
    //       <Divider />
    //       <List>
    //         {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //           <ListItem button key={text}>
    //             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //             <ListItemText primary={text} />
    //           </ListItem>
    //         ))}
    //       </List>
    //     </div>
    //   );
    



  render() {
    return (
      <div>
        {/* <Button onClick={toggleDrawer("left", true)}>Open Left</Button>
        <SwipeableDrawer
          open={state.left}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {sideList("left")}
        </SwipeableDrawer> */}
      </div>
    );
  }
}

export default Drawerdashboard;
