import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "../components/Todolist";
import {AddItemForm} from "../components/AddItemForm";
import {createTodolistAC, TodolistType} from "../model/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";


export type TasksType = {
	[key: string]: TaskPropsType[]
}
export type TaskPropsType = {
	id: string
	title: string
	isDone: boolean
}

function App() {

	const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
	const dispatch = useDispatch()

	const createTodolist = useCallback((title: string) => {
		const action = createTodolistAC(title)
		dispatch(action)
	}, [dispatch])

	return (
		<div>

			<div style={{marginLeft: 200}}>
				<AddItemForm addItem={createTodolist}/>

			</div>
			<div className="App">
				{todolists.map(t => {
						return (
							<Todolist
								key={t.id}
								todolist={t}
							/>
						)
					}
				)}

			</div>
		</div>

	);
}

export default App;
