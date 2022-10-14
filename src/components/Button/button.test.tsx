import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonSize, ButtonType } from './button';

const defaultProps = {
  onClick: jest.fn()
};

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
};

afterEach(() => {
  jest.clearAllMocks();
});

// 测试用例大体分类

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn');
  });

  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-primary btn-size-lg klass');
  });

  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType="link" href="http://www.baidu.com">
        Link
      </Button>
    );
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('disabled');
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });

  it('Whether the monitoring event takes effect', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
