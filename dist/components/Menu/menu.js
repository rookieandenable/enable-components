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
import React, { createContext, useState } from "react";
import classNames from "classnames";
export var MenuContext = createContext({
    index: '0'
});
var Menu = function (props) {
    var _a;
    var defaultIndex = props.defaultIndex, className = props.className, mode = props.mode, style = props.style, children = props.children, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _b = useState(defaultIndex), currentActive = _b[0], setActive = _b[1];
    var classes = classNames('menu', className, (_a = {},
        _a["menu-".concat(mode)] = mode,
        _a));
    var handleClick = function (index) {
        setActive(index);
        onSelect && onSelect(index);
    };
    var passedContext = {
        index: currentActive || '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error('warning: Menu should only render MenuItem');
            }
        });
    };
    return _jsx("ul", __assign({ className: classes, style: style, "data-testid": 'test-menu' }, { children: _jsx(MenuContext.Provider, __assign({ value: passedContext }, { children: renderChildren() })) }));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
};
export default Menu;
