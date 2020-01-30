import React from "react";
import "./App.css";
import Login from "./component/Login";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Trash from "./component/Trash";
import ShowNote from "./component/ShowNote";
import Archive from "./component/Archive";
import SetColor from "./component/SetColor";
import ProfileUpload from "./component/ProfileUpload";
import SearchUserNote from "./component/SearchUserNote";
import Addlabel from "./component/Addlabel";
import editshowordelete from "./component/Editshowordelete";
import Practiece from "./component/Practiece";
import Displayallreminder from "./component/Displayallreminder";
import  {Provider} from 'react-redux'
import store from './Redux/Store'
import Displaynotewithlabel from "./component/Displaynotewithlabel";

function App() {
  return (

      <Provider store={store}>
    <div className="App">
      <Router>
        <Route path="/" exact={true} component={Login} />
        <Route path="/login" exact={true} component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/ForgotPassword" component={ForgotPassword} />
        <Route path="/ResetPassword" component={ResetPassword} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Dashboard/note" component={ShowNote} />
        <Route path="/Dashboard/reminder" component={Displayallreminder} />
        <Route path="/Dashboard/trash" component={Trash} />
        <Route path="/Dashboard/archive" component={Archive} />
        <Route path="/Dashboard/profileupload" component={ProfileUpload} />
        <Route path="/Dashboard/search" component={SearchUserNote} />
        <Route path="/profile" component={editshowordelete} />
        <Route path="/reminder" component={Displayallreminder} />
        <Route path="/Dashboard/label/:label" component={Displaynotewithlabel} />
        <Route path="/demo" component={Practiece} />





      </Router>
    </div>
    </Provider>
  );
}

export default App;
