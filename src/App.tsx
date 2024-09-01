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
                <div>
                    <input type="checkbox" checked={tasks[0].isDone}/>
                    <span>{tasks[0].title}</span>
                    <button>x</button>
                </div>

            </div>

        </div>
        <div>
            <h2>{tasks[1].title}</h2>
            <input type="checkbox" checked={tasks[1].isDone}/>
        </div>



    </div>
  );
}

export default App;
