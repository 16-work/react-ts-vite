import { useWeb3ModalAccount } from '@web3modal/ethers/react';

export const useWatchAccount = () => {
    const modalAccount = useWeb3ModalAccount();
    const { account, setAccount } = store.web3();

    // 连接成功
    useEffect(() => {
        if (modalAccount.isConnected) {
            // 存储账户信息
            setAccount({ address: modalAccount.address, chainId: modalAccount.chainId });
            console.log('Connection Successful!');
        }
    }, [modalAccount.isConnected]);

    // 账号地址变化
    useEffect(() => {
        if (modalAccount.address && modalAccount.address !== account.address) {
            // 更新账号地址
            setAccount({ address: modalAccount.address });
            console.log('Account Address Switched!');
        }
    }, [modalAccount.address]);

    // 链变化
    useEffect(() => {
        if (modalAccount.chainId && modalAccount.chainId !== account.chainId) {
            // 更新链
            setAccount({ chainId: modalAccount.chainId });
            console.log('Account Chain Switched!');
        }
    }, [modalAccount.chainId]);
};
