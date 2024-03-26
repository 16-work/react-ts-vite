export const InputNum = (props: {
    num?: number;
    requireN?: boolean; // 正整数
    onChange: (newNum: number) => void;
    className?: string;
    placeholder?: string;
}) => {
    const requireN = props.requireN || false;
    const [value, setValue] = useImmer({ num: props.num, text: format.num(props.num || '') });

    // 失焦时校验及格式化
    const onBlur = () => {
        // 空 | 非数字
        if (value.text.trim() === '' || isNaN(Number(value.text))) {
            msg.warning('Please enter a number!');
            return;
        }
        // 小于0
        else if (Number(value.text) < 0) {
            msg.warning('Please enter a non-negative number');
            return;
        }
        // 非正整数
        else if (requireN) {
            if (Number(value.text) - parseInt(value.text) > 0) {
                msg.warning('Please enter a positive number');
                return;
            }
        }

        // 格式化值
        setValue((draft) => {
            draft.num = Number(value.text);
            draft.text = format.num(value.text, 18);
        });
    };

    // 更新值
    useEffect(() => {
        if (value.num !== props.num) {
            props.onChange(value.num || 0);
        }
    }, [value.num]);

    return (
        <input
            type="text"
            value={value.text}
            className={props.className}
            placeholder={props.placeholder}
            onChange={(e) =>
                setValue((draft) => {
                    draft.text = e.target.value;
                })
            }
            onFocus={() => {
                if (value.num !== undefined) {
                    setValue((draft) => {
                        draft.text = String(draft.num);
                    });
                }
            }}
            onBlur={onBlur}
        />
    );
};
