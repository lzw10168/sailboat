import { useReducer, useState } from 'react';
import Schema, { RuleItem, ValidateError } from 'async-validator';
import { each, mapValues } from 'lodash-es';
export type CustomRuleFunc = ({
  getFieldValue
}: {
  getFieldValue: (key: string) => any;
}) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;
export interface FieldDetail {
  name: string;
  value: string;
  rules: CustomRule[];
  isValid: boolean;
  errors: ValidateError[];
}
export interface FieldsState {
  [key: string]: FieldDetail;
}

export interface FormState {
  isValid: boolean;
  isSubmitting: boolean; // 验证开始的时候设置为true, 验证结束的时候设置为false
  errors: Record<string, ValidateError[]>;
}
export interface ValidateErrorType extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
}

export const ADD_FIELD = 'addField';
export const UPDATE_VALUE = 'updateValue';
export const UPDATE_VALIDATE_RESULT = 'updateValidateResult';
export interface FieldAction {
  type: 'addField' | 'updateValue' | 'updateValidateResult';
  name: string;
  value: any;
}

function fieldsReducer(state: FieldsState, action: FieldAction): FieldsState {
  switch (action.type) {
    case ADD_FIELD:
      return {
        ...state,
        [action.name]: {
          ...action.value
        }
      };
    case UPDATE_VALUE:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          value: action.value
        }
      };
    case UPDATE_VALIDATE_RESULT:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          isValid: action.value.isValid,
          errors: action.value.errors
        }
      };
    default:
      return state;
  }
}

function useStore(initialValues?: Record<string, any>) {
  // form state
  const [form, setForm] = useState<FormState>({
    isValid: true,
    isSubmitting: false,
    errors: {}
  });
  // fields state
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  // getValue
  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value;
  };
  const getFieldsValue = () => {
    return mapValues(fields, 'value');
  };
  const resetFields = () => {
    if (initialValues) {
      each(initialValues, (value, name) => {
        if (fields[name]) {
          dispatch({
            type: UPDATE_VALUE,
            name: name,
            value
          });
        }
      });
    }
  };
  const setFieldValue = (name: string, value: any) => {
    if (fields[name]) {
      dispatch({
        type: UPDATE_VALUE,
        name: name,
        value
      });
    }
  };
  // 转化
  const transformRule = (rules: CustomRule[]) => {
    return rules.map(rule => {
      if (typeof rule === 'function') {
        return rule({ getFieldValue });
      }
      return rule;
    });
  };
  // 验证
  const validateField = async (name: string) => {
    const { value, rules } = fields[name];
    const afterRules = transformRule(rules);
    const descriptor = {
      [name]: afterRules
    };
    const valueMap = {
      [name]: value
    };
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors: ValidateError[] = [];

    try {
      await validator.validate(valueMap);
    } catch (error) {
      isValid = false;
      const err = error as ValidateErrorType;
      errors = err.errors;
    } finally {
      console.log(isValid);
      dispatch({
        type: UPDATE_VALIDATE_RESULT,
        name: name,
        value: {
          isValid,
          errors
        }
      });
    }
  };

  // 验证所有
  const validateAllField = async () => {
    let isValid = true;
    let errors: Record<string, ValidateError[]> = {};
    // 数据转化
    // {username: {value: '123', rules: RuleItem[], errors:[]}} => {username: RuleItem[]} , {username: '123'}
    const descriptor = mapValues(fields, field => {
      return transformRule(field.rules);
    });
    // {username: '123'}
    const valueMap = mapValues(fields, field => field.value);
    const validator = new Schema(descriptor);
    setForm({ ...form, isSubmitting: true });
    try {
      await validator.validate(valueMap);
    } catch (error) {
      isValid = false;
      const err = error as ValidateErrorType;
      errors = err.fields;

      each(fields, (value, name) => {
        if (errors[name]) {
          const itemErrors = errors[name];
          dispatch({
            type: UPDATE_VALIDATE_RESULT,
            name: name,
            value: {
              isValid: false,
              errors: itemErrors
            }
          });
        } else if (value.rules.length > 0 && !errors[name]) {
          dispatch({
            type: UPDATE_VALIDATE_RESULT,
            name: name,
            value: {
              isValid: true,
              errors: []
            }
          });
        }
      });
    } finally {
      setForm({
        isValid,
        isSubmitting: false,
        errors
      });
    }
    return {
      isValid,
      errors,
      value: valueMap
    };
  };
  return {
    form,
    fields,
    dispatch,
    validateField,
    validateAllField,
    getFieldValue,
    getFieldsValue,
    setFieldValue,
    resetFields
  };
}

export default useStore;
