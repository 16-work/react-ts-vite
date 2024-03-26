import { Modal as AModal } from 'antd';

export const Modal = (props: {
    isShow: boolean;
    onClose: () => void; // 关闭事件
    onOk?: () => void; // 确认事件

    title: React.ReactNode; // 输入字符串时会用默认样式
    children: React.ReactNode;

    okText?: string; // 确认文本
    cancelText?: string; // 取消文本
    footer?: React.ReactNode; // 自定义底部
}) => {
    const okText = props.okText || 'Confirm';
    const cancelText = props.cancelText || 'Cancel';

    return (
        <AModal open={props.isShow} footer={null} centered closeIcon={null}>
            {/* modal box */}
            <div className="px-30 py-20">
                {/* header */}
                <div className="flex items-center justify-between">
                    {/* title */}
                    <div className={typeof props.title === 'string' ? 'text-common text-24' : ''}>{props.title}</div>

                    {/* icon: close */}
                    <SvgIcon name="close" width={18} className="text-common hover:text-primary cursor-pointer duration-300" onClick={props.onClose} />
                </div>

                {/* body */}
                {props.children}

                {/* footer */}
                {props.footer ? (
                    props.footer
                ) : (
                    <div className="grid grid-cols-2 gap-x-20 text-20">
                        {/* btn: cancel */}
                        <button className="btn-second px-10 py-6 rounded-8" onClick={props.onClose}>
                            {cancelText}
                        </button>
                        {/* btn: ok */}
                        <button className="btn-primary px-10 py-6 rounded-8" onClick={props.onOk}>
                            {okText}
                        </button>
                    </div>
                )}
            </div>
        </AModal>
    );
};
