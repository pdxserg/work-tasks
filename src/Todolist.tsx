import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {TaskPropsType} from "./App";


type TodolistPropsType={
	title: string,
	tasks: TaskPropsType[]
	removeTask: (id:string)=>void
	checkBoxHandler:(id:string, isDone: boolean)=>void
	createTask:(title:string)=>void
}
type FilterTodolist = "all"|"active"|"complited"
export const Todolist = (props: TodolistPropsType) => {
	const [filter, setFilter]=useState<FilterTodolist>("all")
	const [title, setTitle]=useState ("")
	const [error, setError]= useState(false)
	let tasks = props.tasks
	if(filter === "active"){
		tasks=tasks.filter(task=>!task.isDone)
	}
	if(filter === "complited"){
		tasks=tasks.filter(task=>task.isDone)
	}
	const dateCreate= new Date().toLocaleString()

	const onchangeTitle=(e:ChangeEvent<HTMLInputElement> )=>{
		setTitle(e.currentTarget.value)
	}
	const onKeyDownHandler =(e:KeyboardEvent<HTMLInputElement>)=>{
		setError(false)
		if(e.key=== "Enter"){
			createTaskHandler()
		}
	}

	 const createTaskHandler=()=>{
		if (title.trim()!== "" ){
			props.createTask(title.trim())
			setTitle("")
		} else{
			setError(true)
		}

	 }
	const changeAllFilter=()=>{
		setFilter("all")
	}
	const changeActiveFilter=()=>{setFilter("active")}
	const changeComplitedFilter=()=>{setFilter("complited")}


	return (
		<div className="task-conteiner">
			<div>
				<h3>Study</h3>
				<h5>{dateCreate}</h5>
				<div className={"createTask"}>
					<input  className={error? "errorForInput":""}
						type="text"
						value={title}
						onChange={onchangeTitle}
						onKeyDown={onKeyDownHandler}
					/>
					<button onClick={createTaskHandler}>+</button>
					{error && <div className={"error"}>field requred</div>}
				</div>
				<ul>
					{ tasks.length === 0
					? <span>No tasks</span>
					: tasks.map(task => {
								const removeHandler=()=>{
									props.removeTask(task.id)
								}
							const checkboxHandler=(e:ChangeEvent<HTMLInputElement> )=>{
								props.checkBoxHandler(task.id, e.currentTarget.checked )
								}

								return <li key={task.id} className={task.isDone?"finished":""}>

									<input type="checkbox" checked={task.isDone} onChange={checkboxHandler}/>
									<span>{task.title}</span>
									<button onClick={removeHandler}>x</button>
								</li>
							})
					}


				</ul>
				<div className={"filterButton"}>
					<button className={filter === "all"? "filterTasks":""}
						onClick={changeAllFilter}>All</button>
					<button className={filter === "active"? "filterTasks":""}
						onClick={changeActiveFilter }>Active</button>
					<button className={filter === "complited"? "filterTasks":""}
						onClick={changeComplitedFilter}>Complited</button>
				</div>

			</div>

		</div>
	)
}