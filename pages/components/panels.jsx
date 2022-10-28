import styles from "../../styles/Panel.module.css";

import Blog from './Blog'


export const Panel = () => {
	return (
		<div className={styles.panel_container}>
			<div className={styles.panel}>
				<div className={styles.box}>
					<Blog title={"Title Placeholder"} description={"Description Placeholder"} date={Date.now()} tags={['Test', 'Fun', 'lols']} />
				</div>
			</div>
		</div>
	);
};
