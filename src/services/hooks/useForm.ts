import { ChangeEvent, useState } from 'react';

export interface IFormValues {
  [key: string]: string;
}

export function useForm(inputValues: IFormValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}