import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, okxWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { SUPPORT_CHAINS } from './chain';

export const WAGMI_CONFIG = getDefaultConfig({
    appName: 'astroswap',
    projectId: '8de5a8f4d65f36d28b3e25fb7129fbda',
    chains: SUPPORT_CHAINS,
    wallets: [
        {
            groupName: 'Recommended',
            wallets: [metaMaskWallet, okxWallet, walletConnectWallet],
        },
    ],
});
