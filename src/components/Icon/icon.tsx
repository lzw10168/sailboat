import classNames from 'classnames';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

/**
 * 基于FontAwesomeIcon的图标组件
 * ### 引用方法
 * ~~~js
 * import { Icon } from '@sailboat';
 * ~~~
 * * 提供了几种主题，可以通过设置`theme`属性来设置主题
 * * props参数支持FontAwesomeIcon的所有属性
 * * 目前仅支持 solid,
 * * 官方链接: https://fontawesome.com/icons
 */
export const Icon = (props: IconProps) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames('sail-icon', className, {
    [`sail-icon-${theme}`]: theme
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
