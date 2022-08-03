import React, { useContext, useEffect, useState } from 'react';
import { TabsContext } from './tabs';
export const activeBarDisplayName = 'ActiveBar';
interface IProps {
  forceRenderState: number;
}
const ActiveBar = (props: IProps) => {
  const context = useContext(TabsContext);
  const { mode, activeIndex, tabsDom } = context;
  const [style, setStyle] = useState({});
  useEffect(() => {
    if (!tabsDom) {
      return;
    }
    const activeDom = tabsDom.childNodes[Number(activeIndex)] as HTMLElement;
    if (mode === 'horizontal') {
      const width = activeDom?.clientWidth + 'px';
      const left = activeDom?.offsetLeft + 'px';
      const style = { width, left };
      setStyle(style);
    } else {
      const height = activeDom?.clientHeight + 'px';
      const top = activeDom?.offsetTop + 'px';
      const style = { height, top };
      setStyle(style);
    }
  }, [activeIndex, props.forceRenderState, tabsDom]);
  if (!tabsDom) {
    return <div className="sail-tabs-active_bar"></div>;
  }

  return <div style={style} className="sail-tabs-active_bar"></div>;
};
ActiveBar.displayName = activeBarDisplayName;
export default ActiveBar;
