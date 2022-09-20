import Icon from '../Icon';
import { ThemeProps } from '../Icon/icon';
import ProcessLine from './processLine';
import { UploadFile } from './upload';
export interface FileList {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
  onPreview: (file: UploadFile) => void;
  theme?: ThemeProps;
}

function FileItem(props: {
  file: UploadFile;
  theme?: ThemeProps;
  onRemove: (file: UploadFile) => void;
  onPreview: (file: UploadFile) => void;
}) {
  const { file, theme, onRemove, onPreview } = props;
  const handleRemove = () => {
    if (onRemove) onRemove(file);
  };
  const handlePreview = () => {
    if (onPreview) onPreview(file);
  };

  return (
    <li className="sailboat-file-item" onClick={handlePreview}>
      <div className={`file-name file-name-${file.status}`}>
        <Icon
          icon="file-alt"
          theme={file.status === 'error' ? 'danger' : 'secondary'}
        />
        <span>{file.name}</span>
      </div>
      <div className="file-status">
        {file.status === 'uploading' && (
          <Icon icon="spinner" spin theme={theme} />
        )}
        {file.status === 'success' && (
          <Icon icon="check-circle" theme="success" />
        )}
        {file.status === 'error' && <Icon icon="times-circle" theme="danger" />}
      </div>
      <span className="file-actions" onClick={handleRemove}>
        <Icon icon="xmark" />
      </span>
    </li>
  );
}

export function UploadFileList(props: FileList) {
  const { fileList, onRemove, onPreview, theme } = props;
  return (
    <ul className="sailboat-file-list">
      {fileList.map((file: UploadFile) => {
        return (
          <div key={file.uid}>
            <FileItem
              file={file}
              onRemove={onRemove}
              onPreview={onPreview}
              theme={theme}
            />
            {file.status === 'uploading' && (
              <ProcessLine percent={file.percent} theme={theme} />
            )}
          </div>
        );
      })}
    </ul>
  );
}

export default UploadFileList;
