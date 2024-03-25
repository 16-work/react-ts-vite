export interface Web3Store {
    account: {
        address: string;
        chainId: number;
    };
    setAccount: (account: { address?: string; chainId?: number }) => void;

    explorerURL: string;
}
