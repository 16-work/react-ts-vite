import { parseUnits, formatUnits } from 'ethers';
import moment from 'moment';

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
            origin: (value: string, unit?: number) => {
                return parseUnits(String(value), unit);
            },
            display: formatUnits,
        },

        price: {
            common: (num: bigint, format: string = '0,0.00') => {
                const str = formatUnits(num, 18);
                return numeral(str).format(format);
            },
            usdt: (unitPrice: string, value: bigint, format: string = '0,0.00') => {
                const usdtValue = (value * BigInt(Math.round(Number(unitPrice) * 10000))) / 10000n;
                const final = formatUnits(usdtValue, 18);
                return numeral(final).format(format);
            },
        },
    },
};
