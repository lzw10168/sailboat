import React, { createContext, ReactNode } from 'react';
import FormItem, { FormItemProps } from './formItem';
import Schema, { RuleItem, ValidateError } from 'async-validator';
import useStore from './useStore';
export interface FormProps {
  children?: ReactNode;
  name?: string;
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => void;
}

export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  'dispatch' | 'fields' | 'validateField'
> &
  Pick<FormProps, 'initialValues'>;
export const FormContext = createContext<IFormContext>({} as IFormContext);

export function Form(props: FormProps) {
  const { children, name, initialValues, onFinish, onFinishFailed } = props;
  const { form, fields, dispatch, validateField, validateAllField } =
    useStore();
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField
  };
  const submitForm = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { isValid, value, errors } = await validateAllField();
    if (onFinish && isValid) {
      onFinish(value);
    } else if (onFinishFailed && !isValid) {
      onFinishFailed(value, errors);
    }
  };
  return (
    <FormContext.Provider value={passedContext}>
      <form name={name} className={'sailboat-form'} onSubmit={submitForm}>
        {children}
      </form>
      {/* <div>
        <div>{JSON.stringify(form)}</div>
        <div>{JSON.stringify(fields)}</div>
      </div> */}
    </FormContext.Provider>
  );
}

Form.Item = FormItem;
export default Form;
