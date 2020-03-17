import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
//import your components starting with uppercase as React preserves lowercase for html components


//Class based components (extend Component). 
//Only they have 'state' property and not functional components. 
//React hooks is used to manage 'state' in functional components.
class App extends Component {
  state = {
    persons : [
      {name:'Max',age:28},
      {name:'Manu',age:29},
      {name:'Stephanie',age:30}
    ]
  }

  switchNameHandler = (name) => {
    //console.log('Was Clicked');
    //DON'T DO THIS : this.state.persons[0].name='Maximilian'; USE setState()
    //setState merges with the current state object but React hooks's setState replaces old state object
    this.setState({persons : [
      {name:name,age:28},
      {name:'Manu',age:29},
      {name:'Stephanie',age:48}
    ]});
  }

  render() {
  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working</p>
      <button onClick={this.switchNameHandler.bind(this,'Maximillan!!')}>Switch Name</button>
      <Person 
      name={this.state.persons[0].name} 
      age={this.state.persons[0].age}
      click={this.switchNameHandler.bind(this,'Max!!!')}/>
      <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>My Hobbies: Racing</Person>
      <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
    </div>
    );
    //Don't use () with switchNameHandler with onClick as javaScript will call it when its rendering the JSX since () means call.
    // Just paas a reference .ie. switchNameHandler without ().


    //'name' and 'age' are {props} and 'My Hobbies: Racing' is {props.children}

    //The JSX code gets comiled to something like below : 
    //return React.createElement('div',{className:'App'},React.createElement('h1',null,'does this work now ?'));
    //(Therefore we import React at the top becoz it uses React.createElement)
  }
}

export default App;
