import { FC } from "react";
export declare type FileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: FileStatus;
    percent?: number;
    /** 源文件对象 */
    raw?: File;
    /** 成功响应信息 */
    response?: any;
    /** 失败响应信息 */
    error?: any;
}
export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    headers?: Record<string, any>;
    name?: string;
    /** 用户自定义的数据 */
    data?: Record<string, any>;
    /** 携带 cookie */
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
    /** 文件上传前的操作 */
    beforeUpload?: (file: UploadFile) => boolean | Promise<UploadFile>;
    /** 文件上传进度 */
    onProgress?: (e: ProgressEvent, file: UploadFile) => void;
    /** 文件上传触发的方法 */
    onChange?: (file: UploadFile) => void;
    /** 文件上传成功 */
    onSuccess?: (data: any, file: UploadFile) => void;
    /** 文件上传失败 */
    onError?: (err: any, file: UploadFile) => void;
    /** 删除文件 */
    onRemove?: (file: UploadFile) => void;
}
declare const Upload: FC<UploadProps>;
export default Upload;
