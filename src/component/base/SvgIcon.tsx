interface Props {
    name: string;
    width: number;
    height?: number;
    color?: string;
    fill?: string;
    className?: string;
    onClick?: () => void;
}

export const SvgIcon = (props: Props) => {
    const pxToRem = (px: number) => {
        return `${px / 16}rem`;
    };

    return (
        <svg
            className={props.className}
            style={{
                width: `${pxToRem(props.width)}`,
                height: `${pxToRem(props.height || props.width)}`,
                color: props.color,
            }}
            onClick={props.onClick}
        >
            <use xlinkHref={`#icon-${props.name}`} fill={props.fill || props.color} />
        </svg>
    );
};
