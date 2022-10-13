import React from 'react'
export const MyButton = () => {
	const [likes, increaseLikes] = React.useState(0)

	return (
		<>
			<p>{`${likes} likes`}</p>
			<button onClick={() => increaseLikes(likes + 1)}>Like</button>
		</>
	)
}
