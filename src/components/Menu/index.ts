import { FC } from 'react'
import Menu, { MenuProps } from './menu'
import MenuItem, { MenuItemProps } from './menuItem'
import SubMenu, { SubMenuProps } from './subMenu'

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubItem: FC<SubMenuProps>;
}
const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubItem = SubMenu

export default TransMenu;
