import React, { useContext } from "react";
import CodeMirror from "../components/codeMirror";
import { CodeContext } from "../state/contexts";

export default function codeContainer() {
  const { codeState, codeDispatch } = useContext(CodeContext);

  const handleSchema = (e) => {
    e.preventDefault();
    codeDispatch({
      type: "SET_DISPLAY",
      payload: {
        displayCode: codeState.schema,
      },
    });
  };

  const handleResolver = (e) => {
    e.preventDefault();
    codeDispatch({
      type: "SET_DISPLAY",
      payload: {
        displayCode: codeState.resolver,
      },
    });
  };

  const toggle = () => {
    codeDispatch({
      type: "TOGGLE_CODE",
      payload: {
        codeIsOpen: !codeState.codeIsOpen,
      },
    });
  };

  return (
    <div className="codeContainer" id="codeContainer">
      <button
        type="button"
        className={
          codeState.codeIsOpen ? "codeToggleBtn open" : "codeToggleBtn"
        }
        onClick={toggle}
      >
        {codeState.codeIsOpen ? "-" : "+"}
      </button>

      <div className={codeState.codeIsOpen ? "sidebar open" : "sidebar"}>
        <div className="codeButtons">
          <button
            type="button"
            className="codeContainerButton"
            id="schemaButton"
            onClick={handleSchema}
          >
            Schema
          </button>
          <br />
          <button
            type="button"
            className="codeContainerButton"
            id="resolverButton"
            onClick={handleResolver}
          >
            Resolver
          </button>
        </div>
        <br />
        <CodeMirror />
      </div>
      {/* <button id='copyButton'>Copy</button> */}
    </div>
  );
}
