import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
const { chain, configureChains, createClient, WagmiConfig } = require("wagmi");

const { infuraProvider } = require("wagmi/providers/infura");
const { publicProvider } = require("wagmi/providers/public");

export const { chains, provider } = configureChains(
	[chain.polygonMumbai],
	[infuraProvider({ apiKey: process.env.INFURA_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "De_Blogs",
	chains,
});

export const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

export { WagmiConfig, RainbowKitProvider };
