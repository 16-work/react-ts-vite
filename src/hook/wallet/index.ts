import { modal } from './init';

export default () => {
    const { setAccount } = store.wallet();

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
    };
};
