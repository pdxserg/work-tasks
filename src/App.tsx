import React from 'react';
import './App.css';

function App() {
    const tasks= [
        {id:"1", title: "React", isDone:false},
        {id:"2", title: "Hmtl", isDone:false},
    ]
  return (
    <div className="App">
        <div className="task-conteiner">
            <div >
                <h3>Study</h3>
                <div>
                    <input type="text"/>
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={tasks[0].isDone}/>
                        <span>{tasks[0].title}</span>
                        <button>x</button>
                    </li>
                    <li><input type="checkbox" checked={tasks[1].isDone}/>
                        <span>{tasks[1].title}</span>
                        <button>x</button>
                    </li>
                </ul>
                <div>

                </div>

            </div>

        </div>


    </div>
  );
}

export default App;
