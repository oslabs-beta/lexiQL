import React, { useContext, Component } from "react";
// import { Collapse } from "reactstrap";

import { VisualizerContext, CodeContext } from "../state/contexts";

const URIbtn = () => {
  const { visualizerDispatch } = useContext(VisualizerContext);
  const { codeState, codeDispatch } = useContext(CodeContext);
  const toggle = () => {
    codeDispatch({
      type: "TOGGLE_FORM",
      payload: {
        formIsOpen: !codeState.formIsOpen,
      },
    });
  };
  return (
    <button
      type="button"
      className={codeState.formIsOpen ? "uripanelbtn open" : "uripanelbtn"}
      onClick={toggle}
    >
      {codeState.formIsOpen ? "<" : ">"}
    </button>
  );
};

export default URIbtn;
