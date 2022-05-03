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
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from './menu';
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
var SubMenu = function (props) {
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    var _a = useState(isOpened), menuOpen = _a[0], setOpen = _a[1];
    var classes = classNames('menu-item submenu-item', className, {
        'active': context.index === index,
        'menu-open': menuOpen,
        'vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        timer && clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {};
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) {
            handleMouse(e, true);
        },
        onMouseLeave: function (e) {
            handleMouse(e, false);
        }
    } : {};
    var renderChildren = function () {
        var subClass = classNames('submenu', {
            'menu-open': menuOpen
        });
        var childrenComponents = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i)
                });
            }
            else {
                console.error('warning: SubMenu should only render MenuItem');
            }
        });
        return _jsx(Transition, __assign({ in: menuOpen, timeout: 300, animation: 'zoom-in-top' }, { children: _jsx("ul", __assign({ className: subClass }, { children: childrenComponents })) }));
    };
    return _jsxs("li", __assign({ className: classes }, hoverEvents, { children: [_jsxs("div", __assign({ className: "submenu-title" }, clickEvents, { children: [title, _jsx(Icon, { icon: 'angle-down', className: "arrow-icon" })] })), renderChildren()] }));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
