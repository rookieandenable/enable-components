import React, { FC } from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
  className?: string
}

const Icon: FC<IconProps> = (props) => {
  const { theme, className, ...resetProps } = props
  const classes = classNames('icon', className, {
    [`icon-${theme}`]: theme
  })

  return <FontAwesomeIcon 
    className={classes}
    { ...resetProps }
  />
}

export default Icon;