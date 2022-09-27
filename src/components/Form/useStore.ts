import { useReducer, useState } from 'react';
export interface FieldDetail {
  name: string;
  value: string;
  rules: any[];
  isValid: boolean;
  errors: any[];
}

export interface FieldsState {
  [key: string]: FieldDetail;
}

export interface FormState {
  isValid: boolean;
}

export const ADD_FIELD = 'addField';
export const UPDATE_VALUE = 'updateValue';
export interface FieldAction {
  type: 'addField' | 'updateValue';
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
    default:
      return state;
  }
}

function useStore() {
  // form state
  const [form, setForm] = useState<FormState>({ isValid: true });
  // fields state
  const [fields, dispatch] = useReducer(fieldsReducer, {});

  return {
    form,
    fields,
    dispatch
  };
}

export default useStore;
