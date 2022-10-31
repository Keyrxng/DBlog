import { useEffect, useState } from "react";
import styles from "../../styles/Panel.module.css";

import Blog from './Blog'

export function Panel ({Blogs, Tags, Images, index}) {
	const [blogs, setBlogs] = useState();

	return (
		<><div className={styles.panel_container} >
			<div className='flex flex-col justify-around'>
				<div className={styles.box} >
                    <Blog index={index} Tags={Tags} Images={Images} Blogs={Blogs}/>
				</div>
			</div>
		</div></>
	);
};
