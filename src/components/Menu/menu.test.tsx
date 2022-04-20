import React from "react";
import { fireEvent, render, screen, RenderResult, cleanup } from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index="0">active</MenuItem>
      <MenuItem disabled index="1">disabled</MenuItem>
      <MenuItem index="2">xyz</MenuItem>
    </Menu>
  )
}

let menuElement: HTMLElement, disabledElement: HTMLElement, activeElement: HTMLElement

describe('test menu and menuItem components', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(generateMenu(testProps))
    menuElement = screen.getByTestId('test-menu')
    activeElement = screen.getByText('active')
    disabledElement = screen.getByText('disabled')
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass ('menu test')
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item active')
    expect(disabledElement).toHaveClass('menu-item disabled')
  })

  it('click items should active and call correct callback', () => {
    const thirdItem = screen.getByText('xyz')
    expect(thirdItem).toBeInTheDocument()
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('active')
    expect(activeElement).not.toHaveClass('active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')

    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith()
  })

  it('should render vertical mode when mode to set vertical mode', () => {
    cleanup()
    render(generateMenu(testVerticalProps))
    const element = screen.getByTestId('test-menu')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('menu-vertical')
  })
})