import { create } from 'zustand';
import { Web3Store } from './types';

export default create<Web3Store>((set) => ({
    account: localCache.get('wallet', { address: '', chainId: 1 }),
    setAccount: (newAccount) => {
        set((state) => {
            const accountInfo = {
                address: newAccount.address !== undefined ? newAccount.address : state.account.address,
                chainId: newAccount.chainId !== undefined ? newAccount.chainId : state.account.chainId,
            };

            localCache.set('wallet', accountInfo, 86400 * 7);
            return { account: accountInfo };
        });
    },

    explorerURL: 'https://snowtrace.io',
}));
