import styles from "../styles/Home.module.css";
import { Section } from "./layout/section";
import Navbar from "./components/Navbar";
import blogAbi from './utils/blogAbi.json'
import {blogAddr} from './utils/addresses'
import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@web3uikit/core";
import { Panel } from "./components/panels";
import Moralis from "moralis";
import {EvmChain} from 'moralis/common-evm-utils'
import { useContractRead} from 'wagmi'


function Home() {
	const [Blogs, setBlogs] = useState()

    const {data, isLoading, isError} = useContractRead()
	
	let blogsLength = useContractRead({
		address: blogAddr,
		abi: blogAbi,
		functionName: 'getBlogsLen',
	})
	// console.log("res:", blogsLength.data.toString())

	let len = blogsLength.data
	let blogPosts = [];

    for(let i = 0; i < len; i++) {
		let blogs = useContractRead({
			address: blogAddr,
			abi: blogAbi,
			functionName: 'blogPosts',
			args: [i]
		})
		blogPosts.push(blogs.data);
		console.log(blogs.data);
	}


	return (
		<div className="w-full  dark:bg-gray-900 dark:text-gray-100">
				<Navbar />
				<main className={styles.main}>
					<Section >
						<ul >
						{blogPosts != 0 && blogPosts.map((e, i) => {
							return (
								<li>
								<Panel key={i} Blogs={e} index={i}/>
							</li>
							)
						})}
						</ul>
					</Section>

				</main>
			</div>
	);
}

export default Home