
import {TOGGLE_VIEW,LABEL_ID,DRAWER,ADD_COLOR} from '../Redux/actionType'

export const toggleView = () =>{
    return{
        type:TOGGLE_VIEW
    }
}

export const openDrawer = () =>{
    return{
        type:DRAWER
    }
}

export const set_Color=(color)=>{

    console.log(color);
    
    return{
        type:ADD_COLOR,
        payload:color
    }
}



export const label_id=(labelid)=>{

    console.log(labelid);
    
    return{
        type:LABEL_ID,
        payload:labelid
    }
}





