import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
export const activeBarDisplayName = 'ActiveBar';
interface IProps {
  forceRenderState: number;
}
const ActiveBar = (props: IProps) => {
  console.log('render');
  const context = useContext(MenuContext);
  const { mode, activeIndex, menuDom } = context;
  const readIndex = activeIndex.split('-')[0];
  const [style, setStyle] = useState({});
  useEffect(() => {
    if (!menuDom) {
      return;
    }
    const activeDom = menuDom.childNodes[Number(readIndex)] as HTMLElement;
    if (mode === 'horizontal') {
      const width = activeDom.clientWidth + 'px';
      const left = activeDom.offsetLeft + 'px';
      const style = { width, left };
      setStyle(style);
    } else {
      const height = activeDom.clientHeight + 'px';
      const top = activeDom.offsetTop + 'px';
      const style = { height, top };
      setStyle(style);
    }
  }, [context.activeIndex, props.forceRenderState]);
  if (!menuDom) {
    return <div className="menu-active_bar"></div>;
  }

  return <div style={style} className="menu-active_bar"></div>;
};
ActiveBar.displayName = activeBarDisplayName;
export default ActiveBar;
