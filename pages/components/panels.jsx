import { useEffect, useState } from "react";
import styles from "../../styles/Panel.module.css";
import blogAbi from '../utils/blogAbi.json'
import {blogAddr} from '../utils/addresses'
import Moralis from "moralis";
import {EvmChain} from 'moralis/common-evm-utils'
import { useContractRead} from 'wagmi'
import Blog from './Blog'

export async function getServerSideProps(context) {

	await Moralis.start({apiKey: process.env.MORALIS_KEY})
	const address = '0xD0CE7E521d26CAc35a7B10d31d6CCc7ffFF8B15e'
	const nativeBal = await Moralis.EvmApi.balance.getNativeBalance({
		chain: EvmChain.ETHEREUM,
		address,
	})
	

	return {
		props: {
			address,
			nativeBalance: nativeBal.result.balance.ether
		},
	}
}

export function Panel ({Blogs, index}) {
	const [blogs, setBlogs] = useState();
	console.log("panel", Blogs)

	useEffect(() => {
		// setBlogs(Blogs)

	}, [])

	return (
		<><div className={styles.panel_container}>
			<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', margin: '15px'}}>
				<div className={styles.box}>
                    <Blog index={index} Blogs={Blogs}/>
				</div>
			</div>
		</div></>
	);
};
