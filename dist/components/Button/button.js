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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "classnames";
var Button = function (props) {
    var _a;
    var children = props.children, size = props.size, btnType = props.btnType, className = props.className, disabled = props.disabled, href = props.href, resetProps = __rest(props, ["children", "size", "btnType", "className", "disabled", "href"]);
    var classes = classNames('btn', className, (_a = {},
        _a["btn-".concat(btnType)] = btnType,
        _a["btn-".concat(size)] = size,
        _a['disabled'] = disabled && btnType === 'link',
        _a));
    if (btnType === 'link' && href) {
        return _jsx("a", __assign({ href: href, className: classes }, resetProps, { children: children }));
    }
    return _jsx("button", __assign({ className: classes, disabled: disabled }, resetProps, { children: children }));
};
Button.defaultProps = {
    disabled: false,
    btnType: 'default'
};
export default Button;
