export const Load = () => {
    // 需要父元素有relative属性才能居中

    return (
        <span className="position-center absolute">
            <SvgIcon name="spin" width={28} color="var(--c-primary)" className=" animate-spin" />
        </span>
    );
};
