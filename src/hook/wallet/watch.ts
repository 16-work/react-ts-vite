import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { modal } from './init';

export const useWatchAccount = () => {
    const modalAccount = useWeb3ModalAccount();
    const { account, setAccount, setModal } = store.web3();

    // 监听modal事件
    modal.subscribeEvents((e) => {
        const eventName = e.data.event;

        // 切换modal启动状态
        if (eventName === 'MODAL_OPEN') setModal({ isOpen: true });
        else if (eventName === 'MODAL_CLOSE' || eventName === 'CONNECT_SUCCESS') setModal({ isOpen: false });
    });

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
