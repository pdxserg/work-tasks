import React from 'react';
import './ErrorSnackbar.css'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../app/store";


export const ErrorSnackbar = () => {
	 const dispatch =useAppDispatch
	const messegeError=useSelector<AppRootStateType,null|string>(state => state.app.error)
const onclickHandler=()=>{
		 dispatch()
	}

	return (
		<>
			{messegeError !== null
				? <div className="container-error">
					<span className="error"> error!{messegeError} </span>
					<button onClick={onclickHandler}>x</button>
				</div>
				:<div className="empty-space"></div>
			}
	</>


)

};

