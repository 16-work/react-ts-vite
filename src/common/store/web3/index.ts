import { create } from 'zustand';
import { Web3Store } from './types';
import { Chain } from 'wagmi/chains';

export default create<Web3Store>((set) => ({
    account: {
        address: localCache.get('address'),
        chain: {} as Chain,
        status: {
            isChainSwitching: false,
            isConnecting: false,
        },
    },
    setAccount: (newAccount) => {
        set((state) => {
            const accountInfo = {
                address: newAccount.address !== undefined ? newAccount.address : state.account.address,
                chain: newAccount.chain !== undefined ? newAccount.chain : state.account.chain,
                status: {
                    isConnecting: newAccount.isConnecting !== undefined ? newAccount.isConnecting : state.account.status.isConnecting,
                    isChainSwitching: newAccount.isChainSwitching !== undefined ? newAccount.isChainSwitching : state.account.status.isChainSwitching,
                },
            };

            localCache.set('address', accountInfo.address, 86400 * 7);
            return { account: accountInfo };
        });
    },
}));
