import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Alert, { AlertType, AlertProps } from './alert';

const defaultProps: AlertProps = {
  title: 'title',
  open: true,
  onClose: jest.fn()
};

const testProps: AlertProps = {
  title: 'title',
  open: true,
  onClose: () => {
    testProps.open = false;
  }
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('test Alert component', () => {
  it('should render the correct default alert', () => {
    const { container } = render(<Alert {...defaultProps} />);
    const element = container.querySelector('.alert');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('alert alert-default');
  });

  it('should render the correct alert based on different props', () => {
    const { container } = render(
      <Alert {...defaultProps} type={AlertType.Success} />
    );
    const element = container.querySelector('.alert');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('alert alert-success');
  });

  it('should render a close icon when showCloseIcon is true', () => {
    const { container, getByText } = render(
      <Alert {...defaultProps} showCloseIcon />
    );
    const element = container.querySelector('.alert');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('alert alert-default');
    const closeIcon = getByText('x');
    expect(closeIcon).toBeInTheDocument();
  });

  it('should call onClose when click close icon', () => {
    const { container, getByText } = render(
      <Alert {...defaultProps} showCloseIcon />
    );
    const element = container.querySelector('.alert');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('alert alert-default');
    const closeIcon = getByText('x');
    expect(closeIcon).toBeInTheDocument();
    fireEvent.click(closeIcon);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  // 触发x按钮的点击事件, alert组件的onClose方法会被调用, 并且会把open属性设置为false
  it('should not render alert when open is false', async () => {
    let { container, getByText } = render(<Alert {...testProps} />);
    let element = container.querySelector('.alert');
    const closeIcon = getByText('x');
    fireEvent.click(closeIcon);
    // 关闭之后重新渲染, 并且不会再渲染alert组件
    container = render(<Alert {...testProps} />).container;
    element = container.querySelector('.alert');
    // await waitFor(() => {
    expect(element).not.toBeInTheDocument();
    // });
  });
});
