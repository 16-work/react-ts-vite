import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserStore } from './types';
import { CusChain } from '@/common/constant/chain';

export default create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                account: {
                    address: '',
                    chain: {} as CusChain,
                    status: {
                        isChainSwitching: false,
                        isConnecting: false,
                    },
                },
                setAccount: (newAccount) =>
                    set((state) => {
                        const accountInfo = {
                            address: newAccount.address !== undefined ? newAccount.address : state.account.address,
                            chain: newAccount.chain !== undefined ? newAccount.chain : state.account.chain,
                            status: {
                                isConnecting: newAccount.isConnecting !== undefined ? newAccount.isConnecting : state.account.status.isConnecting,
                                isChainSwitching:
                                    newAccount.isChainSwitching !== undefined ? newAccount.isChainSwitching : state.account.status.isChainSwitching,
                            },
                        };

                        return { account: accountInfo };
                    }),
            }),
            { name: 'web3' }
        )
    )
);
