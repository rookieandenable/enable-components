import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

const defaultProps = {
  onClick: jest.fn()
}

const primaryProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'test-class'
}

const anchorProps: ButtonProps = {
  btnType: 'link',
  href: 'http://baidu.com'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test button component', () => {

  // it(...) 或者 test(...) 表示一个测试单元

  it('render correct default button', () => {
    render(<Button { ...defaultProps }>default</Button>);
    const element = screen.getByText('default') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect(element.disabled).toBeFalsy();
    // 交互行为
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  })

  it('render correct component of base props', () => {
    render(<Button { ...primaryProps }>primary button</Button>);
    const element = screen.getByText('primary button');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-primary btn-lg test-class');
  })

  it('render a link when type href is correct', () => {
    render(<Button { ...anchorProps }>Link</Button>);
    const element = screen.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  })

  it('render disabled button', () => {
    render(<Button { ...disabledProps }>disabled button</Button>);
    const element = screen.getByText('disabled button') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    // 期待 disabled 属性是 true
    expect(element.disabled).toBeTruthy();
    // 期待 onClick 事件不会触发
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  })

})