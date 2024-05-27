export const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center relative top-1/2 -translate-y-1/2">
            <h1 className="text-primary text-80 font-bold select-none">404</h1>
            <h2 className="text-gray-400 text-30 font-bold text-center">Sorry, the page you are looking for could not be found.</h2>

            <button
                className="btn-primary 
                flex items-center mt-50 px-20 py-10 
                text-18 rounded-8 duration-300"
                onClick={() => router.navigate('/')}
            >
                <SvgIcon name="arrow-left" width={30} className="mr-10 text-common" />
                Return Home
            </button>
        </div>
    );
};
