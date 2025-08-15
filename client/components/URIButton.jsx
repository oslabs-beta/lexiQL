import React, { useContext } from 'react';
import { FormContext } from '../state/contexts';

const URIButton = () => {
  const { formState, formDispatch } = useContext(FormContext);

  const toggle = () => {
    formDispatch({
      type: 'TOGGLE_FORM',
      payload: {
        formIsOpen: !formState.formIsOpen,
      },
    });
  };

  return (
    <button
      type="button"
      className={formState.formIsOpen ? 'uripanelbtn open' : 'uripanelbtn'}
      onClick={toggle}
    >
      {formState.formIsOpen ? '-' : '+'}
    </button>
  );
};

export default URIButton;
