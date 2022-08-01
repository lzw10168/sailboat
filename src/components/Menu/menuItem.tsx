import { MenuContext } from './menu';
import { useContext } from 'react';
import classNames from 'classnames';

export interface IMenuItemProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  disabled?: boolean;
}
const MenuItem = (props: IMenuItemProps) => {
  const { children, className, disabled, index } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    ['is-active']: context.activeIndex === index,
    ['is-disabled']: disabled
  });
  const handleClick = () => {
    if (disabled) {
      return;
    }
    context.onSelect(index as number);
  };

  return (
    <li onClick={handleClick} className={classes}>
      {children}
    </li>
  );
};
export const menuItemDisplayName = 'MenuItem';
MenuItem.displayName = menuItemDisplayName;
export default MenuItem;
