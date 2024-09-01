import React from "react";

export const Todolist = (props:any) => {
	return (
		<div className="task-conteiner">
			<div>
				<h3>Study</h3>
				<div>
					<input type="text"/>
					<button>+</button>
				</div>
				<ul>
					<li><input type="checkbox" checked={props.tasks[0].isDone}/>
						<span>{props.tasks[0].title}</span>
						<button>x</button>
					</li>
					<li><input type="checkbox" checked={props.tasks[1].isDone}/>
						<span>{props.tasks[1].title}</span>
						<button>x</button>
					</li>
				</ul>
				<div>

				</div>

			</div>

		</div>
	)
}