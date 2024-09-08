import React, {ChangeEvent, useState} from 'react';

type EditableSpantype = {
	title: string
	updatedTitle: (newTitle: string) => void
}
export const EditableSpan = ({title, updatedTitle}: EditableSpantype) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(title)
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value)
	}
	const onblurHandler = () => {
		setIsEditing(false)
		updatedTitle(newTitle)
	}
	return (
		isEditing
			? <input type="text"
			         value={newTitle}
			         onChange={onChangeHandler}
			         onBlur={onblurHandler}
			/>
			: <span
				onDoubleClick={() => setIsEditing(true)}
			>{title}</span>

	);
};
