var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import axios from "axios";
import { v4 as uuid } from 'uuid';
import FileList from "./fileList";
import Dragger from "./dragger";
var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, children = props.children, drag = props.drag;
    // 存储文件列表
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var fileInput = useRef(null);
    var handleClick = function () {
        var _a;
        (_a = fileInput.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    // 更新正在上传中的文件数据
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                return file;
            });
        });
    };
    var post = function (uploadFile) {
        setFileList(function (prevList) { return __spreadArray([uploadFile], prevList, true); });
        var formData = new FormData();
        // 添加用户自定义携带的参数
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        formData.append(name, uploadFile.raw);
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (progressEvent) {
                var percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total) || 0;
                // 上传中
                if (percentage < 100) {
                    var percentFileObj = {
                        percent: percentage,
                        status: 'uploading'
                    };
                    updateFileList(uploadFile, percentFileObj);
                    onProgress === null || onProgress === void 0 ? void 0 : onProgress(progressEvent, __assign(__assign({}, uploadFile), percentFileObj));
                }
            }
        }).then(function (res) {
            var successUploadObj = {
                status: 'success',
                percent: 100,
                response: res
            };
            onChange === null || onChange === void 0 ? void 0 : onChange(__assign(__assign({}, uploadFile), successUploadObj));
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(res.data, __assign(__assign({}, uploadFile), successUploadObj));
            updateFileList(uploadFile, successUploadObj);
        }).catch(function (err) {
            var errorUploadObj = {
                status: 'error',
                error: err
            };
            onChange === null || onChange === void 0 ? void 0 : onChange(__assign(__assign({}, uploadFile), errorUploadObj));
            onError === null || onError === void 0 ? void 0 : onError(err, __assign(__assign({}, uploadFile), errorUploadObj));
            updateFileList(uploadFile, errorUploadObj);
        });
    };
    // 处理文件上传
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            var uploadFile = {
                uid: uuid(),
                status: 'ready',
                name: file.name,
                size: file.size,
                percent: 0,
                raw: file
            };
            if (!beforeUpload) {
                post(uploadFile);
            }
            else {
                var newFile = beforeUpload(uploadFile);
                if (newFile instanceof Promise) {
                    newFile.then(post);
                }
                else {
                    newFile && post(uploadFile);
                }
            }
        });
    };
    var handleUploadFile = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        // fileInput.current && (fileInput.current.value = '')
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        onRemove === null || onRemove === void 0 ? void 0 : onRemove(file);
    };
    return (_jsxs("div", __assign({ className: "upload-component" }, { children: [_jsxs("div", __assign({ className: "upload-input", style: { display: 'inline-block' }, onClick: handleClick }, { children: [drag ? _jsx(Dragger, { onFile: uploadFiles, children: children }) : children, _jsx("input", { className: "file-input", ref: fileInput, onChange: handleUploadFile, style: { display: 'none' }, type: "file", accept: accept, multiple: multiple })] })), _jsx(FileList, { fileList: fileList, onRemove: handleRemove })] })));
};
Upload.defaultProps = {
    name: 'file',
    withCredentials: false,
    multiple: false
};
export default Upload;
