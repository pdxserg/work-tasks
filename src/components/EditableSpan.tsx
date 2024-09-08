import React, {useState} from 'react';

type EditableSpantype = {
	title: string
}
export const EditableSpan = ({title}: EditableSpantype) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(title)
const onChangeHandler=()=>{

}

	return (
		<div>
			{isEditing
				? <input type="text"
				         value={newTitle}
				         onChange={onChangeHandler}
				         onBlur={() => setIsEditing(false)}
				/>
				: <span
					onDoubleClick={() => setIsEditing(true)}
					// onClick={}
				>{title}</span>
			}

		</div>
	);
};
