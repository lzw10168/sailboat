import { useReducer, useState } from 'react';
import Schema, { RuleItem, ValidateError } from 'async-validator';
export interface FieldDetail {
  name: string;
  value: string;
  rules: RuleItem[];
  isValid: boolean;
  errors: ValidateError[];
}

export interface FieldsState {
  [key: string]: FieldDetail;
}

export interface FormState {
  isValid: boolean;
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

function useStore() {
  // form state
  const [form, setForm] = useState<FormState>({ isValid: true });
  // fields state
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  // 验证
  const validateField = async (name: string) => {
    const { value, rules } = fields[name];
    const descriptor = {
      [name]: rules
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
      const err = error as any;
      console.log(err);
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
  return {
    form,
    fields,
    dispatch,
    validateField
  };
}

export default useStore;
