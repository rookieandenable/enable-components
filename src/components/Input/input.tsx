import { ChangeEvent, FC, InputHTMLAttributes, ReactNode } from "react"
import classNames from "classnames"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import Icon from "../Icon/icon"

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean
  size?: InputSize
  icon?: IconProp
  prepend?: ReactNode
  append?: ReactNode
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    prepend,
    append,
    icon,
    style,
    ...resetProps
  } = props

  const classes = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-prepend': !!prepend,
    'input-group-append': !!append
  })

  if ('value' in props) {
    const copy = Object.assign({}, props)
    delete copy.defaultValue
    copy.value = copy.value ? copy.value : ''
  }

  return (
    <div className={classes} style={style} data-testid={'test-input-wrapper'}>
      { prepend && <div className="mack-input-group-append">{prepend}</div> }
      { icon && <div className="icon-wrapper"><Icon icon={icon} title={`icon-${icon}`} /></div> }
      <input 
        className="mack-input-inner"
        disabled={disabled}
        { ...resetProps }
      />
      { append && <div className="mack-input-group-append">{append}</div> }
    </div>
  )
}

Input.defaultProps = {
  disabled: false
}

export default Input;