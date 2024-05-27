import { Pagination } from 'antd';

export const Pager = (props: { total: number; page: number; pageSize: number; onChange: (page: number) => void; className?: string }) => {
    const isShow = props.total > props.pageSize;

    return (
        isShow && (
            <Pagination
                className={`w-fit m-auto select-none ${props.className}`}
                showQuickJumper
                current={props.page}
                pageSize={props.pageSize}
                total={props.total}
                onChange={(e) => props.onChange(e)}
            />
        )
    );
};
