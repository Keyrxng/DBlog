import { Button } from "@web3uikit/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";


function Blog({ Blogs, Images, Tags, index }) {
	const [title, setTitle] = useState();
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [tags, setTags] = useState([""]);
	const [blogImg, setBlogImg] = useState();

	function formatTime(y, m, d, h, ms, s) {
		return y + "-" + m + "-" + d + "   " + h + ":" + ms + ":" + s;
	}

	useEffect(() => {
		async function setUp() {
console.log("date", Blogs[0].date)
			var date = new Date(Blogs[0].date * 1000);
			var month = date.getMonth();
			var year = date.getFullYear();
			var day = date.getDay();

			var hours = date.getHours();

			var minutes = date.getMinutes();

			var seconds = date.getSeconds();


			var formattedDate = formatTime(
				year,
				month,
				day,
				hours,
				minutes,
				seconds
			);
			setDate(formattedDate);
			console.log("log:", Images[0])
			let imgUrl;
			if(Images[0] != undefined) {
				imgUrl = Images[0].slice(7);

			}
			let viewUrl = "https://ipfs.io/ipfs/" + imgUrl;
			const res = await fetch(viewUrl);
			const data = await res.json();
			setBlogImg(data[0].image);

			if(Tags != undefined){

				setTags(Tags.split(','))
			}
		}
		setUp();
	}, [Blogs]);

	return (
		<>
			{Blogs != undefined && (
				<div className="relative flex items-center flex-col max-w-4xl divide-y xl:flex-row xl:divide-y-0 xl:divide-x dark:bg-gray-900 dark:text-gray-100 divide-gray-700">
					<div className="p-3 space-y-1  xl:ml-6 ">
						<h3 className="text-3xl font-semibold justify-center  text-center" >
							{Blogs[0].title}
						</h3>
						<p className="text-sm dark:text-gray-400 justify-center text-center">
						{Blogs[0].desc}
						{Blogs[0].desc}
						{Blogs[0].desc}
						</p>
						<div className="flex justify-center items-center ">
						{date && <span className="text-sm text-center">{date}</span>}
						{tags.map((e, i) =>{
					return (
						
						<a key={i} rel="noopener noreferrer" href="#" className="inline-block px-2 py-1 m-1 text-sm font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">{e}</a>
						)
				})}
						</div>
					</div>
					<div className="flex items-center xl: pr-20">
						<img
							alt="blog thumbnail"
							src={blogImg}
							className="object-cover ml-6 w-28 h-28 rounded-full shadow dark:bg-gray-500"
						/>
						<div className="space-y-0 items-center md:p-2" style={{ margin: "15px" }}>
							<Link
								href={{
									pathname: `/Posts/${index}`,
								}}
							>
								<Button style={{width: '160%'}}
									type="button"
									theme="secondary"
									text="Read More"
								></Button>
							</Link>
							<div className="flex flex-wrap space-x-3">
								<ul className="flex flex-wrap space-x-3">
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
export default Blog;
