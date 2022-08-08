import * as React from 'react';

import { createContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { IMenuItemProps, menuItemDisplayName } from './menuItem';
import { subMenuDisplayName } from './subMenu';
import { activeBarDisplayName } from './activeBar';
import ActiveBar from './activeBar';
type Mode = 'vertical' | 'horizontal';
type SelectCallback = (index: string) => void;
export interface MenuProps {
  mode?: Mode;
  onSelect?: SelectCallback;
  defaultIndex?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
interface IContext {
  onSelect: SelectCallback;
  activeIndex: string;
  menuDom: HTMLElement | null;
  mode: Mode;
  forceRenderCallback: () => void;
}

export const MenuContext = createContext<IContext>({
  onSelect: () => {},
  activeIndex: '0',
  menuDom: null,
  mode: 'vertical',
  forceRenderCallback: () => {}
});
const Menu = (props: MenuProps) => {
  const { mode, onSelect, defaultIndex, className, style, children } = props;
  const [activeIndex, setActiveIndex] = useState<string>(defaultIndex || '0');
  const [forceRenderState, setForceRenderState] = useState(0);
  const menuRef = useRef(null);
  const [refState, setRefState] = useState(null);
  const classes = classNames('menu', className, {
    [`menu-${mode}`]: mode
  });
  const handleClick = (index: string) => {
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  let passedContext: IContext = {
    activeIndex: activeIndex,
    onSelect: handleClick,
    menuDom: menuRef.current,
    mode: mode as Mode,
    forceRenderCallback: () => {
      setForceRenderState(forceRenderState + 1);
    }
  };
  useEffect(() => {
    if (!menuRef.current) {
      return;
    }
    setRefState(menuRef.current);
  }, []);

  // 克隆子元素, 添加index, 判断类型是否是MenuItem
  const renderChildren = React.Children.map(children, (child, index) => {
    const childElement =
      child as React.FunctionComponentElement<IMenuItemProps>;
    const displayName = childElement.type.displayName;
    if (
      displayName !== menuItemDisplayName &&
      displayName !== subMenuDisplayName &&
      displayName !== activeBarDisplayName
    ) {
      console.error(
        'Warning: Menu has a child which is not a MenuItem component'
      );
      return null;
    }
    return React.cloneElement(
      child as React.FunctionComponentElement<IMenuItemProps>,
      {
        index: index.toString()
      }
    );
  });
  return (
    <ul ref={menuRef} className={classes} style={style} data-testid="test-tabs">
      <MenuContext.Provider value={passedContext}>
        <>
          {renderChildren}
          <ActiveBar forceRenderState={forceRenderState} />
        </>
      </MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: 0
};

export default Menu;
