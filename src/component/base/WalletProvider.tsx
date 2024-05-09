import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, sepolia } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, lightTheme, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, okxWallet } from '@rainbow-me/rainbowkit/wallets';

// 配置项
const config = getDefaultConfig({
    appName: 'Avascriptions',
    projectId: '8de5a8f4d65f36d28b3e25fb7129fbda',
    chains: [mainnet, sepolia],
    wallets: [
        {
            groupName: 'Recommended',
            wallets: [metaMaskWallet, okxWallet],
        },
    ],
});
const queryClient = new QueryClient();

export const WalletProvider = (props: { children: ReactNode }) => {
    /** params */

    /** actions */

    /** template */
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={store.global().theme === 'theme-light' ? lightTheme() : darkTheme()} coolMode>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
