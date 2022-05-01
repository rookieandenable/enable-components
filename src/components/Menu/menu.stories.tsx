import React, { Fragment } from "react"
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from "./menu"
import MenuItem from "./menuItem"
import SubMenu from "./subMenu"

const defaultMenu = () => {
  return <Menu onSelect={action('default menu')}>
    <MenuItem>menu-1</MenuItem>
    <MenuItem>menu-2</MenuItem>
    <MenuItem>menu-3</MenuItem>
  </Menu>
}

const modeMenu = () => {
  return <Fragment>
    <h4>水平模式</h4>
    <br />
    <Menu onSelect={action('horizontal menu')}>
      <MenuItem>menu-1</MenuItem>
      <MenuItem>menu-2</MenuItem>
      <MenuItem>menu-3</MenuItem>
    </Menu>

  <br />
  <h4>垂直模式</h4>
  <br />
  <Menu mode="vertical" onSelect={action('vertical mode menu')}>
    <MenuItem>menu-1</MenuItem>
    <MenuItem>menu-2</MenuItem>
    <MenuItem>menu-3</MenuItem>
  </Menu>
  </Fragment>
}

const subMenuComponent = () => {
  return <Fragment>
    <h4>水平模式</h4>
    <br />
    <Menu onSelect={action('horizontal menu')}>
      <MenuItem>menu-1</MenuItem>
      <MenuItem>menu-2</MenuItem>
      <MenuItem>menu-3</MenuItem>
      <SubMenu title='menu3'>
        <MenuItem>submenu3-1</MenuItem>
        <MenuItem>submenu3-2</MenuItem>
        <MenuItem>submenu3-3</MenuItem>
      </SubMenu>
    </Menu>

    <br />
    <h4>垂直模式</h4>
    <br />
    <Menu mode="vertical" onSelect={action('vertical mode menu')}>
      <MenuItem>menu-1</MenuItem>
      <MenuItem>menu-2</MenuItem>
      <MenuItem>menu-3</MenuItem>
      <SubMenu title='menu3'>
        <MenuItem>submenu3-1</MenuItem>
        <MenuItem>submenu3-2</MenuItem>
        <MenuItem>submenu3-3</MenuItem>
      </SubMenu>
    </Menu>
  </Fragment>
}

const subMenuOthers = () => {
  return <Fragment>
    <br />
    <Menu defaultIndex="2" onSelect={action('horizontal menu')}>
      <MenuItem>menu-1</MenuItem>
      <MenuItem>menu-2</MenuItem>
      <MenuItem>menu-3</MenuItem>
      <SubMenu title='menu3'>
        <MenuItem>submenu3-1</MenuItem>
        <MenuItem>submenu3-2</MenuItem>
        <MenuItem>submenu3-3</MenuItem>
      </SubMenu>
    </Menu>

    <br />
    <h4>默认打开</h4>
    <br />
    <Menu mode="vertical" defaultIndex="3" onSelect={action('vertical mode menu')}>
      <MenuItem>menu-1</MenuItem>
      <MenuItem>menu-2</MenuItem>
      <MenuItem>menu-3</MenuItem>
      <SubMenu title='menu3'>
        <MenuItem>submenu3-1</MenuItem>
        <MenuItem>submenu3-2</MenuItem>
        <MenuItem>submenu3-3</MenuItem>
      </SubMenu>
    </Menu>
  </Fragment>
}

storiesOf('Menu 导航菜单', module)
  .add('Menu', defaultMenu)
  .add('不同mode的 Menu', modeMenu)
  .add('subMenu', subMenuComponent)
  .add('others Menu', subMenuOthers)