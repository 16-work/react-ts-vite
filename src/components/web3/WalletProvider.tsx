import { WAGMI_CONFIG } from '@/constants/wagmi';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

// 主题
const theme = { accentColor: 'var(--c-primary)' };

export const WalletProvider = (props: { children: ReactNode }) => {
    /** params */

    /** actions */

    /** template */
    return (
        <WagmiProvider config={WAGMI_CONFIG}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={store.global().theme === 'theme-light' ? lightTheme(theme) : darkTheme(theme)} coolMode>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
