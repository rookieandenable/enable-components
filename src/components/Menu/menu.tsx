import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({
  index: '0'
})

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect, defaultOpenSubMenus } = props;
  const [ currentActive, setActive ] = useState(defaultIndex);

  const classes = classNames('menu', className, {
    [`menu-${mode}`]: mode
  })

  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index)
  }

  const passedContext = {
    index: currentActive || '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type

      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error('warning: Menu should only render MenuItem')
      }
    })
  }

  return <ul className={classes} style={style} data-testid='test-menu'>
  <MenuContext.Provider value={passedContext}>
    { renderChildren() }
  </MenuContext.Provider>
</ul>
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu;