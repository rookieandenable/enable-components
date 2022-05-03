import { FC } from "react";
import { UploadFile } from "./upload";
export interface FileListProps {
    fileList: UploadFile[];
    onRemove: (file: UploadFile) => void;
}
declare const FileList: FC<FileListProps>;
export default FileList;
