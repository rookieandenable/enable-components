import { useState, useEffect } from "react";
// 节流函数
export var useDebounce = function (value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), deBounceValue = _a[0], setDeBounceValue = _a[1];
    useEffect(function () {
        var timer = setTimeout(function () {
            setDeBounceValue(value);
        }, delay);
        return function () { return clearTimeout(timer); };
    }, [value, delay]);
    return deBounceValue;
};
