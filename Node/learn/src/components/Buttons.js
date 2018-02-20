import React, { Component } from 'react';
import '../App.css';

class Button extends Component{
    render(){
        var prop={
            backgroundColor: this.props.background
        }
        return(
            <a id={this.props.id} style={prop} className="av btn" href="#" onClick={this.props.onclick}> {this.props.name} </a>
        );
    }
}

export default Button;