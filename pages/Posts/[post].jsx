import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import blogAbi from "../utils/blogAbi.json";
import { blogAddr } from "../utils/addresses";
import { useContractRead } from "wagmi";
import HTMLString from "react-html-string";
import Navbar from "../components/Navbar";
import { Section } from "../layout/section";
import styles from "../../styles/Home.module.css";

const Post = () => {
	const router = useRouter();
	const { post } = router.query;

	const [Blogs, setBlogs] = useState();

	const { data, isLoading, isError, isFetching } = useContractRead();

	let blogs = useContractRead({
		address: blogAddr,
		abi: blogAbi,
		functionName: "blogPosts",
		args: post,
	});

	let html;
	let title;
	let desc;
	if (blogs.data == undefined) {
		return;
	}
	html = blogs.data.content;
	title = blogs.data.title;
	desc = blogs.data.desc;

	const components = {
		p: (props) => <a {...props} style={{ color: "white" }} />,
	};

	return (
		<>
			<div className="w-full dark:bg-gray-900 dark:text-gray-100">
				<Navbar />
				<main className={styles.main}>
					<div className="w-5/6 text-justify">
						<Section>
							<h1 className="text-4xl ">{title}</h1>
							<h1 className="text-2xl">{desc}</h1>
							<h1></h1>
							<HTMLString html={html} components={components} />
						</Section>
					</div>
				</main>
			</div>
		</>
	);
};

export default Post;
