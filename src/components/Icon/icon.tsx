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

const Icon = (props: IconProps) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames('sail-icon', className, {
    [`sail-icon-${theme}`]: theme
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
