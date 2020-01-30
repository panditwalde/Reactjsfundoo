import {
  TOGGLE_VIEW,LABEL_ID,DRAWER,ADD_COLOR
  
} from "../Redux/actionType";

export const initialState = {
  view:true,
  label_id:'',
  set_Color:'',
  openDrawer:false
 
};

const reducer = (State = initialState, action) => {
  switch (action.type) {


    case LABEL_ID: {
      return {
        ...State,
        label_id: action.payload
      };
    }

    case ADD_COLOR: {
      return {
        ...State,
        color: action.payload
      };
    }

    case DRAWER: {
      return {
        ...State,
        openDrawer: !State.openDrawer
      };
    }

 
    case TOGGLE_VIEW: {
      return {
        ...State,
        view: !State.view
      };
    }

    default:
      return State;
  }
};

export default reducer;
