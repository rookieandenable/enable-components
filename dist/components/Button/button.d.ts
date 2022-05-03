import React, { ButtonHTMLAttributes, FC, AnchorHTMLAttributes } from "react";
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    children: React.ReactNode;
    size?: ButtonSize;
    btnType?: ButtonType;
    className?: string;
    disabled?: boolean;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
declare const Button: FC<ButtonProps>;
export default Button;
