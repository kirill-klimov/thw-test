import { useState } from "react";
import Modal from "./components/Modal";
import { data, shuffleData } from "./helpers/data";
import DynamicForm from "./components/DynamicForm";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { FormActions, FormValues } from "./redux/formSlice";

export default function App() {

  const dispatch = useAppDispatch();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues | null>(null);

  const index = useAppSelector(state => state.form.currentIndex);
  const inputs = useAppSelector(state => state.form.inputs?.length);

  function handleSubmit(values: FormValues) {
    console.log(values);
    setModalOpen(false);
    setFormValues(values);
    dispatch(FormActions.clearForm())
  }

  function shuffle() {
    shuffleData();
    dispatch(FormActions.setInputs(null));
  }

  return (
    <div className="canvas grid place-items-center">
      
      <div className="flex gap-4">
        <button 
        className="button" 
        onClick={() => setModalOpen(true)}>Open form</button>
        <button 
        className="button" 
        onClick={shuffle}>Shuffle inputs</button>
      </div>

      {!isModalOpen ? <></> :
      <Modal 
      close={() => setModalOpen(false)} 
      name={`Форма (шаг ${index+1}/${inputs})`}>
        <DynamicForm onSubmit={handleSubmit} data={data} />
      </Modal>}
      {!formValues ? <></> :
      <Modal close={() => setFormValues(null)} name="Значения">
        <div>
          {
            Object.entries(formValues).length === 0 ?
            <span>Форма не заполнена</span>
            :
            Object.entries(formValues).map(entry => {
              return (
                <div>{entry[0]}: {entry[1]}</div>
              );
            })
          }
        </div>
      </Modal>}
    </div>
  );
}