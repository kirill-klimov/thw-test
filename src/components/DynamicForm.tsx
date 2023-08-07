import React, { useEffect } from 'react';
import { FormActions, FormValues } from '../redux/formSlice';
import { FormInput } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { isLastIndex } from '../helpers/utils';

interface IProps {
  data: string;
  className?: string;
  onSubmit: (values: FormValues) => void;
}

export default function DynamicForm(props: IProps) {
    
  const dispatch = useAppDispatch();
  
  const currentInput = useAppSelector(state => state.form.currentInput);
  const values = useAppSelector((state) => state.form.values);
  const isLast = isLastIndex();
  
  useEffect(() => {
    if (!currentInput) {
      const parsed = JSON.parse(props.data) as FormInput[];
      dispatch(FormActions.setInputs(parsed));
    }
  }, []);

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    if (!currentInput) return;
    dispatch(FormActions.setInputValue({ 
      name: currentInput.name, 
      value: event.target.value 
    }));
  };

  function handleNext() {
    if (isLast) {
      props.onSubmit(values);
    } else {
      dispatch(FormActions.nextInput());
    }
  }

  return (
    !currentInput ? <div>Loading...</div> :
    <div className={`${props.className ? props.className : ''}`}>
      <div className='flex flex-col mb-6'>
        <label className='text-black mb-2'>{currentInput.label}</label>
        <input 
        autoFocus
        className='input'
        placeholder={currentInput.label}
        type={currentInput.type.toLowerCase()} 
        value={values[currentInput.name] || ''}
        min={currentInput.type === 'NUMBER' ? currentInput.min : undefined}
        max={currentInput.type === 'NUMBER' ? currentInput.max : undefined}
        pattern={currentInput.type === 'STRING' ? currentInput.regex : undefined}
        onChange={handleChange}/>
      </div>
      <div className='flex justify-between'>
        <button
        className='button' 
        onClick={() => dispatch(FormActions.previousInput())}>Назад</button>
        <button 
        className='button'
        onClick={handleNext}>{isLast ? 'Отправить' : 'Продолжить'}</button>
      </div>
    </div>
  );
};
