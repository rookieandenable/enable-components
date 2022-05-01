import React from "react"
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload, { UploadFile } from "./upload"
import Button from "../Button/button"
import Icon from "../Icon/icon"

const defaultList = [
  {
    uid: '1',
    size: 100,
    name: 'file1',
    percent: 56,
    status: 'uploading' as const
  },
  {
    uid: '2',
    size: 100,
    name: 'file2',
    percent: 100,
    status: 'success' as const
  },
  {
    uid: '3',
    size: 100,
    name: 'file3',
    percent: 0,
    status: 'error' as const
  }
]

const defaultUpload  = () => (
  <Upload
    action="https://run.mocky.io/v3/323b1055-c9a5-46d8-a3fa-e85338d0270b"
    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    defaultFileList={defaultList}
    onProgress={action('progress action')}
    onSuccess={action('success action')}
    onError={action('error action')}
    onChange={action('change action')}
    onRemove={action('remove action')}
  ><Button btnType="primary">default upload</Button></Upload>
)

const dropUploadFile  = () => (
  <Upload
    action="https://run.mocky.io/v3/323b1055-c9a5-46d8-a3fa-e85338d0270b"
    drag
    multiple
  >
    <Icon icon='upload' size='4x'/>
    <br />
    <br />
    <span>上传文件</span>
  </Upload>
)

storiesOf('Upload 上传', module)
  .add('Upload 默认', defaultUpload)
  .add('Upload 拖动', dropUploadFile)