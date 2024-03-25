export interface WalletStore {
    account: {
        address: string;
        chainId: number;
    };
    setAccount: (account: { address?: string; chainId?: number }) => void;
}
