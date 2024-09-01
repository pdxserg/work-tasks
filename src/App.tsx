import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const tasks= [
        {id:"1", title: "React", isDone:false},
        {id:"2", title: "Hmtl", isDone:false},
    ]
  return (
    <div className="App">
<Todolist title={"Study"} tasks={tasks}/>
    </div>
  );
}
export default App;
