export default () => {
    const { account } = store.wallet();
    const { getProvider } = hook.wallet();

    return {
        // send
        send: async (params: { from?: string; to: string; data: string; value?: number }) => {
            try {
                const signer = await getProvider().getSigner();
                const hash = await signer.sendUncheckedTransaction({
                    chainId: account.chainId,
                    from: params.from || signer.address,
                    to: params.to,
                    data: params.data,
                    value: params.value || 0,
                });

                return { hash };
            } catch (error: any) {
                if (error && error.info && error.info.error) {
                    const err = error.info.error;
                    if (err.code === 4001) {
                        throw new Error('Your operation failed, because you denied this signature.');
                    } else if (err.data) {
                        throw new Error(err.data.message);
                    } else {
                        throw err;
                    }
                } else {
                    throw new Error(error.message);
                }
            }
        },
    };
};
