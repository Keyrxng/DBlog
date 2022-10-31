import styles from "./../styles/Home.module.css";
import { Section } from "./layout/section";
import Navbar from "./components/Navbar";
import blogAbi from "./utils/blogAbi.json";
import { blogAddr } from "./utils/addresses";
import { Panel } from "./components/panels";
import { useContractRead } from "wagmi";
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

	for (let i = 1; i < len; i++) {
		const blogs = useContractRead({
			address: blogAddr,
			abi: blogAbi,
			functionName: "blogPosts",
			args: [i],
		});

		blogPosts.push(blogs.data);
		const ipfs = useContractRead({
			address: blogAddr,
			abi: blogAbi,
			functionName: "idToImg",
			args: [i],
		});
		ipfss.push(ipfs.data);

		const tags = useContractRead({
			address: blogAddr,
			abi: blogAbi,
			functionName: "getTags",
			args: [i],
		});
		tagsSplit = tags.data;
	}

	useEffect(() => {}, [len]);

	return (
		<div className="w-full  dark:bg-gray-900 dark:text-gray-100">
			<Navbar />
			<main className={styles.main}>
				<Section>
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
				</Section>
			</main>
		</div>
	);
}

export default Posts;
