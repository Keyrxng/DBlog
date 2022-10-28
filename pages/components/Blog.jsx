import React,{ useEffect, useState } from "react";

function Blog(props) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [date, setDate] = useState('')
	const [tags, setTags] = useState([])

	function setUp() {
		setTags(props.tags);
		setDate(props.date);
		setDescription(props.description);
		setTitle(props.title);
	}

	useEffect(() => {
		setUp();
	}, [])

  return (
	<>
	<div className="relative flex flex-col max-w-xl p-6 divide-y xl:flex-row xl:divide-y-0 xl:divide-x dark:bg-gray-900 dark:text-gray-100 divide-gray-700">
	<div className="p-3 space-y-1 xl:ml-6">
		<h3 className="text-3xl font-semibold">{title}</h3>
		<p className="text-sm dark:text-gray-400">{description}</p>
	</div>
	<div className="flex items-center p-3 space-x-3">
		<img alt="" src="https://source.unsplash.com/100x100/?portrait" className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
		<div className="space-y-1">
			<span className="text-sm">{new Date(date).toString()}</span>
			<div className="flex flex-wrap space-x-3">
				<ul className="flex flex-wrap space-x-3">
				{tags.map((e, i) =>{
					console.log(e)
					return (
					<a rel="noopener noreferrer" href="#" className="inline-block px-2 py-1 text-sm font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">{e}</a>
					)
				})}
				</ul>
			</div>
		</div>
	</div>
</div></>
  )
}

export default Blog