import { CusChain } from '@/common/constant/chain';

export interface UserStore {
    account: {
        address: string;
        chain: CusChain;
        status: {
            isConnecting: boolean;
            isChainSwitching: boolean;
        };
    };
    setAccount: (account: { address?: string; chain?: CusChain; isConnecting?: boolean; isChainSwitching?: boolean }) => void;
}
