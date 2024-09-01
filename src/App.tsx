import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";


// type TasksPropsType ={
//     tasks:TaskPropsType[]
// }
export type TaskPropsType={
    id: string
    title: string
    isDone:boolean
}
function App() {
    const tasks:TaskPropsType[]= [
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
