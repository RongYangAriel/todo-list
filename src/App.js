import React from "react";
import './App.css';
import Todo from './components/Todo/Todo';
import Form from './components/Form/Form';
import FilterButton from './components/FilterButton/FilterButton'
import { useState } from 'react';
import { nanoid } from "nanoid";

//outside app, never change filter

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed:task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);



function App(props) {
  
  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState(['All']);

  const addTask= (name)=> {
    const newTask = {id: "todo-" + nanoid(), name: name, completed:false};
    setTasks([...tasks, newTask])
  };

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task =>{
      if(id === task.id){
        // use object spread to make a new object
        return {...task, completed: !task.completed}
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  function deleteTask (id) {
    const remainingTasks = tasks.filter(task => id !==task.id);
    setTasks(remainingTasks);
  }



  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
    <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted= {toggleTaskCompleted}
        deleteTask = {deleteTask}
      />
    )
  );

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key = {name} 
      name = {name}
      isPressed ={name ===filter}
      setFilter = {setFilter}
      />
  ))
  
  const tasksNoun = taskList.length !== 1? 'tasks' :'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask = {addTask}/>
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
      {taskList}  

      </ul>
    </div>
  );
}

export default App;
