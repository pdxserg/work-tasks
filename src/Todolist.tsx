import React from "react";
import {TaskPropsType} from "./App";


type TodolistPropsType={
	title: string,
	tasks: TaskPropsType[]
	removeTask: (id:string)=>void
}

export const Todolist = (props: TodolistPropsType) => {
	const dateCreate=new(Date)
	return (
		<div className="task-conteiner">
			<div>
				<h3>Study</h3>
				<h5>{dateCreate.toLocaleString()}</h5>
				<div>
					<input type="text"/>
					<button>+</button>
				</div>
				<ul>
					{props.tasks.length === 0
					? <span>No tasks</span>
					: props.tasks.map(task => {
								const removeHandler=()=>{
									props.removeTask(task.id)
								}
								return <li key={task.id}><input type="checkbox" checked={task.isDone}/>
									<span>{task.title}</span>
									<button onClick={removeHandler}>x</button>
								</li>
							})
					}


				</ul>
				<div>
					<button>All</button>
					<button>Active</button>
					<button>Finished</button>
				</div>

			</div>

		</div>
	)
}