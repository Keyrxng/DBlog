import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Panel } from "./components/panels";
import { Section } from "./layout/section";

export default function Home() {
	return (
		<div>
			<header className={styles.header_container}>
				<nav className={styles.navbar}>
					// The following content can be deleted
					<a
						href="https://alchemy.com/?a=create-web3-dapp"
						target={"_blank"}
					>
						<img
							className={styles.alchemy_logo}
							src="/alchemy_logo.svg"
						></img>
					</a>
					// The above content can be deleted
					<ConnectButton></ConnectButton>
				</nav>
				// The following content can be deleted
				<div className={styles.logo_container}>
					<h1 className={styles.logo}>🔮</h1>
					<h1>create-web3-dapp</h1>
					<a target={"_blank"} href="#" className={styles.docs_box}>
						Visit the documentation to get started
					</a>
				</div>
				// The above content can be deleted
			</header>
			<main className={styles.main}>
				<Section>
					<Panel></Panel>
				</Section>
			</main>
			// The above content can be deleted
		</div>
	);
}
