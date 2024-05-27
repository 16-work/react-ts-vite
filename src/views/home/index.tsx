export const PageHome = () => {
    const { account } = store.user();

    return (
        <div>
            <button onClick={() => hooks.wallet.connect()}>Login</button>
            <div onClick={() => tools.copy('123')}>{account.address}</div>
            <button onClick={() => hooks.wallet.disconnect()}>Logout</button>
        </div>
    );
};
