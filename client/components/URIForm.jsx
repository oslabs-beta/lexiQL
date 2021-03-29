import React, { useContext } from 'react';
import { VisualizerContext, CodeContext } from '../state/contexts';

export default function URIForm() {
  // const { visualizerDispatch } = useContext(VisualizerContext);
  const { codeDispatch } = useContext(CodeContext);

  const getData = (e) => {
    e.preventDefault();

    fetch('/example-schema')
      .then((res) => res.json())
      .then((data) => {
        // visualizerDispatch({
        //   type: 'SET_TABLE',
        //   payload: data,
        // });

        codeDispatch({
          type: 'SET_CODE',
          payload:
            // schema: data.schema.types,
            // resolver: data.schema.resolvers,
            { test: Object.keys(data) },
        });
      });
  };

  return (
    // <div>
    //   <div id="myModal" class="modal">
    //     <div class="modal-content">
    //       <span class="close">&times;</span>
    //       <p>Some text in the Modal..</p>
    //     </div>
    //   </div>
    <div id="uriForm">
      <form
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   alert('user input DB');
      // }}
      >
        <label htmlFor="link">INPUT YOUR LINK:</label>
        <br />

        <input className="dbForm" />
        <br />

        <button className="URIbutton">Submit</button>
        <br />

        <button type="button" className="sampleDataButton" onClick={getData}>
          Use Sample Database
        </button>
        <br />
      </form>
    </div>
  );
}
