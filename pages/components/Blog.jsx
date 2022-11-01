import { Button } from "@web3uikit/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Blog({ Blogs, Images, Tags, index }) {
	const [date, setDate] = useState("");
	const [tags, setTags] = useState([""]);
	const [blogImg, setBlogImg] = useState();

	function formatTime(y, m, d, h, ms, s) {
		return y + "-" + m + "-" + d + "   " + h + ":" + ms + ":" + s;
	}

	useEffect(() => {
		async function setUp() {
			var date = new Date(Blogs[5] * 1000);
			var month = date.getMonth();
			var year = date.getFullYear();
			var day = date.getDay();

			var hours = date.getHours();

			var minutes = date.getMinutes();

			let imgUrl;
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
			let k = Blogs.image;

			k = imgUrl;
			k = Images[index];
			imgUrl = Images[index].slice(7);

			let viewUrl = "https://ipfs.io/ipfs/" + imgUrl;
			const res = await fetch(viewUrl);
			const data = await res.json();
			let pl = data[0].image;
			let po = pl.slice(7);
			let no = "https://ipfs.io/ipfs/" + po;
			let xp = await fetch(no);

			setBlogImg(xp.url);
			setTags(Blogs.tags.split(","));
		}
		setUp();
	}, []);

	useEffect(() => {}, [Blogs]);

	return (
		<>
			{Blogs != undefined && (
				<div className="relative flex items-center flex-col max-w-1xl divide-y xl:flex-row xl:divide-y-0 xl:divide-x dark:bg-gray-900 dark:text-gray-100 divide-gray-700">
					<div className="p-3 space-y-1  xl:ml-2 ">
						<h3 className="text-3xl font-semibold justify-center text-center">
							{Blogs.title}
						</h3>
						<p className="text-sm dark:text-gray-400 justify-center text-center">
							{Blogs.desc}
						</p>
						<div className="flex justify-center items-center m-1 ">
							{date && (
								<span className="text-sm dark:text-gray-300 text-center">
									{date}
								</span>
							)}
							{tags.map((e, i) => {
								return (
									<a
										key={i}
										rel="noopener noreferrer"
										href="#"
										className="inline-block px-2 py-1 m-1 text-sm font-semibold rounded-md dark:bg-cyan-500 dark:text-gray-900"
									>
										{e}
									</a>
								);
							})}
						</div>
					</div>
					<div className="flex">
						<div className="space-y-0 items-center flex md:p-2">
							<img
								alt=""
								src={blogImg}
								className="object-cover mr-6 w-28 h-28 rounded-full shadow dark:bg-gray-500"
							/>
							<Link
								href={{
									pathname: `/Posts/${index}`,
								}}
							>
								<Button
									style={{ width: "130%" }}
									className="text-4xl text-gray-900 dark:bg-cyan-500 dark:text-gray-900"
									type="button"
									theme="custom"
									customize={{
										onHover: "darken",
										textColor: "#111827",
									}}
									text="Read More"
								></Button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
export default Blog;
