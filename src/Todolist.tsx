import React, {ChangeEvent, useMemo} from "react";
import {TaskPropsType} from "./App";


type TodolistPropsType={
	title: string,
	tasks: TaskPropsType[]
	removeTask: (id:string)=>void
	checkBoxHandler:(id:string, isDone: boolean)=>void
}

export const Todolist = (props: TodolistPropsType) => {
	const dateCreate=  new(Date)

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
							const checkboxHandler=(e:ChangeEvent<HTMLInputElement> )=>{
								props.checkBoxHandler(task.id, e.currentTarget.checked )
								}

								return <li key={task.id}>

									<input type="checkbox" checked={task.isDone} onChange={checkboxHandler}/>
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