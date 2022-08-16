import classNames from 'classnames';
import { useContext } from 'react';
import { TabsContext } from './tabs';

export const tabDisplayName = 'Tab';
export interface ITabProps {
  label: string;
  index?: number;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: ({ index, label }: { index: number; label: string }) => void;
}
export const Tab = (props: ITabProps) => {
  const { label, index, children, onClick, disabled, className, style } = props;
  const context = useContext(TabsContext);
  const classes = classNames('sail-tab', className, {
    ['is-active']: context.activeIndex === index,
    ['is-disabled']: disabled
  });
  const handleClick = () => {
    if (disabled) {
      return;
    }
    if (onClick) {
      onClick({ index: index as number, label });
    }
    context.onChange(index as number);
  };
  return (
    <li className={classes} onClick={handleClick} style={style}>
      {children || label}
    </li>
  );
};
Tab.displayName = tabDisplayName;
export default Tab;
