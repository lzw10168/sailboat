import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { IMenuItemProps, menuItemDisplayName } from './menuItem';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ActiveBar from './activeBar';
export const subMenuDisplayName = 'SubMenu';
export interface SubMenuProps {
  className?: string;
  index?: number;
  title: string;
  open?: boolean; // vertical mode 下生效
  children?: React.ReactNode;
}
const SubMenu = (props: SubMenuProps) => {
  const context = useContext(MenuContext);
  const { className, index, title, children } = props;
  const [open, setOpen] = useState(
    context.mode === 'vertical' ? props.open : false
  );
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.activeIndex.split('-')[0] === index?.toString(),
    'is-vertical': context.mode === 'vertical',
    'is-opened': open
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!open);
    context.forceRenderCallback();
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault();
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 100);
  };
  const clickEvents =
    context.mode === 'vertical' ? { onClick: handleClick } : {};
  const hoverEvents =
    context.mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          }
        }
      : {};
  const renderChildren = () => {
    const classes = classNames('submenu', {
      'is-opened': open
    });
    const childrenComponent = React.Children.map(children, (child, _index) => {
      const childElement =
        child as React.FunctionComponentElement<IMenuItemProps>;
      if (childElement.type.displayName === menuItemDisplayName) {
        return React.cloneElement(childElement, {
          index: `${index}-${_index}`
        });
      } else {
        console.error('Warning: SubMenu has a child which is not a menu item');
      }
    });
    return <div className={classes}>{childrenComponent}</div>;
  };
  return (
    <>
      <ul key={index} className={classes} {...hoverEvents}>
        <div className="submenu-title" {...clickEvents}>
          {title}
          <div className="arrow-icon">
            <MdKeyboardArrowDown />
          </div>
        </div>
        {open ? renderChildren() : null}
      </ul>
    </>
  );
};
SubMenu.defaultProps = {
  open: false
};
SubMenu.displayName = subMenuDisplayName;
const exportMenu = React.memo(SubMenu);
exportMenu.displayName = subMenuDisplayName;
export default exportMenu;
