import { InputHTMLAttributes, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import Icon from '../Icon/icon';
export type InputSize = 'sm' | 'md' | 'lg';
// Omit 忽略掉 InputHTMLAttributes 中的 size 属性
export interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepand?: string | React.ReactElement;
  append?: string | React.ReactElement;
  className?: string;
  value: string;
  // 事件
  onIconClick?: () => void;
  onEnter?: () => void;
}

export const Input = (props: IInputProps) => {
  // 取出各种属性
  const {
    disabled,
    size,
    value,
    icon,
    prepand,
    append,
    className,
    onIconClick,
    onEnter,
    ...restProps
  } = props;

  // 根据属性计算 className
  const [focused, setFocused] = useState(false);
  const classes = classNames('sail-input', className, {
    [`input-${size}`]: size,
    'is-disabled': disabled,
    'is-focused': focused
  });
  const handleIconClick = () => {
    if (onIconClick) {
      onIconClick();
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.keyCode === 13) {
      onEnter();
    }
  };

  // 根据属性添加特定节点, 如 prepand, append icon
  const prepandNode = prepand ? (
    <div className="input-prepand">{prepand}</div>
  ) : null;
  const appendNode = append ? (
    <div className="input-append">{append}</div>
  ) : null;

  const iconNode = icon ? (
    <i className="input-icon" onClick={handleIconClick}>
      <Icon icon={icon} />
    </i>
  ) : null;

  // 根据属性添加特定样式, 如 disabled, size
  return (
    <div className={classes} data-testid="test-input">
      {prepandNode}
      <input
        className="input-content"
        disabled={disabled}
        value={value}
        onKeyDown={handleEnter}
        {...restProps}
        onFocus={e => {
          setFocused(true);
          restProps.onFocus && restProps.onFocus(e);
        }}
        onBlur={e => {
          setFocused(false);
          restProps.onBlur && restProps.onBlur(e);
        }}
      />
      {appendNode}
      {iconNode}
    </div>
  );
};

export default Input;

Input.defaultProps = {
  size: 'md'
};
