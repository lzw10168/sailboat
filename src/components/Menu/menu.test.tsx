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
import SubMenu from './subMenu';
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
      <MenuItem>x1yz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
        <MenuItem>drop2</MenuItem>
      </SubMenu>
    </Menu>
  );
};
// 创建css文件, 放入head标签, 因为单侧中是没有css文件的, 所以要创建一个css , 让样式生效
const createStyleFile = () => {
  const cssFile: string = `
    .submenu  {
      display: none;
    }
    .submenu.is-opened {
      display: block;
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  document.head.appendChild(style);
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
    createStyleFile();
  });

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test');
    expect(menuElement.querySelectorAll('ul').length).toEqual(1);
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

  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownItem = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownItem);
    await waitFor(
      () => {
        expect(wrapper.queryByText('drop1')).toBeVisible();
      },
      { timeout: 120 }
    );
    fireEvent.mouseLeave(dropdownItem);
    await waitFor(
      () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible();
      },
      { timeout: 120 }
    );
  });

  it('should show dropdown items when click on subMenu', async () => {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownItem = wrapper.getByText('dropdown');
    fireEvent.click(dropdownItem);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    });
    fireEvent.click(dropdownItem);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  });
});
