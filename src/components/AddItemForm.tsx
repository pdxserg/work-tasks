

import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
type AddItemFormType={
	addItem: (title: string) => void
}
export const AddItemForm =memo ((props:AddItemFormType) => {
	const [title, setTitle] = useState("")
	const [error, setError] = useState(false)
	const onchangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}
	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(false)
		if (e.key === "Enter") {
			createTaskHandler()
		}
	}

	const createTaskHandler = () => {
		if (title.trim() !== "") {
			props.addItem( title.trim())
			setTitle("")
		} else {
			setError(true)
		}

	}
	return (
		<div className={"createTask"}>
			<input className={error ? "errorForInput" : ""}
			       type="text"
			       value={title}
			       onChange={onchangeTitle}
			       onKeyDown={onKeyDownHandler}
			/>
			<button onClick={createTaskHandler}>+</button>
			{error && <div className={"error"}>field requred</div>}
		</div>
	);
})

