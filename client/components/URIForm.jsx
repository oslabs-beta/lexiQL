import React from 'react';

export default function URIForm() {
  const { visualizerDispatch } = useContext(VisualizerContext);
  const { codeDispatch } = useContext(CodeContext);

  const getData = () => {
    fetch('/example-schema')
    .then((res) => res.json())
    .then((data) => {
      visualizerDispatch({
        type: 'SET_TABLE',
        payload: data.allTables
      });
      
      codeDispatch({
        type: '',
        payload: {

        }
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

    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('user input DB');
      }}
    >
      <label htmlFor="link">INPUT YOUR LINK:</label>
      <br />
      <input className="dbForm" />
      <br />
      <button className="URIbutton">Submit</button>
      <br />
      <button
        className="sampleDataButton"
        onClick={getData}}
      >
        Use Sample Database
      </button>
      <br />
    </form>
  );
}
