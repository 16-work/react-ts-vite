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

    num: (num: number | bigint | string, dec: number = 3, sub: boolean = false) => {
        if (typeof num == 'bigint') {
            num = num.toString();
        } else if (typeof num == 'number') {
            num = num + '';
        }

        let digit = 0;
        let newNums = [];
        let [intg, deci] = num.split('.');
        // 根据位数插入','
        for (let i = intg.length - 1; i >= 0; i--) {
            newNums.push(intg[i]);
            digit++;
            if (digit % 3 == 0 && i != 0) {
                newNums.push(',');
            }
        }

        // 反转
        let newNum = newNums.reverse().join('');

        if (typeof dec == 'number' && dec > 0 && typeof deci != 'undefined') {
            if (sub) {
                // 下标
                let zeroCount = 0;

                for (let i = 0; i < deci.length; i++) {
                    if (deci.charAt(i) == '0') {
                        zeroCount++;
                    } else {
                        break;
                    }
                }

                if (deci.length > zeroCount) {
                    let dot = '.';
                    if (zeroCount > 3) {
                        newNum += `.0<sub>${zeroCount}</sub>`;
                        deci = deci.substring(zeroCount);
                        dot = '';
                    }

                    // 存在小数则加回
                    if (deci.length > dec) {
                        deci = deci.substring(0, dec);
                    }
                    newNum += dot + deci;
                }
            } else {
                // 无下标
                if (deci.length > dec) {
                    deci = deci.substring(0, dec);
                }
                newNum += '.' + deci;
            }
        }

        return format.toFixed(newNum);
    },

    largeNum: (num: number | string, dec: number = 2, ignoreKilo = false) => {
        if (typeof num == 'string') {
            num = Number(num);
            if (!num) {
                num = 0;
            }
        }
        if (num >= 1000000000000000) {
            return format.toFixed(num / 1000000000000000, dec) + 'P';
        }
        if (num >= 1000000000000) {
            return format.toFixed(num / 1000000000000, dec) + 'T';
        }
        if (num >= 1000000000) {
            return format.toFixed(num / 1000000000, dec) + 'B';
        }
        if (num >= 1000000) {
            return format.toFixed(num / 1000000, dec) + 'M';
        }
        if (num >= 1000 && !ignoreKilo) {
            return format.toFixed(num / 1000, dec) + 'K';
        }
        return format.toFixed(num, dec);
    },

    toFixed: (num: number | string, dec: number = 4) => {
        let result = typeof num == 'number' ? num.toFixed(dec) : num;
        if (result.indexOf('.') == -1) {
            return result;
        }
        for (var i = result.length - 1; i >= 0; i--) {
            if (result.charAt(i) == '0') {
                continue;
            } else if (result.charAt(i) == '.') {
                result = result.substring(0, i);
                break;
            } else {
                if (i < result.length - 1) {
                    result = result.substring(0, i + 1);
                }
                break;
            }
        }
        return result;
    },

    fileSize: (fileSize: number) => {
        if (!fileSize) return '0 Bytes';
        const unitArr = new Array('Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
        let index = 0;
        index = Math.floor(Math.log(fileSize) / Math.log(1024));
        let size = Math.floor((fileSize / Math.pow(1024, index)) * 100);
        return (size / 100).toFixed(2) + unitArr[index];
    },
};
