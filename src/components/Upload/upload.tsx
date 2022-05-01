import { FC, useState, useRef, ChangeEvent } from "react"
import axios from "axios"
import { v4 as uuid } from 'uuid'
import FileList from "./fileList";
import Dragger from "./dragger";

export type FileStatus = 'ready' | 'uploading' | 'success' | 'error'

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

const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    children,
    drag
  } = props

  // 存储文件列表
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const fileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInput.current?.click()
  }

  // 更新正在上传中的文件数据
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        }
        return file
      })
    })
  }

  const post = (uploadFile: UploadFile) => {
    setFileList((prevList) => [uploadFile, ...prevList])
    const formData = new FormData()
    // 添加用户自定义携带的参数
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }

    formData.append(name!, uploadFile.raw!)
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress(progressEvent: ProgressEvent) {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total) || 0
        // 上传中
        if (percentage < 100) {
          const percentFileObj: Partial<UploadFile> = {
            percent: percentage,
            status: 'uploading'
          }
          updateFileList(uploadFile, percentFileObj)
          onProgress?.(progressEvent, { ...uploadFile, ...percentFileObj })
        }
      }
    }).then(res => {
      const successUploadObj: Partial<UploadFile> = {
        status: 'success',
        percent: 100,
        response: res
      }
      onChange?.({ ...uploadFile, ...successUploadObj })
      onSuccess?.(res.data, { ...uploadFile, ...successUploadObj })
      updateFileList(uploadFile, successUploadObj)
    }).catch(err => {
      const errorUploadObj: Partial<UploadFile> = {
        status: 'error',
        error: err
      }
      onChange?.({ ...uploadFile, ...errorUploadObj })
      onError?.(err, { ...uploadFile, ...errorUploadObj })
      updateFileList(uploadFile, errorUploadObj)
    })
  }

  // 处理文件上传
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach(file => {
      const uploadFile: UploadFile = {
        uid: uuid(),
        status: 'ready',
        name: file.name,
        size: file.size,
        percent: 0,
        raw: file
      }

      if (!beforeUpload) {
        post(uploadFile)
      } else {
        const newFile = beforeUpload(uploadFile)
        if (newFile instanceof Promise) {
          newFile.then(post)
        } else {
          newFile && post(uploadFile)
        }
      }
    })
  }

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    // fileInput.current && (fileInput.current.value = '')
  }

  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    onRemove?.(file)
  }

  return (
    <div className="upload-component">
      <div
        className="upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}
      >
        { drag ? <Dragger onFile={uploadFiles} children={children}/> :  children }
        <input
          className="file-input"
          ref={fileInput}
          onChange={handleUploadFile}
          style={{ display: 'none' }}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>
      <FileList fileList={fileList} onRemove={handleRemove}/>
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
  withCredentials: false,
  multiple: false
}

export default Upload;