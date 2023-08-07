import { store } from "../redux/store";

export const isLastIndex = () => {
  const state = store.getState().form;
  if (!state.inputs) return null;
  return state.currentIndex === (state.inputs.length - 1);
}