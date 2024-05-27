import { arbitrumSepolia, Chain, sepolia } from 'wagmi/chains';

// 默认链节点
export enum SUPPORT_CHAIN {
    BOB_MAINNET = 60808,
    BOB_TESTNET = 111,
}

// 默认链区块浏览器
export const SCAN_URL: Record<number, string> = {
    [SUPPORT_CHAIN.BOB_MAINNET]: 'https://explorer.gobob.xyz/',
    [SUPPORT_CHAIN.BOB_TESTNET]: 'https://testnet-explorer.gobob.xyz/',
};

// 默认链(正式网)
const bobMainnet: Chain & { icon: string } = {
    id: SUPPORT_CHAIN.BOB_MAINNET,
    name: 'BOB Mainnet',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://rpc.gobob.xyz/'] },
    },
    blockExplorers: {
        default: {
            name: 'bob',
            url: SCAN_URL[SUPPORT_CHAIN.BOB_MAINNET],
            apiUrl: `${SCAN_URL[SUPPORT_CHAIN.BOB_MAINNET]}/api`,
        },
    },
    icon: 'https://gateway.pinata.cloud/ipfs/QmSoURTUsquYynMBdsT6ASaLZFzDYLoZ3GGLT46XB6UinG',
};

// 默认链(测试网)
const bobTest: Chain & { icon: string } = {
    id: SUPPORT_CHAIN.BOB_TESTNET,
    name: 'BOB Testnet (Sepolia)',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://testnet.rpc.gobob.xyz/'] },
    },
    blockExplorers: {
        default: {
            name: 'bobTestnet',
            url: SCAN_URL[SUPPORT_CHAIN.BOB_TESTNET],
            apiUrl: `${SCAN_URL[SUPPORT_CHAIN.BOB_TESTNET]}/api`,
        },
    },
    contracts: {
        multicall3: { address: '0x089b191d95417817389c8eD9075b51a38ca46DE8' },
    },
    icon: 'https://gateway.pinata.cloud/ipfs/QmSoURTUsquYynMBdsT6ASaLZFzDYLoZ3GGLT46XB6UinG',
};

// 支持的链
export const SUPPORT_CHAINS: any = [bobMainnet, bobTest, sepolia, arbitrumSepolia];
