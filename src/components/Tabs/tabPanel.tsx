import classNames from 'classnames';

interface ITabPanelProps {
  value: number;
  index: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export const TabPanel = (props: ITabPanelProps) => {
  const { value, index, children, style, className } = props;
  const classes = classNames('sail-tabs-panel', className);
  return (
    <div className={classes} style={style}>
      {value === index && children}
    </div>
  );
};
export default TabPanel;
