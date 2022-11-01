import "../styles/globals.css";
import {
	wagmiClient,
	chains,
	WagmiConfig,
	RainbowKitProvider,
} from "./lib/walletSetup";

function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
