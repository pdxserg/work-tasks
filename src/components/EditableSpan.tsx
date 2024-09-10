import React, {ChangeEvent, memo, useState} from 'react';

type EditableSpanType =
	{
	title: string
	updatedTitle: (newTitle: string) => void
}
export const EditableSpan = memo(({title, updatedTitle}: EditableSpanType) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(title)
	const [error, setError] = useState(false)
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setError(false)
		setNewTitle(e.currentTarget.value)
	}
	const onblurHandler = () => {
		if (newTitle.trim() !== "") {
			updatedTitle(newTitle.trim())
			setIsEditing(false)
		} else {
			setError(true)
		}

	}
	return (
		isEditing
			? <input className={error ? "errorForInput" : ""}
			         type="text"
			         value={newTitle}
			         onChange={onChangeHandler}
			         onBlur={onblurHandler}
			/>
			: <span
				onDoubleClick={() => setIsEditing(true)}
			>{title}</span>

	);
})
