import React, { useState,useEffect } from 'react';
import './App.css';
import './TasksList.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("tasks");
    const loadedTask = JSON.parse(json);
    if(loadedTask) {
      setTodos(loadedTask);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("tasks", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
   
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
      description : description,
      dueDate : dueDate,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
    setDescription("");
    setDueDate("");
  
  }

  function deleteTask(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function isTaskComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (    
    <div id="todo-list">
      <h1>Task List</h1>
      <form onSubmit={handleSubmit}>{
       <div style = {{width: "100%"}}>
          <div className="row" >
          <div className="col-25">
          <label htmlFor="task_title">Task Title</label>
          </div>
        <div className="col-75">
          <input type="text" id="task_title"  value={todo} onChange={(e) => setTodo(e.target.value)} name="task_title" placeholder="Enter Task Title"/>
        </div>
    </div>
     <div className="row">
     <div className="col-25">
       <label htmlFor="due_date">Task Due Date</label>
     </div>
     <div className="col-75">
       <input type="datetime-local" id="due_date" name="due_date"  value={dueDate} onChange={(e) => setDueDate(e.target.value)}  placeholder="Enter Task Due Date" style = {{width: "100%"}}/>
     </div>
   </div>
   <div className="row">
     <div className="col-25">
       <label htmlFor="task_description">Task Description</label>
     </div>
     <div className="col-75">
       <textarea id="task_description" name="task_description" placeholder="Enter Task Description" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
     </div>
   </div>
   <div className="row"><button type="submit"  style = {{float: "right"}}>Add Task</button></div>
  </div>
    }
      </form>
      {
       todos.sort((a,b) => a.dueDate > b.dueDate ? 1:-1).map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => isTaskComplete(todo.id)} />
           <div>
              <div><strong>Title : </strong> {todo.text}</div>
              <div><strong>Description :</strong> {todo.description}</div>
              <div><strong>Due Date: </strong> {todo.dueDate}</div>
           </div>   
          </div>
          <div className="todo-actions">
            <button onClick={() => deleteTask(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
