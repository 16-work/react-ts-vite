import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import { defaultChains } from './chains';

// 1. Get projectId
const projectId = '8de5a8f4d65f36d28b3e25fb7129fbda';

// 2. Create a metadata object
const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/'],
};

// 3. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: '...', // used for the Coinbase SDK
    defaultChainId: 1, // used for the Coinbase SDK
});

// 4. Create a Web3Modal instance
export const modal = createWeb3Modal({
    ethersConfig,
    chains: defaultChains,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    allowUnsupportedChain: true,
});