import { defaultChains } from './chains';
import { modal } from './init';

export default () => {
    const { account, setAccount } = store.wallet();

    return {
        // 打开连接窗口
        connect: () => {
            modal.open();
        },

        // 断开连接
        disconnect: () => {
            modal.disconnect();
            setAccount({ address: '' });
            console.log('Disconnection Successful!');
        },

        // 判断是否支持当前链
        isChainSupported: () => {
            return defaultChains.findIndex((chain) => chain.chainId === account.chainId) !== -1;
        },
    };
};
