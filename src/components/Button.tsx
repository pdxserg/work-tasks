import React, {memo} from 'react';
type ButtonType ={
	title: string
	onClick:()=>void
	className:any
}
export const Button = memo(({onClick, title, className}:ButtonType) => {
	return (
		<button
			className={className}
			onClick={onClick}>
			{title}
		</button>
	);
})

