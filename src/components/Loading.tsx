import React from 'react';
import './Loading.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../app/store";
import {InitialstateType} from "../model/app-reducer";


export const Loading = () => {
	let isLoading = useSelector<AppRootStateType,InitialstateType|string>(state => state.app.status)
	return (
		<div>
			{isLoading ==="loading"
				? <div className="progress-bar">
					<div className="progress"></div>
				</div>
				:<div className='empty-spays'></div>
			}


		</div>
	);
};


