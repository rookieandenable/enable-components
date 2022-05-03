import { ChangeEvent, FC, InputHTMLAttributes, ReactNode } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
declare type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepend?: ReactNode;
    append?: ReactNode;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
declare const Input: FC<InputProps>;
export default Input;
