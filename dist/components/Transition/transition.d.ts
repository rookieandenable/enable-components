import { FC } from "react";
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type AnimationName = 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-bottom' | 'zoom-in-left';
declare type TransitionProps = {
    animation?: AnimationName;
    wrapper?: boolean;
} & CSSTransitionProps;
declare const Transition: FC<TransitionProps>;
export default Transition;
