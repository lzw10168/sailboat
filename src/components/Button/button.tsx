import classNames from 'classnames';

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
  Default = 'default'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string;
  /** 设置 Button 的禁用 */
  disabled?: boolean;
  /** 设置 Button 的尺寸 */
  size?: ButtonSize;
  /** 设置 Button 的类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  /** 设置 Button 的跳转链接 */
  href?: string;
}
// Native
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<
  BaseButtonProps & NativeButtonProps & AnchorButtonProps
>;
/**
 * 页面中最常用的的按钮元素, 支持HTML button 和 a 链接
 * ### 引用方法
 * ~~~js
 * import { Button } from '@sialboat';
 * ~~~
 * 按钮可以展示用户能进行的操作。 他们通常直接放置在您的用户界面中，例如：
 *  * Modal windows（模态窗口）
 *  * Forms（表单）
 *  * Cards（卡片）
 *  * Toolbars（工具栏)
 */
export const Button = (props: ButtonProps) => {
  const { className, disabled, size, btnType, children, href, ...restProps } =
    props;
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-size-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled
  });
  if (btnType === ButtonType.Link || href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
};

export default Button;
