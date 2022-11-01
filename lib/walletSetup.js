import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

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
