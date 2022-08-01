import * as React from 'react';

import { createContext, useState } from 'react';
import classNames from 'classnames';
import { IMenuItemProps, menuItemDisplayName } from './menuItem';
type Mode = 'vertical' | 'horizontal';
type SelectCallback = (index: number) => void;
export interface MenuProps {
  mode?: Mode;
  onSelect?: SelectCallback;
  defaultIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
interface IContext {
  onSelect: SelectCallback;
  activeIndex: number;
}

export const MenuContext = createContext<IContext>({
  onSelect: () => {},
  activeIndex: 0
});
const Menu = (props: MenuProps) => {
  const { mode, onSelect, defaultIndex, className, style, children } = props;
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex || 0);
  const classes = classNames('menu', className, {
    [`menu-${mode}`]: mode
  });
  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (onSelect) onSelect(index);
  };
  const passedContext: IContext = {
    activeIndex: activeIndex,
    onSelect: handleClick
  };
  // 克隆子元素, 添加index, 判断类型是否是MenuItem
  const renderChildren = React.Children.map(children, (child, index) => {
    const childElement =
      child as React.FunctionComponentElement<IMenuItemProps>;
    const { displayName } = childElement.type;
    if (displayName !== menuItemDisplayName) {
      console.error(
        'Warning: Menu has a child which is not a MenuItem component'
      );
      return null;
    }
    return React.cloneElement(
      child as React.FunctionComponentElement<IMenuItemProps>,
      {
        index: index
      }
    );
  });
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren}
      </MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: 0
};

export default Menu;
