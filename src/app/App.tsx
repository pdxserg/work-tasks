import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../components/Todolist";
import {AddItemForm} from "../components/AddItemForm";
import {createTodolistAC, setTodoTC, TodolistDomainType} from "../model/todolists-reducer";
import {useSelector} from "react-redux";
import {TaskType} from "../api/todolists-api";
import {AppRootStateType, useAppDispatch} from "./store";


export type TasksType = {
	[key: string]: TaskType[]
}


function App() {

	// @ts-ignore
	const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
	const dispatch =useAppDispatch()

	const createTodolist = useCallback((title: string) => {
		const action = createTodolistAC(title)
		dispatch(action)
	}, [dispatch])

	useEffect(() => {
  dispatch(setTodoTC)
	}, []);

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
