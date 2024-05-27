import ImgNoData from '@/assets/img/no-data.png';

export const NoData = () => {
    // 需要父元素有relative属性才能居中

    return <img src={ImgNoData} className="position-center absolute w-200" />;
};
