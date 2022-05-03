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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";
var FileList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (_jsx("ul", __assign({ className: "upload-list" }, { children: fileList.map(function (file) {
            var _a;
            return (_jsxs("li", __assign({ className: "upload-list-item" }, { children: [_jsxs("span", __assign({ className: "file-name file-name-".concat(file.status) }, { children: [_jsx(Icon, { icon: 'file-alt', theme: 'secondary' }), file.name] })), _jsxs("span", __assign({ className: "file-status" }, { children: [file.status === 'uploading' && _jsx(Icon, { icon: 'spinner', spin: true, theme: "primary" }), file.status === 'success' && _jsx(Icon, { icon: 'check-circle', theme: "success" }), file.status === 'error' && _jsx(Icon, { icon: 'times-circle', theme: "danger" })] })), _jsx("span", __assign({ className: "file-actions" }, { children: _jsx(Icon, { icon: 'times', onClick: function () { return onRemove(file); } }) })), file.status === 'uploading' && _jsx(Progress, { percent: (_a = file.percent) !== null && _a !== void 0 ? _a : 0 })] }), file.uid));
        }) })));
};
export default FileList;
