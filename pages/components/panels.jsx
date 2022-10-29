import { useEffect, useState } from "react";
import styles from "../../styles/Panel.module.css";
import blogAbi from '../utils/blogAbi.json'
import {blogAddr} from '../utils/addresses'
import { useLocation } from "react-router-dom"

import Blog from './Blog'

export function Panel ({Blogs}) {
	// const [Blogs, setBlogs] = useState();
	console.log("panel", {Blogs})

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
