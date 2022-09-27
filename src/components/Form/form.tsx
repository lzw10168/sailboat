import React, { createContext, ReactNode } from 'react';
import FormItem, { FormItemProps } from './formItem';
import Schema, { RuleItem, ValidateError } from 'async-validator';
import useStore, { FormState } from './useStore';

export type RenderProps = (form: FormState) => ReactNode;
export interface FormProps {
  children?: ReactNode | RenderProps;
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
  const RenderChildren: ReactNode =
    typeof children === 'function' ? children(form) : children;
  return (
    <FormContext.Provider value={passedContext}>
      <form name={name} className={'sailboat-form'} onSubmit={submitForm}>
        {RenderChildren}
      </form>
    </FormContext.Provider>
  );
}

Form.Item = FormItem;
export default Form;
