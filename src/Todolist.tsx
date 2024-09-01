import React from "react";
import {TaskPropsType} from "./App";

export const Todolist = (props:{title:string, tasks:TaskPropsType[] }) => {
	return (
		<div className="task-conteiner">
			<div>
				<h3>Study</h3>
				<div>
					<input type="text"/>
					<button>+</button>
				</div>
				<ul>
					{props.tasks.map(task=> {
					return	<li  ><input type="checkbox" checked={task.isDone}/>
							<span>{task.title}</span>
							<button>x</button>
						</li>
					})}

				</ul>
				<div>

				</div>

			</div>

		</div>
	)
}