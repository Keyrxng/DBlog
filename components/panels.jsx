import { useEffect } from "react";
import styles from "../styles/Panel.module.css";

import Blog from "./Blog";

export function Panel({ Blogs, Tags, Images, index }) {
	useEffect(() => {}, [index]);

	return (
		<>
			<div className={styles.panel_container}>
				<div className="flex flex-col justify-around m-2">
					<div className={styles.box}>
						{Blogs && (
							<Blog
								index={index}
								Blogs={Blogs}
								Tags={Tags}
								Images={Images}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
