export interface Web3Store {
    account: {
        address: string;
        chainId: number;
    };
    setAccount: (account: { address?: string; chainId?: number }) => void;

    modal: {
        isOpen: boolean;
        type: Web3ModalType;
    };
    setModal: (status: { isOpen?: boolean; type?: Web3ModalType }) => void;

    explorerURL: string;
}

export type Web3ModalType = 'Account' | 'Connect' | 'Networks' | 'ApproveTransaction';
