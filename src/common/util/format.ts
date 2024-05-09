import moment from 'moment';
import { formatUnits, parseUnits } from 'viem';

export const format = {
    time: (time: Date | number, format: string = 'YYYY/MM/DD HH:mm:ss') => {
        return moment(time).format(format);
    },

    timeDistance: (time: number) => {
        const seconds = (new Date().getTime() - new Date(time).getTime()) / 1000;
        if (seconds <= 30) return 'a few seconds ago';
        else if (seconds <= 60) return 'half a minute ago';
        else if (seconds <= 60 * 2) return 'a minute ago';
        else if (seconds <= 60 * 60) return Math.floor(seconds / 60) + ' minute ago';
        else if (seconds <= 60 * 60 * 2) return 'a hour ago';
        else if (seconds <= 60 * 60 * 24) return Math.floor(seconds / 60 / 60) + ' hour ago';
        else if (seconds <= 60 * 60 * 24 * 2) return 'a day ago';
        else if (seconds <= 60 * 60 * 24 * 31) return Math.floor(seconds / 60 / 60 / 24) + ' day ago';
        else return moment(time).format('YYYY/MM/DD HH:mm:ss');
    },

    address: (str: string, first: number, last: number) => {
        if (str && typeof str != 'string') str = str + '';
        if (!str || str.length <= last + first) return str;

        return str.slice(0, first) + '...' + str.slice(str.length - last, str.length);
    },

    token: {
        unit: {
            /** 转为原始值: eg. 1 ether -> 1000000000000000000 wei */
            origin: (value: string, decimals: number = 18) => {
                return parseUnits(value, decimals);
            },
            /** 转为显示值: eg. 1000000000000000000 wei -> 1 ether */
            display: formatUnits,
        },

        price: {
            /** 将原始价格转为常规价格: eg. 1500000000000000000 wei -> 1.50 ether */
            common: (num: bigint, format: string = '0,0.00', decimals: number = 18) => {
                const str = formatUnits(num, decimals);
                return numeral(str).format(format);
            },
            /** 将原始价格转为美元价格 */
            usdt: (usdtUnitPrice: string, value: bigint, format: string = '0,0.00') => {
                const usdtValue = (value * BigInt(Math.round(Number(usdtUnitPrice) * 10000))) / 10000n;
                const final = formatUnits(usdtValue, 18);
                return numeral(final).format(format);
            },
        },
    },
};
