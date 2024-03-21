// 屏幕尺寸
export const screenSizes = {
    xs: '430px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
};

// 通用尺寸
const getSizes = () => {
    const rootSize = 16; // 根元素大小
    const maxPixel = 1500; // 注册尺寸的范围(1~max)

    let sizes = {} as Record<string, string>;
    for (let i = 1; i < maxPixel; i++) {
        sizes[i] = `${i / rootSize}rem`;
    }
    return sizes;
};
export const commonSizes = getSizes();
