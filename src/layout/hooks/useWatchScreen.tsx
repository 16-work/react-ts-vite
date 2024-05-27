export const useWatchScreen = () => {
    const { setIsPC } = store.global();
    const resize = () => {
        setIsPC(window.innerWidth > 500 && !isMobileDevice() ? true : false);
        window.innerWidth > 500 && !isMobileDevice();
    };

    useEffect(() => {
        window.addEventListener('resize', resize);

        resize();
    }, [window.innerWidth]);
};

const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
