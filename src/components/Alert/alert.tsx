import classNames from 'classnames';
// import { useTransition } from './hooks';
import Transition from '../Transition';
import Icon from '../Icon/icon';
export enum AlertType {
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Default = 'default'
}

export interface AlertProps {
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

const Alert = (props: AlertProps) => {
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
  return (
    <Transition in={open} animation="zoom-in-top" timeout={300}>
      <div className={baseClasses}>
        <div className="alert-container">
          <div className="alert-title">{title}</div>
          {description && <div className="alert-desc">{description}</div>}
        </div>
        {showCloseIcon && (
          <div className="alert-close" onClick={handleClose}>
            <Icon icon="close" />
          </div>
        )}
      </div>
    </Transition>
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
