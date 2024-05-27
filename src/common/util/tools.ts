import copy from 'copy-to-clipboard';

export const tools = {
    copy,

    sleep: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

    logTimeOverhead: (func: Function) => {
        console.time('Time overhead:');
        func();
        console.timeEnd('Time overhead:');
    },
};
