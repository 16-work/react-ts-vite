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

        // 切换链
        switchChain: async (chainId: number) => {
            // 检测钱包是否已连接
            if (!modal.getIsConnected()) {
                msg.warning('Please connect your wallet first.');
                return;
            }

            // 检测是否在目标链
            if (chainId === account.chainId) {
                msg.success('Already on the target chain.');
                return;
            }

            // 切换
            await modal
                .getWalletProvider()
                ?.request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                        {
                            chainId: '0x' + chainId.toString(16),
                        },
                    ],
                })
                .then(() => {
                    msg.success('Chain Switch Successful!', { autoClose: 1000 });
                })
                .catch(async (e) => {
                    // 拒绝切换
                    if (e.code === 4001) {
                        msg.info('User Reject Switch.', { autoClose: 1000 });
                    }
                    // 未添加链则先添加再切换
                    else if (e.code === 4902) {
                        await addChain(chainId);
                    } else {
                        console.log(e);
                        msg.error('Failed to Switch Chain!');
                    }
                });
        },
    };
};

// 添加链
const addChain = async (chainId: number) => {
    // 是否支持目标链
    const targetChain = defaultChains.find((chain) => chain.chainId === chainId);
    if (!targetChain) {
        msg.error('This chain is not supported!');
        return;
    }

    // 添加
    await modal
        .getWalletProvider()
        ?.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: '0x' + targetChain?.chainId.toString(16),
                    chainName: targetChain.name,
                    rpcUrls: [targetChain.rpcUrl],
                    nativeCurrency: {
                        name: targetChain.currency,
                        symbol: targetChain.currency,
                        decimals: targetChain.precision,
                    },

                    blockExplorerUrls: [targetChain.explorerUrl],
                },
            ],
        })
        .catch((e) => {
            console.log(e);
            msg.error('Failed to Add Chain!');
        });
};
