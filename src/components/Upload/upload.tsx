import { useRef, useState } from 'react';
import { Button, ButtonType } from '../Button/button';
import axios from 'axios';
import UploadFileList from './fileList';
import Dragger from './dragger';
import { ThemeProps } from '../Icon/icon';
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  children?: React.ReactNode;
  action: string;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: UploadFile) => void;
  onSuccess?: (data: any, file: UploadFile) => void;
  onError?: (err: any, file: UploadFile) => void;
  onChange?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
  onPreview?: (file: UploadFile) => void;
  theme?: ThemeProps;
  headers?: { [key: string]: any };
  name?: string;
  data?: { [key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  dragger?: boolean;
}

class GeneratUploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadFileStatus;
  percent: number;
  raw: File;
  response: any;
  error: any;

  constructor(file: File) {
    this.uid = new Date().getTime() + 'upload-file';
    this.size = file.size;
    this.name = file.name;
    this.status = 'ready';
    this.percent = 0;
    this.raw = file;
    this.response = '';
    this.error = '';
  }
}

export const Upload = (props: UploadProps) => {
  const {
    action,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    onPreview,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    dragger,
    theme
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  const handlePreview = (file: UploadFile) => {
    if (onPreview) {
      onPreview(file);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach(file => {
      if (!beforeUpload) {
        postFile(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            postFile(processedFile);
          });
        } else if (result !== false) {
          postFile(file);
        }
      }
    });
  };
  const postFile = (file: File) => {
    const uploadFile = new GeneratUploadFile(file);
    setFileList(prevList => {
      return [...prevList, uploadFile];
    });
    const formData = new FormData();
    formData.append(name || file.name, file);
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers
        },
        withCredentials,
        onUploadProgress: e => {
          const percentage = Math.round((e.loaded * 100) / e.total) || 0;
          updateFileList(uploadFile, {
            percent: percentage,
            status: 'uploading'
          });
          if (onProgress) {
            onProgress(percentage, uploadFile);
          }
        }
      })
      .then(resp => {
        uploadFile.status = 'success';
        uploadFile.response = resp.data;
        updateFileList(uploadFile, uploadFile);
        if (onSuccess) {
          onSuccess(resp.data, uploadFile);
        }
      })
      .catch(error => {
        uploadFile.status = 'error';
        uploadFile.error = error;
        updateFileList(uploadFile, uploadFile);
        if (onError) {
          onError(error, uploadFile);
        }
      })
      .finally(() => {
        if (onChange) {
          onChange(uploadFile);
        }
      });
  };
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile> // 更新任意几项
  ) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  const onFileDrop = (files: FileList) => {
    if (files.length) {
      uploadFiles(files);
    }
  };
  return (
    <div className="sailboat-upload-component">
      <div className="sailboat-upload-area" onClick={handleClick}>
        {dragger ? (
          <Dragger theme={theme} onFile={onFileDrop}>
            {children}
          </Dragger>
        ) : (
          <>
            {children ? (
              children
            ) : (
              <Button btnType="primary">Upload File</Button>
            )}
          </>
        )}
      </div>
      <input
        style={{ display: 'none' }}
        onChange={handleFileChange}
        type="file"
        className="sailboat-file-input"
        ref={fileInput}
        accept={accept}
        multiple={multiple}
      />
      <UploadFileList
        fileList={fileList}
        onRemove={handleRemove}
        onPreview={handlePreview}
        theme={theme}
      />
    </div>
  );
};

Upload.defaultProps = {
  name: 'file',
  btnText: 'Upload File',
  theme: 'primary'
};
export default Upload;
