import React, { Component } from 'react';
import Button from './Buttons.js';
import logo from '../logo.svg';
import '../App.css';
import api from '../util/api.js';
import RepoGrid from './RepoGrid';

class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            color:'#fff',
            repo: null
        }
    }
    
    handleClick=(event)=>{
        if(event.target.id === "1"){
            this.setState(()=>{
                return{color: "#d63031"};
            });
        }else if(event.target.id === "2"){
            this.setState(()=>{
                return{
                color: "#6c5ce7"
                };
            });
        }
    }

    componentDidMount(){
        api.fetchRepos('javascript').then((data)=>{
            this.setState(()=>{
                return{
                repo: data.items
                };
            });
        })
    }
  render() {
      var prop={
            backgroundColor: this.state.color
        }
    return (
        <div>
            <header>
              <img src="favicon.ico" className="App-logo" alt="logo" />  
                <div className="text-box">
                    <h1>Great place to eat</h1>
                    <a className="btn btn-full" href="#">Try it!</a>
                    <a className="btn btn-ghost" href="#">Menu</a>
                </div>
            </header>
            <section>
                <div className="three-state-button" style={prop}>
                    <Button id={1} background={"#d63031"} onclick={this.handleClick} name={'  Red  '}/>
                    <Button id={2} background={"#6c5ce7"} onclick={this.handleClick} name={'Purple'}/>
                </div>
            </section>
            <section>
            {!this.state.repo
                ? <p>LOADING</p>
                : <RepoGrid repo={this.state.repo} />
            }
            </section>
        </div>        
    );
  }
}

export default App;
