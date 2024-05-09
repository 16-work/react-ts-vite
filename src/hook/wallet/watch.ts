import { useConnectModal, useChainModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Chain } from 'wagmi/chains';

export default () => {
    const account = useAccount();
    const { connectModalOpen } = useConnectModal();
    const { chainModalOpen } = useChainModal();

    const web3Store = store.web3();

    // 监听账户变化
    useEffect(() => {
        // 账户切换
        if (account.address) {
            web3Store.setAccount({ address: account.address });
        }
    }, [account.address]);

    // 监听连接状态
    useEffect(() => {
        // 连接中
        if (connectModalOpen) web3Store.setAccount({ isConnecting: true });
        // 连接结束
        else if (!account.isConnecting) web3Store.setAccount({ isConnecting: false });
    }, [connectModalOpen]);

    // 监听链变化
    useEffect(() => {
        // 当前链支持
        if (account.chain) web3Store.setAccount({ chain: account.chain });
        // 当前链不支持
        else web3Store.setAccount({ chain: {} as Chain });
    }, [account.chainId]);

    // 监听切换链状态
    useEffect(() => {
        web3Store.setAccount({ isChainSwitching: chainModalOpen });
    }, [chainModalOpen]);
};
