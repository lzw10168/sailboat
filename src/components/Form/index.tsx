import { FC } from 'react';
import Form, { FormProps } from './form';
import FormItem, { FormItemProps } from './formItem';

export type IFormComponent = FC<FormProps> & {
  Item: FC<FormItemProps>;
};

const TransForm = Form as IFormComponent;

TransForm.Item = FormItem;

export default Form;
