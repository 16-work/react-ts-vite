export const PageHome = () => {
    const { account } = store.user();

    return (
        <div>
            <button onClick={() => hooks.wallet.connect()}>Login</button>
            <div>{account.address}</div>
        </div>
    );
};
