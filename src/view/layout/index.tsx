export const Layout = () => {
    return (
        <div className={`h-screen flex flex-col overflow-hidden`}>
            {/* main */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};
