import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Section } from "./layout/section";
import Navbar from "./components/Navbar";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import blogAbi from './utils/blogAbi.json'
import {blogAddr} from './utils/addresses'
import { useEffect, useState } from "react";
import { Button } from "@web3uikit/core";

export default function Home() {
	let account = '0xD0CE7E521d26CAc35a7B10d31d6CCc7ffFF8B15e'
	const [allBlogs, setBlogs] = useState([])
	const [Blogs, setBLogs] = useState([])
	  
	const web3 = createAlchemyWeb3(
	  "wss://polygon-mumbai.g.alchemy.com/v2/-z5MVCeYJhwocIX9iwkcCbNmUq0odNWo",
	);
	const blogContract = new web3.eth.Contract(blogAbi, blogAddr)

async function getBlogs1() {
	let tx = await blogContract.methods.getBlogsLen().call({from: '0xD0CE7E521d26CAc35a7B10d31d6CCc7ffFF8B15e'})

	for(let x=0; x < tx; x++) {
		let tx = await blogContract.methods.getTokenUri(x).call({from: '0xD0CE7E521d26CAc35a7B10d31d6CCc7ffFF8B15e'})
		const json = atob(tx.substring(29));
		const res = JSON.parse(json);
		allBlogs.push(res)
	}
}

const l = [] 
async function setUp() {
	let k = await getBlogs1();
	setBlogs(allBlogs)
	console.log("setup: ", allBlogs)
	console.log("setup: ", l)
	setBLogs(allBlogs);

}

useEffect(() => {
	setUp();
})

function Panel (Blogs) {
	// const [Blogs, setBlogs] = useState();
	console.log("panel", Blogs)

	return (
		<><div className={styles.panel_container}>
			<div className={styles.panel}>
				<div className={styles.box}>
					<Blog allBlogs={Blogs}/>
				</div>
			</div>
		</div></>
	);
};

function Blog(Blogs) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [date, setDate] = useState('')
	const [tags, setTags] = useState(['lol', 'lol'])

	async function setUp() {
		console.log("blog: ", Blogs)
	
	}
	setUp()

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
					return (
					<a key={i} rel="noopener noreferrer" href="#" className="inline-block px-2 py-1 text-sm font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">{e}</a>
					)
				})}
				</ul>
			</div>
		</div>
	</div>
</div></>
  )
}


	return (
		(Blogs ? (<div className="w-full  dark:bg-gray-900 dark:text-gray-100">
				<Navbar />
				<main className={styles.main}>
					<Section>
						{Blogs && Blogs ? (<Panel Blogs={Blogs}></Panel>):(<Panel Blogs={Blogs}></Panel>)}
						<Button type="button" onClick={getBlogs1} theme='text'/>
						<Panel Blogs={Blogs}/>
					</Section>

				</main>
			</div>):(
				<h2>lolol</h2>
			))
	);
}
