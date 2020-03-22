import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
//import your components starting with uppercase as React preserves lowercase for html components


//Class based components (extend Component). 
//Only they have 'state' property and not functional components. 
//React hooks is used to manage 'state' in functional components.
class App extends Component {
  state = {
    persons : [
      {id:"ax1",name:'Max',age:28},
      {id:"ax2",name:'Manu',age:29},
      {id:"ax3",name:'Stephanie',age:30}
    ],
    showPerson : false
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


  nameChangedHandler = (event,id) => {
    const personIndex=this.state.persons.findIndex(p=>{ 
      return p.id===id
    });

    //const person=Object.assign({},this.state.persons[personIndex]);
    const person={...this.state.persons[personIndex]};
    person.name=event.target.value;

    const persons=[...this.state.persons];
    persons[personIndex]=person;
  
    
    this.setState({persons : persons});
  }

  toogelPersonHandler = () => {
    var doesShow=this.state.showPerson;
    this.setState({showPerson:!doesShow});
  }

  deletePersonHandler = (index) => {
    //const persons=this.state.persons;
    //we should not use it like this as arrays in object are referenced. so we are dealing with orginal state data.
    //we should not mutate it. ALWAYS make a copy .ie. update state immutably.

    const persons=this.state.persons.slice();
    //slice() with no argument will create a copy of the array.
    // we can also use ES6 spred operator
    // const persons=[...this.state.persons];
    
    persons.splice(index,1);
    // we did not update a const here. array in object are referenced. 
    //const person is just pointer.we have made it to point to a new element using splice()
    this.setState({persons:persons});
  }

  
  render() {
    //Begin : #1.ALTERNATIVE(preffered) Handling Dynamic Content "The JavaScript Way"
    let persons=null;
    let btncls=[classes.Button];
    if(this.state.showPerson)
    {
      persons=(
        this.state.persons.map((person,index)=>{
          return <Person name={person.name}
          age={person.age}
          key={person.id}
          click={() => this.deletePersonHandler(index)}
          changed={(event) => this.nameChangedHandler(event,person.id)}/>
        })
      //   <div>
      // <Person 
      // name={this.state.persons[0].name} 
      // age={this.state.persons[0].age}
      // click={this.switchNameHandler.bind(this,'Max!!!')}
      // changed={this.nameChangedHandler}/>
      // <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>My Hobbies: Racing</Person>
      // <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      // </div>
      );
      
      btncls.push(classes.Red);
    }
    //End

    const assignedClasses=[];
    if(this.state.persons.length >=2)
    {
      assignedClasses.push(classes.red);
    }
    if(this.state.persons.length >=1)
    {
      assignedClasses.push(classes.bold);
    }


  return (
    <div className={classes.App}>
      <h1>Hi, I'm a React App</h1>
      <p className={assignedClasses.join(' ')}>This is really working</p>
      <button 
      className={btncls.join(' ')}
      onClick={this.toogelPersonHandler}>Toggle Persons</button>
    
    {
    //Begin : #1.ALTERNATIVE(preffered) Handling Dynamic Content "The JavaScript Way"
      persons
    //end
     }

     {//Begin : #1. Rendering Content Conditionally
     /* { this.state.showPerson ? 
      <div>
      <Person 
      name={this.state.persons[0].name} 
      age={this.state.persons[0].age}
      click={this.switchNameHandler.bind(this,'Max!!!')}
      changed={this.nameChangedHandler}/>
      <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>My Hobbies: Racing</Person>
      <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      </div> : null
      } */
      //end
      }
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

