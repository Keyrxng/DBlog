import { Button } from "@web3uikit/core";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useState } from "react";

function Blog({ Blogs, index }) {
	const [title, setTitle] = useState();
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [tags, setTags] = useState(["lol", "lol"]);
	const [blog, setBlog] = useState();


	function formatTime(y, m, d, h, ms, s) {
		return y + "-" + m + "-" + d + "   " + h + ":" + ms + ":" + s;
	}

	useEffect(() => {
		async function setUp() {

			// Create a new JavaScript Date object based on the timestamp
			// multiplied by 1000 so that the argument is in milliseconds, not seconds.
			var date = new Date(Blogs.date.toString() * 1000);
			var month = date.getMonth();
			var year = date.getFullYear();
			var day = date.getDay();
			// console.log(year)
			// console.log(month)
			// console.log(day)
			// Hours part from the timestamp
			var hours = date.getHours();
			// Minutes part from the timestamp
			var minutes = date.getMinutes();
			// Seconds part from the timestamp
			var seconds = date.getSeconds();

			// Will display time in 10:30:23 format
			var formattedDate = formatTime(
				year,
				month,
				day,
				hours,
				minutes,
				seconds
			);
			setDate(formattedDate);
		}
		setUp();
	}, [Blogs]);

	return (
		<>
			{Blogs != undefined && (
				<div className="relative flex flex-col max-w-xl p-6 divide-y xl:flex-row xl:divide-y-0 xl:divide-x dark:bg-gray-900 dark:text-gray-100 divide-gray-700">
					<div className="p-3 space-y-1 xl:ml-6">
						<h3 className="text-3xl font-semibold">
							{Blogs.title}
						</h3>
						<p className="text-sm dark:text-gray-400">
							{Blogs.desc}
						</p>
					</div>
					<div className="flex items-center p-3 space-x-3">
						<img
							alt=""
							src="https://source.unsplash.com/100x100/?portrait"
							className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
						/>
						<div className="space-y-1" style={{ margin: "15px" }}>
							{date && <span className="text-sm">{date}</span>}
							<Link
								href={{
									pathname: `/Posts/${index}`,
									// query: { post: index },
								}}
							>
								<Button
									type="button"
									theme="secondary"
									text="Read More"
								></Button>
							</Link>
							<div className="flex flex-wrap space-x-3">
								<ul className="flex flex-wrap space-x-3"></ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
export default Blog;
