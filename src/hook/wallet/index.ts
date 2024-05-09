import { useConnectModal, useChainModal } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';

import useWatchAccount from './watch';

export default () => {
    useWatchAccount();

    const { openConnectModal } = useConnectModal();
    const { openChainModal } = useChainModal();
    const { disconnect } = useDisconnect();

    const web3Store = store.web3();

    return {
        connect: () => {
            if (openConnectModal) openConnectModal();
        },

        disconnect: () => {
            disconnect();
            web3Store.setAccount({ address: '' });
            localCache.remove('address');
            msg.success('Disconnection Successful!', { autoClose: 500 });
        },

        switchChain: () => {
            if (openChainModal) openChainModal();
        },
    };
};
