import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../app/store";
import {createTodoTC, setTodoTC, TodolistDomainType} from "../model/todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {Todolist} from "./Todolist";
import {Navigate} from "react-router-dom";


export const TodolistsList= ()=>{

	const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
	const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLogin)

	const dispatch =useAppDispatch()

	useEffect(() => {

		console.log(2)
		dispatch(setTodoTC())
	}, []);

	const createTodolist = useCallback((title: string) => {
		const action = createTodoTC(title)
		dispatch(action)
	}, [dispatch])

if (!isLogin){
	return<Navigate to="/login"/>
}

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


