import { useEffect } from "react";
export function useClickOutSide(ref, handle) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handle(event);
        };
        document.addEventListener('click', listener);
        return function () { return document.removeEventListener('click', listener); };
    }, [ref, handle]);
}
