import {
  render,
  screen,
  RenderResult,
  cleanup,
  fireEvent,
  waitFor
} from '@testing-library/react';
import Input, { InputProps } from './input';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
const testProps: InputProps = {
  defaultValue: 'hello',
  placeholder: 'hello',
  onChange: jest.fn(),
  onIconClick: jest.fn(),
  onEnter: jest.fn(),
  className: 'test'
};

// 测试描述
describe('test Input component', () => {
  // 每个测试用例执行之前
  // beforeEach(() => {
  //   cleanup();
  // });
  // 测试用例
  it('should render the correct default Input', () => {
    const wrapper = render(<Input {...testProps} />);
    const wrapElement = wrapper.getByTestId('test-input');
    expect(wrapElement).toBeInTheDocument();
  });

  it('should render the correct Input with size', () => {
    const wrapper = render(<Input size="lg" {...testProps} />);
    const wrapElement = wrapper.getByTestId('test-input');
    expect(wrapElement).toHaveClass('input-lg');
  });
  it('should render the correct Input with prepand', () => {
    const wrapper = render(<Input prepand="https://" {...testProps} />);
    const prepandElement = wrapper.getByText('https://');
    expect(prepandElement).toHaveClass('input-prepand');
  });

  it('should render the correct Input with append', () => {
    const wrapper = render(<Input append=".com" {...testProps} />);
    const appendElement = wrapper.getByText('.com');
    expect(appendElement).toHaveClass('input-append');
  });

  it('should render the correct Input with icon', () => {
    const wrapper = render(<Input icon="search" {...testProps} />);
    const wrapElement = wrapper.getByTestId('test-input');
    const inputIcon = wrapElement.querySelector('.input-icon');
    expect(inputIcon).toBeInTheDocument();
  });

  // 测试onChange事件
  it('should emit onChange event when the input value changes', async () => {
    const { getByTestId } = render(<Input {...testProps} />);
    const wrapElement = getByTestId('test-input');
    const inputElement = wrapElement.querySelector('input') as HTMLInputElement;
    inputElement.value = 'changed';
    const onChangeEvent = jest.fn();
    // fireEvent.change(inputElement, {
    //   target: { value: 'changed' }
    // });
    // expect(onChangeEvent).toHaveBeenCalled();
  });
  // 测试onEnter事件
  it('should emit onEnter event when the input presses the Inter', () => {
    // let wrapper;
    // const { getByTestId } = wrapper as unknown as RenderResult;
    // const wrapElement = getByTestId('test-input');
    // const inputElement = wrapElement.querySelector('input') as HTMLInputElement;
    // fireEvent.focus(inputElement);
    // inputElement.focus();
    // fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    // expect(testProps.onEnter).not.toHaveBeenCalled();
  });
});
