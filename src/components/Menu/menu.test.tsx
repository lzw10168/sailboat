import {
  render,
  screen,
  RenderResult,
  cleanup,
  fireEvent,
  waitFor
} from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
};
const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  onSelect: jest.fn()
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  );
};
let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

// 测试描述
describe('test Menu and menuItem component', () => {
  // 每个测试用例执行之前
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });

  it('should render vertical mode when mode is set to vertical', () => {
    // 需要清除下现有的节点, 每次执行测试用例之后都会执行, 这里是为了清除beforeEach上一次的节点
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
});
