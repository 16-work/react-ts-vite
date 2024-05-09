import { Chain } from 'wagmi/chains';

export interface Web3Store {
    account: {
        address: string;
        chain: Chain;
        status: {
            isConnecting: boolean;
            isChainSwitching: boolean;
        };
    };
    setAccount: (account: { address?: string; chain?: Chain; isConnecting?: boolean; isChainSwitching?: boolean }) => void;
}
