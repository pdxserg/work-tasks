import React, {useEffect} from 'react';
import './App.css';
import {TaskType} from "../api/todolists-api";
import {Loading} from "../components/Loading";
import {ErrorSnackbar} from "../components/errors/ErrorSnackbar";
import {Outlet} from "react-router-dom";
import {AppRootStateType, useAppDispatch} from "./store";
import {authMeTC} from "../model/auth-reducer";
import {useSelector} from "react-redux";


export type TasksStateType = {
	[key: string]: TaskType[]
}


function App() {
const isInitialized= useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
	const dispatch= useAppDispatch()
	useEffect(() => {
		console.log(1)
dispatch(authMeTC())
	}, []);

	if (!isInitialized) {
		return <div>
			<p>Loading data...</p>
			<div className="loader"></div>
		</div>
	}

	return (

		<div>
			<Header/>
			<Loading/>
				<ErrorSnackbar/>
				<div>
					<Outlet/>
				</div>
			</div>



	)

}

export default App
const Header = () => {
	const isLogin= useSelector<AppRootStateType, boolean>(state => state.auth.isLogin)

	return (
		<header style={{backgroundColor: "lightblue"}}>
			{isLogin && <button>LogOut</button>}
		</header>
	)
}