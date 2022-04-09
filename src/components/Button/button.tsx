import classNames from "classnames";
import React, { FC } from "react";

export type ButtonSize = 'large' | 'small'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  children: React.ReactNode;
  size?: ButtonSize;
  btnType?: ButtonType;
  className?: string;
  disabled?: boolean;
  href?: string;
}

const Button: FC<BaseButtonProps> = (props) => {
  const {
    children,
    size,
    btnType,
    className,
    disabled,
    href
  } = props

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': disabled && btnType === 'link'
  })

  if (btnType === 'link' && href) {
    return <a href={href} className={classes}>{ children }</a>
  }
  return <button className={classes} disabled={disabled}>{ children }</button>
}

Button.defaultProps = {
  disabled: false
}

export default Button