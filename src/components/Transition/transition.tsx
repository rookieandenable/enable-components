import React, { FC } from "react"
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-bottom' | 'zoom-in-left'

type TransitionProps  = {
  animation?: AnimationName;
  wrapper?: boolean;
} & CSSTransitionProps

const Transition: FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...resetProps
  } = props

  return (
    <CSSTransition
      classNames={ classNames ? classNames : animation }
      { ...resetProps }
    >
      { wrapper ? <div>{ children }</div> : children }
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition