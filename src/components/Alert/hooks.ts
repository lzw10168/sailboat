import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
interface ITransitionProps {
  open: boolean;
  interDuration?: number;
  exitDuration?: number;
  autoHideDuration: number;
  cb: () => void;
}
export enum TransitionState {
  ENTERING = 'entering',
  ENTERED = 'entered',
  EXITING = 'exiting',
  EXITED = 'exited'
}
export const useTransition = (props: ITransitionProps) => {
  const {
    open,
    autoHideDuration,
    exitDuration = 300,
    interDuration = 300,
    cb
  } = props;
  const [classes, setClasses] = useState('');
  const [show, setShow] = useState(false);
  const firstRender = useRef(true);
  // 关闭逻辑
  useEffect(() => {
    if (open) {
      setShow(true);
      setClasses(TransitionState.ENTERING);
      setTimeout(() => {
        setClasses(TransitionState.ENTERED);
      }, interDuration);
    } else {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      setClasses(TransitionState.EXITING);
      setTimeout(() => {
        setClasses(TransitionState.EXITED);
        setShow(false);
        cb();
      }, exitDuration);
    }
    if (autoHideDuration) {
      setTimeout(() => {
        cb();
      }, autoHideDuration);
    }
  }, [open, autoHideDuration, interDuration, exitDuration, cb]);
  return { classes, show };
};
