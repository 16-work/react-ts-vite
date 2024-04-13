export const InputNum = (props: {
    value: number | undefined; // 绑定值
    setError?: (e: string) => void;
    requireN?: boolean; // 正整数
    format?: string;
    onChange: (newNum: number) => void;
    className?: string;
    placeholder?: string;
}) => {
    const requireN = props.requireN || false;
    const format = props.format || (requireN ? '0,0' : '0,0.00');

    const [inputValue, setInputValue] = useImmer({ num: props.value, text: props.value ? numeral(props.value || '').format(format) : '' });

    // 失焦时校验及格式化
    const onBlur = () => {
        // 空 | 非数字
        if (inputValue.text.trim() === '' || isNaN(Number(inputValue.text))) {
            const error = 'Please enter a number!';
            if (props.setError) props.setError(error);
            else msg.warning(error);
            return;
        }
        // 小于0
        else if (Number(inputValue.text) < 0) {
            const error = 'Please enter a non-negative number!';
            if (props.setError) props.setError(error);
            else msg.warning(error);
            return;
        }
        // 非正整数
        else if (requireN && Number(inputValue.text) - parseInt(inputValue.text) > 0) {
            const error = 'Please enter a positive number!';
            if (props.setError) props.setError(error);
            else msg.warning(error);
            return;
        }

        // 格式化值
        setInputValue((draft) => {
            draft.num = Number(inputValue.text);
            draft.text = numeral(inputValue.text).format(format);
        });
        if (props.setError) props.setError('error');
    };

    // 更新值
    useEffect(() => {
        if (inputValue.num !== props.value) {
            props.onChange(inputValue.num || 0);
        }
    }, [inputValue.num]);

    return (
        <input
            type="text"
            value={inputValue.text}
            className={props.className}
            placeholder={props.placeholder}
            onChange={(e) =>
                setInputValue((draft) => {
                    draft.text = e.target.value;
                })
            }
            onFocus={() => {
                if (inputValue.num !== undefined) {
                    setInputValue((draft) => {
                        draft.text = String(draft.num);
                    });
                }
            }}
            onBlur={onBlur}
        />
    );
};
