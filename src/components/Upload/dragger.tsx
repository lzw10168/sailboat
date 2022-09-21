import { useState, DragEvent } from 'react';
import classNames from 'classnames';
import Icon, { ThemeProps } from '../Icon/icon';
interface DraggerProps {
  children: React.ReactNode;
  onFile: (files: FileList) => void;
  theme?: ThemeProps;
}

function Draggle(props: DraggerProps) {
  const { children, theme, onFile } = props;
  const [draggering, setDraggering] = useState(false);
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDraggering(over);
  };
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDraggering(false);
    onFile(e.dataTransfer.files);
  };
  const classes = classNames('sailboat-upload-dragger', `color--${theme}`, {
    'upload-draggering': draggering
  });
  return (
    <div
      className={classes}
      onDragOver={e => {
        handleDrag(e, true);
      }}
      onDragLeave={e => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}>
      {children ? (
        children
      ) : (
        <>
          <div className="sailboat-upload-dragger_icon">
            <Icon
              icon="upload"
              size="5x"
              theme={draggering ? theme : 'secondary'}
            />
          </div>
          <div className="sailboat-upload-dragger_text">
            {'Drag file to this area to upload'}
          </div>
        </>
      )}
    </div>
  );
}

export default Draggle;
