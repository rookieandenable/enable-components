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
import { jsx as _jsx } from "react/jsx-runtime";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
library.add(fas);
var App = function () {
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (files) {
            var uploadFile = files[0];
            var formData = new FormData();
            formData.append(uploadFile.name, uploadFile);
            axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (res) {
                console.log(res);
            });
        }
    };
    return (_jsx("div", __assign({ className: "App", style: { marginTop: '100px', marginLeft: '100px' } }, { children: _jsx("input", { type: 'file', name: 'myFile', onChange: handleFileChange }) })));
};
export default App;
