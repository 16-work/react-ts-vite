export const PageHome = () => {
    return (
        <div>
            <button onClick={() => hooks.wallet.connect()}>Login</button>
        </div>
    );
};
