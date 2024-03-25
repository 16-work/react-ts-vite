import { Contract } from 'ethers';

interface TransactParams {
    contract: Contract;
    method: string;
    data: any[];
    value?: number | string;
}

export default () => {
    const { account } = store.web3();
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

                return hash;
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

        // transact
        transact: async ({ contract, method, data = [], value }: TransactParams) => {
            try {
                const contractAddress = await contract.getAddress();
                const signer = await getProvider().getSigner();

                const params = {
                    chainId: account.chainId,
                    from: signer.address,
                    to: contractAddress,
                    data: contract.interface.encodeFunctionData(method, [...data]),
                    ...(value ? { value } : {}),
                };
                const gasLimit = await getProvider().estimateGas(params);
                console.log(`call contract: ${contractAddress}, method: ${method}, params:`, params);

                const hash = await signer.sendUncheckedTransaction({
                    ...params,
                    ...(value ? { value } : {}),
                    gasLimit,
                });

                return hash;
            } catch (error: any) {
                console.log(error);
                if (error && error.info && error.info.error) {
                    console.log(error.info);
                    const err = error.info.error;

                    if (err.code === 4001) {
                        throw new Error('Your operation failed, because you denied this signature.');
                    } else if (err.data) {
                        console.log(err.data);

                        // nsufficient funds for gas
                        if (err.data.message.includes('insufficient funds')) {
                            throw new Error('Insufficient balance to purchase');
                        }

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
