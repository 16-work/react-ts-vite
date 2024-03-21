import { message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';

export const UploadImg = (props: { maxMB: number; img?: string; setImg: (base64URL: string) => void }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setIsLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as FileType, async (base64URL) => {
                // const res = await api.upload({
                //     contentType: info.file.type!,
                //     imageBase64: base64URL.split(',')[1],
                // });
                // props.setImg(res);

                props.setImg(base64URL);
                setIsLoading(false);
            });
        }
    };

    return (
        <>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader relative"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={(file) => beforeUpload(props.maxMB, file)}
                onChange={handleChange}
            >
                {props.img ? (
                    // 图片
                    <img src={props.img} alt="avatar" className="h-full" />
                ) : (
                    // 无图
                    <span className="text-common text-26">Please upload img</span>
                )}

                {/* 加载中 */}
                {isLoading && <Load />}
            </Upload>
        </>
    );
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (maxMB: number, file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt = file.size / 1024 / 1024 < maxMB;
    if (!isLt) {
        message.error(`Image must smaller than ${maxMB}MB!`);
    }
    return isJpgOrPng && isLt;
};
