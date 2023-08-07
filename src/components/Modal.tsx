import { useState } from 'react';
import XSvg from '../assets/x.svg';

interface IProps {
  children?: React.ReactNode;
  name: string;
  close: () => void;
}

export default function Modal(props: IProps) {

  const [isMouseDown, setMouseDown] = useState<boolean>(false);

  function handleClose() {
    !isMouseDown && props.close();
    setMouseDown(false);
  }

  return (
    <div onClick={handleClose} className="canvas modal-backdrop">
      <div 
      onMouseDown={_ => setMouseDown(true)}
      onMouseUp={_ => setMouseDown(false)}
      onClick={e => e.stopPropagation()} className="modal">
        <div className='flex justify-between mb-4'>
          <span className='font-medium text-lg'>{props.name}</span>
          <div
          onClick={props.close} 
          className='cursor-pointer hover:bg-neutral-300 rounded-full p-[2px]'>
            <XSvg className="h-6 w-6" />
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
}