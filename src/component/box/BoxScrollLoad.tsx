import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider } from 'antd';

export const BoxScrollLoad = (props: { id: string; list: any[]; hasMore: boolean; onLoadMore: () => void; children: React.ReactNode; className?: string }) => {
    return (
        <div id={props.id} className={`w-full h-full overflow-auto ${props.className}`}>
            <InfiniteScroll
                scrollableTarget={props.id}
                dataLength={props.list.length}
                next={props.onLoadMore}
                hasMore={props.hasMore}
                loader={
                    <div className="relative w-full h-50">
                        <Load />
                    </div>
                }
                endMessage={<Divider className="text-18 !text-[--c-text-tip] select-none">It is all, nothing more.</Divider>}
            >
                {props.children}
            </InfiniteScroll>
        </div>
    );
};
