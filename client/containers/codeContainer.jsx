import React, { useContext } from "react";
import { Collapse } from "reactstrap";
import CodeMirror from "../components/codeMirror";

import { CodeContext } from "../state/contexts";

export default function codeContainer() {
  const { codeState, codeDispatch } = useContext(CodeContext);
  // console.log(testCode.test);

  const handleSchema = (e) => {
    e.preventDefault();
    console.log("TESTING SCHEMA HANDLER: ", codeState.schema);
    codeDispatch({
      type: "SET_DISPLAY",
      payload: {
        displayCode: codeState.schema,
      },
    });
  };

  const handleResolver = (e) => {
    e.preventDefault();
    console.log("TESTING RESOLVER HANDLER: ", codeState.resolver);
    codeDispatch({
      type: "SET_DISPLAY",
      payload: {
        displayCode: codeState.resolver,
      },
    });
  };

  const toggle = () => {
    console.log("TOGGLED, new codeState.codeIsOpen:", !codeState.codeIsOpen);
    codeDispatch({
      type: "TOGGLE_CODE",
      payload: {
        codeIsOpen: !codeState.codeIsOpen,
      },
    });
  };

  return (
    <div className="codeContainer" id="codeContainer">
      {/* <button className="codeToggleBtn" type="button" onClick={toggle}>
        Toggle
      </button> */}
      <button
        type="button"
        className={
          codeState.codeIsOpen ? "codeToggleBtn open" : "codeToggleBtn"
        }
        onClick={toggle}
      >
        {codeState.codeIsOpen ? ">" : "<"}
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
    </div>
  );
}
