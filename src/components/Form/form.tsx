import { createContext, ReactNode } from 'react';
import FormItem, { FormItemProps } from './formItem';
import useStore from './useStore';
export interface FormProps {
  children?: ReactNode;
  name?: string;
  initialValues?: Record<string, any>;
}

export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  'dispatch' | 'fields'
> &
  Pick<FormProps, 'initialValues'>;
export const FormContext = createContext<IFormContext>({} as IFormContext);

export function Form(props: FormProps) {
  const { children, name, initialValues } = props;
  const { form, fields, dispatch } = useStore();
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues
  };
  return (
    <FormContext.Provider value={passedContext}>
      <form name={name} className={'sailboat-form'}>
        {children}
      </form>
      <div>
        <div>{JSON.stringify(form)}</div>
        <div>{JSON.stringify(fields)}</div>
      </div>
    </FormContext.Provider>
  );
}

Form.Item = FormItem;
export default Form;
