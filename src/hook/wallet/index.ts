import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
import { defaultChains } from './chains';
import { modal } from './init';
import { Web3ModalType } from '@/common/store/web3/types';

export default () => {
    const { account, setAccount, setModal } = store.web3();

    // 获取Provider
    const getProvider = () => {
        return new BrowserProvider(modal.getWalletProvider()!);
    };

    return {
        getProvider,

        // 打开模态框
        open: (type: Web3ModalType) => {
            setModal({ type: type });
            modal.open({ view: type });
        },

        // 断开连接
        disconnect: () => {
            modal.disconnect();
            setAccount({ address: '' });
            msg.success('Disconnection Successful!', { autoClose: 500 });
        },

        // 判断是否支持当前链
        isChainSupported: () => {
            return defaultChains.findIndex((chain) => chain.chainId === account.chainId) !== -1;
        },

        // 获取验证信息
        getSignMessage: async () => {
            const signer = await getProvider().getSigner();
            const siweMessage = new SiweMessage({
                domain: window.location.host,
                address: signer.address, // to EIP55
                statement: 'App needs you to login',
                uri: window.location.origin,
                version: '1',
                chainId: account.chainId,
            });

            const message = siweMessage.prepareMessage();
            const sign = await signer.signMessage(message);
            return {
                address: signer.address,
                sign,
                message,
            };
        },
    };
};
