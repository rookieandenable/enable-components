import React, { FC, useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu: FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props

  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpened)
  const classes = classNames('menu-item submenu-item', className, {
    'active': context.index === index,
    'menu-open': menuOpen,
    'vertical': context.mode === 'vertical'
  })

  const handleClick  = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    timer && clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }

  const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}
  const hoverEvents = context.mode !== 'vertical' ? { 
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouse(e, true)
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouse(e, false)
    }
   } : {}

   const renderChildren = () => {
     const subClass = classNames('submenu', {
       'menu-open': menuOpen
     })
     const childrenComponents = React.Children.map(children, (child, i) => {
       const childElement = child as React.FunctionComponentElement<MenuItemProps>
       const { displayName } = childElement.type
       if (displayName === 'MenuItem') {
         return React.cloneElement(childElement, {
           index: `${index}-${i}`
         })
       } else {
         console.error('warning: SubMenu should only render MenuItem')
       }
     })

     return <Transition
      in={menuOpen}
      timeout={300}
      animation='zoom-in-top'
     >
       <ul className={subClass}>
        { childrenComponents }
       </ul>
     </Transition>
   }

   return <li className={classes} { ...hoverEvents }>
     <div className="submenu-title" { ...clickEvents }>
       { title }
       <Icon icon='angle-down' className="arrow-icon"/>
     </div>
     { renderChildren() }
   </li>
}

SubMenu.displayName = 'SubMenu'

export default SubMenu