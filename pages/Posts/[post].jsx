import { useRouter } from "next/router";
import { useState } from "react";
import blogAbi from "../lib/blogAbi.json";
import { blogAddr } from "../lib/addresses";
const { useContractRead } = require("wagmi");
import HTMLString from "react-html-string";
import Navbar from "../components/Navbar";
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
		span: (props) => <span {...props} style={{ color: "white" }} />,
		p: (props) => (
			<p
				{...props}
				className="text-white"
				style={{ color: "#fffffff" }}
			/>
		),
		a: (props) => (
			<a
				{...props}
				className="text-blue-600 underline"
				style={{ color: "#fffffff" }}
			/>
		),
	};

	return (
		<>
			<div className="w-full dark:bg-gray-900 dark:text-gray-100">
				<Navbar />
				<main className={styles.main}>
					<div className="w-5/6 text-justify flex flex-col justify-center items-center">
						<h1 className="text-4xl ">{title}</h1>
						<h1 className="text-2xl">{desc}</h1>
						<h1></h1>
						<HTMLString html={html} components={components} />
					</div>
				</main>
			</div>
		</>
	);
};

export default Post;
