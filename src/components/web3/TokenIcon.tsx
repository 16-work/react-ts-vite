import { Image } from 'antd';
import IconDefaultToken from '@/assets/img/token-default.png';

export const TokenIcon = (props: { size: number; icon: string; className?: string }) => {
    const pxToRem = (px: number) => {
        return `${px / 16}rem`;
    };

    return (
        <span className={`flex-align-x ${props.className}`}>
            <Image src={props.icon} fallback={IconDefaultToken} width={pxToRem(props.size)} height={pxToRem(props.size)} preview={false} />
        </span>
    );
};
