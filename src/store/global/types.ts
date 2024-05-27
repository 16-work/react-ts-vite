export interface GlobalStore {
    theme: string;
    setTheme: (theme: string) => void;

    isPC: boolean;
    setIsPC: (bool: boolean) => void;
}
