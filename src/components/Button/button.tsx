import React, { ButtonHTMLAttributes, FC, AnchorHTMLAttributes } from "react";
import classNames from "classnames";

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  children: React.ReactNode;
  size?: ButtonSize;
  btnType?: ButtonType;
  className?: string;
  disabled?: boolean;
  href?: string;
}

// 获取Button a 标签的所有属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    size,
    btnType,
    className,
    disabled,
    href,
    ...resetProps
  } = props

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': disabled && btnType === 'link'
  })

  if (btnType === 'link' && href) {
    return <a href={href} className={classes} {...resetProps}>{ children }</a>
  }
  return <button className={classes} disabled={disabled} {...resetProps}>{ children }</button>
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button