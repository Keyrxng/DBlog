import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
	const { asPath } = useRouter();

	return (
		<header className={styles.header_container}>
			<nav className={styles.navbar}>
				<a
					href="https://alchemy.com/?a=create-web3-dapp"
					target={"_blank"}
				>
					<img
						className={styles.alchemy_logo}
						src="/alchemy_logo.svg"
					></img>
				</a>
				{asPath == "/PostNew" ? (
					<div className={styles.button_container}>
						<Link className={styles.button} href="/">
							Home
						</Link>
					</div>
				) : (
					<div className={styles.button_container}>
						<Link className={styles.button} href="/PostNew">
							Post New
						</Link>
					</div>
				)}
				<ConnectButton></ConnectButton>
			</nav>
		</header>
	);
}

export default Navbar;
