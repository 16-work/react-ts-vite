import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';

export interface Option {
    label: string;
    value: any;
}

export const DropList = (props: {
    children: JSX.Element;
    currentValue: any;
    options: Option[];
    onSelect: (value: any) => void;
    placement?: TooltipPlacement;
}) => {
    return (
        <Popover
            placement={props.placement}
            content={
                // drop list
                <div className="grid grid-cols-1 px-20 py-10">
                    {props.options.map((option, index) => (
                        // option
                        <span
                            key={index}
                            className={`
                                py-6 px-10 text-common hover:text-second text-18 cursor-pointer duration-200
                                ${index === 0 ? '' : 'pt-10 border-t border-hr-1'}
                                ${props.currentValue === option.value || props.currentValue === option ? '!text-primary' : ''}
                            `}
                            onClick={() => props.onSelect(option.value)}
                        >
                            {option.label}
                        </span>
                    ))}
                </div>
            }
        >
            {props.children}
        </Popover>
    );
};
