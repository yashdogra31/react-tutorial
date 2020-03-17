//In simplest terms a Functional Component is a funtion which returns JSX
import React from 'react';

const person = (props) => {
    return (
    <div>
    <p onClick={props.click}>I'm {props.name} and I am {props.age} years old</p>
    <p>{props.children}</p>
    </div>
    )
}

export default person;