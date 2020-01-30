import React, { Component } from 'react'
import CreateNote from './CreateNote'

export default class Reminder extends Component {
    render() {
        return (
            <div style={{width:'50%',position:'relative',margin:'auto'}}>
                 <CreateNote/> 
            </div>
        )
    }
}
