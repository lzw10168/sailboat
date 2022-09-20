import { ThemeProps } from '../Icon/icon';
export interface ProgressLineProps {
  percent?: number;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}
function ProcessLine(props: ProgressLineProps) {
  const { percent, styles, theme } = props;
  return (
    <div className="sailboat-file-process-line" style={styles}>
      <div
        className={`sailboat-file-process-line-inner color--${theme}`}
        style={{ width: `${percent}%` }}></div>
    </div>
  );
}
ProcessLine.defaultProps = {
  percent: 0,
  theme: 'primary'
};

export default ProcessLine;
