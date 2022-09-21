import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import axios from 'axios';
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  createEvent
} from '@testing-library/react';

import { Upload, UploadProps } from './upload';

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>;
  };
});
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  dragger: true
};
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = wrapper.container.querySelector(
      '.sailboat-file-input'
    ) as HTMLInputElement;
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement;
  });

  it('upload process should works fine', async () => {
    const { queryByText, getByText } = wrapper;
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    mockedAxios.post.mockResolvedValue({ data: 'cool' });
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
      expect(queryByText('check-circle')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(testProps.onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          raw: testFile,
          status: 'success',
          name: 'test.png'
        })
      );
    });

    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'cool',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png'
      })
    );

    //remove the uploaded file
    expect(queryByText('xmark')).toBeInTheDocument();
    fireEvent.click(getByText('xmark'));
    expect(queryByText('test.png')).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png'
      })
    );
  });
  it('drag and drop files should works fine', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'cool' });
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('upload-draggering');

    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('upload-draggering');
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile]
      }
    });
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'cool',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png'
      })
    );
  });
});
