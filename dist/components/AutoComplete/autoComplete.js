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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import classNames from "classnames";
import Input from "../Input/input";
import { useDebounce } from "../../hooks/useDebounce";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, renderOption = props.renderOption, debounceTime = props.debounceTime, value = props.value, resetProps = __rest(props, ["fetchSuggestions", "onSelect", "renderOption", "debounceTime", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), index = _d[0], setIndex = _d[1];
    var triggerSearch = useRef(false);
    var autoCompleteRef = useRef(null);
    var debounceValue = useDebounce(inputValue, debounceTime);
    useClickOutSide(autoCompleteRef, function () { return setSuggestions([]); });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            var results = fetchSuggestions === null || fetchSuggestions === void 0 ? void 0 : fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setSuggestions([]);
                setLoading(true);
                results.then(function (data) {
                    setSuggestions(data);
                    setLoading(false);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
        setIndex(-1);
    }, [debounceValue, fetchSuggestions]);
    var hightLight = useCallback(function (i) {
        if (i < 0) {
            i = 0;
        }
        if (i >= suggestions.length) {
            i = suggestions.length - 1;
        }
        setIndex(i);
    }, [suggestions]);
    var change = useCallback(function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    }, []);
    var handleSelect = useCallback(function (dataSource) {
        setInputValue(dataSource.value);
        setSuggestions([]);
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(dataSource);
        triggerSearch.current = false;
    }, [onSelect]);
    var handleKeyDown = useCallback(function (e) {
        switch (e.keyCode) {
            case 13:
                suggestions[index] && handleSelect(suggestions[index]);
                break;
            case 38:
                hightLight(index - 1);
                break;
            case 40:
                hightLight(index + 1);
                break;
            case 27:
                setSuggestions([]);
                setIndex(-1);
                break;
            default:
                break;
        }
    }, [handleSelect, hightLight, index, suggestions]);
    var renderTemplate = useCallback(function (dataSource) {
        return renderOption ? renderOption(dataSource) : dataSource.value;
    }, [renderOption]);
    var generateDropdown = useMemo(function () { return (_jsx(Transition, __assign({ in: suggestions.length > 0 || loading, animation: 'zoom-in-top', timeout: 300, onExited: function () { return setSuggestions([]); } }, { children: _jsxs("ul", __assign({ className: "suggestion-list" }, { children: [loading && _jsx("div", __assign({ className: "suggestion-loading-icon" }, { children: _jsx(Icon, { icon: 'spinner', spin: true }) })), suggestions.map(function (value, i) {
                    var classes = classNames('suggestion-item', {
                        'item-highlighted': i = index
                    });
                    return (_jsx("li", __assign({ className: classes, onClick: function () { return handleSelect(value); } }, { children: renderTemplate(value) }), i));
                })] })) }))); }, [handleSelect, index, loading, renderTemplate, suggestions]);
    return (_jsxs("div", __assign({ className: "auto-complete", ref: autoCompleteRef }, { children: [_jsx(Input, __assign({ value: inputValue, onChange: change, onKeyDown: handleKeyDown }, resetProps)), generateDropdown] })));
};
export default AutoComplete;
