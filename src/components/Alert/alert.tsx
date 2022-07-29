import classNames from 'classnames';
import { useTransition, TransitionState } from './hooks';

export enum AlertType {
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Default = 'default'
}

export interface BaseAlertProps {
  className?: string;
  type?: AlertType;
  title: string;
  description?: string;
  showCloseIcon?: boolean;
  open: boolean;
  autoHideDuration?: number; // 多少秒后触发onClose, 由外部控制
  onClose: () => void;
}

// 如果类中包含TransitionState.EXITED 则不会显示
// function hasExited()

const Alert = (props: BaseAlertProps) => {
  const {
    className,
    type,
    title,
    description,
    showCloseIcon,
    open,
    autoHideDuration,
    onClose
  } = props;
  const baseClasses = classNames('alert', className, {
    [`alert-${type}`]: type
  });

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };
  const { classes: transitionClass, show } = useTransition({
    open,
    autoHideDuration: autoHideDuration as number,
    cb: onClose
  });
  const classes = classNames(baseClasses, transitionClass);
  return (
    <>
      {show && (
        <div className={classes}>
          <div className="alert-container">
            <div className="alert-title">{title}</div>
            {description && <div className="alert-desc">{description}</div>}
          </div>
          {showCloseIcon && (
            <div className="alert-close" onClick={handleClose}>
              x
            </div>
          )}
        </div>
      )}
    </>
  );
};

Alert.defaultProps = {
  type: AlertType.Default,
  showCloseIcon: true,
  description: '',
  autoHideDuration: 0,
  onClose: () => {}
};

export default Alert;
