import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { Network, Alchemy, Wallet, Utils, Core} from "alchemy-sdk";
import blogAbi from '../utils/blogAbi.json'
import {blogAddr} from '../utils/addresses'

const settings = {
	apiKey: process.env.ALCHEMY_API_KEY,
	network: Network["MATIC_MUMBAI"],
};

const alchemy = new Alchemy(settings);

export default alchemy;

