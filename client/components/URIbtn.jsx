import React, { useContext } from 'react';
import { CodeContext } from '../state/contexts';

const URIbtn = () => {
  const { codeState, codeDispatch } = useContext(CodeContext);
  const toggle = () => {
    codeDispatch({
      type: 'TOGGLE_FORM',
      payload: {
        formIsOpen: !codeState.formIsOpen,
      },
    });
  };
  return (
    <button
      type="button"
      className={codeState.formIsOpen ? 'uripanelbtn open' : 'uripanelbtn'}
      onClick={toggle}
    >
      {codeState.formIsOpen ? '<' : '>'}
    </button>
  );
};

export default URIbtn;
