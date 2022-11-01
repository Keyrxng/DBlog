import styles from "./../styles/Home.module.css";
import Navbar from "./components/Navbar";
import blogAbi from "./lib/blogAbi.json";
import { blogAddr } from "./lib/addresses";
import { Panel } from "./components/panels";
const { useContractRead } = require("wagmi");
import { useEffect } from "react";

function Posts() {
	let blogsLength = useContractRead({
		address: blogAddr,
		abi: blogAbi,
		functionName: "getBlogsLen",
	});

	const len = blogsLength.data;
	let blogPosts = [];
	let ipfss = [];
	let tagsSplit = [];

	for (let i = 0; i < 2; i++) {
		let blogs;
		if (i != 2) {
			blogs = useContractRead({
				address: blogAddr,
				abi: blogAbi,
				functionName: "blogPosts",
				args: [i],
			});
		}

		blogPosts.push(blogs.data);
		const ipfs = useContractRead({
			address: blogAddr,
			abi: blogAbi,
			functionName: "idToImg",
			args: [i + 1],
		});
		ipfss.push(ipfs.data);

		const tags = useContractRead({
			address: blogAddr,
			abi: blogAbi,
			functionName: "getTags",
			args: [i + 1],
		});
		tagsSplit = tags.data;
	}

	useEffect(() => {}, [len]);

	return (
		<div className="w-full  dark:bg-gray-900 dark:text-gray-100">
			<Navbar />
			<main className={styles.main}>
				<ul>
					{blogPosts != 0 &&
						blogPosts.map((Blogs, i) => {
							return (
								<li key={i}>
									<Panel
										key={i}
										Tags={tagsSplit}
										Images={ipfss}
										Blogs={Blogs}
										index={i}
									/>
								</li>
							);
						})}
				</ul>
			</main>
		</div>
	);
}

export default Posts;
