import { useConnectModal, useChainModal } from '@rainbow-me/rainbowkit';
import { useDisconnect, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';

import useWatchAccount from './watch';

export default () => {
    /** params */
    const { openConnectModal } = useConnectModal();
    const { openChainModal } = useChainModal();
    const { disconnect } = useDisconnect();
    const { signMessageAsync } = useSignMessage();
    const { account, setAccount } = store.user();

    /** actions */
    useWatchAccount();

    const getSign = async () => {
        const siweMessage = new SiweMessage({
            domain: window.location.host,
            address: account.address,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1',
            chainId: account.chain.id,
        });

        const message = siweMessage.prepareMessage();
        const signature = await signMessageAsync({ message });

        return {
            signature,
            message,
        };
    };

    /** return */
    return {
        connect: () => {
            if (openConnectModal) openConnectModal();
        },

        disconnect: () => {
            disconnect();
            setAccount({ address: '' });
            localCache.remove('address');
            msg.success('Disconnection Successful!', { autoClose: 500 });
        },

        switchChain: () => {
            if (openChainModal) openChainModal();
        },

        verify: async () => {
            const sign = await getSign();
            console.log(sign);

            const token = localCache.get('token');

            if (!account.address) {
                msg.warning('Please login in first.');
                localCache.remove('token');
                return false;
            } else if (!token) {
                const sign = await getSign();
                const res = await api.user.verify({
                    account: account.address.toLowerCase(),
                    signature: sign.signature,
                    eip4361Message: sign.message,
                });
                localCache.set('token', res.token, res.expire);
            }
            return true;
        },
    };
};
