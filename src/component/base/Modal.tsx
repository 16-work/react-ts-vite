import { Modal as AModal } from 'antd';

export const Modal = (props: {
    isShow: boolean;
    onClose: () => void; // 关闭事件
    onOk?: () => void; // 确认事件
    isLoading?: boolean; // 加载中

    title: React.ReactNode; // 输入字符串时会用默认样式
    children: React.ReactNode;

    okText?: string; // 确认文本
    cancelText?: string; // 取消文本（无值不显示取消按钮）
    footer?: React.ReactNode; // 自定义底部
}) => {
    const okText = props.okText || 'Confirm';

    return (
        <AModal open={props.isShow} footer={null} centered closeIcon={null}>
            {/* modal box */}
            <div className="px-30 py-20">
                {/* header */}
                <div className="flex items-center justify-between">
                    {/* title */}
                    <div className={typeof props.title === 'string' ? 'text-common text-24' : ''}>{props.title}</div>

                    {/* icon: close */}
                    <SvgIcon name="close" width={18} className="text-common hover:text-second cursor-pointer duration-300" onClick={props.onClose} />
                </div>

                {/* body */}
                {props.children}

                {/* footer */}
                {props.footer ? (
                    props.footer
                ) : (
                    <div className="grid grid-cols-2 gap-x-20 text-20">
                        {/* btn: cancel */}
                        {props.cancelText && (
                            <button className="btn-second px-10 py-8 rounded-8" onClick={props.onClose}>
                                {props.cancelText}
                            </button>
                        )}

                        {/* btn: ok */}
                        <button
                            className={`btn-primary flex justify-center items-center px-10 py-8 rounded-8
                                ${props.cancelText ? '' : 'col-span-2'}
                            `}
                            onClick={props.onOk}
                        >
                            {okText}
                            {props.isLoading && <SvgIcon name="spin" width={18} color="var(--c-text-common)" className="ml-6 animate-spin" />}
                        </button>
                    </div>
                )}
            </div>
        </AModal>
    );
};
