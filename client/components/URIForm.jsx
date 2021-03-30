import React, { useContext } from 'react';
import { VisualizerContext, CodeContext } from '../state/contexts';
import TableNode from './tableNode';

export default function URIForm() {
  const { visualizerDispatch } = useContext(VisualizerContext);
  const { codeDispatch } = useContext(CodeContext);

  // get the data from the sample DB
  const handleSampleData = (e) => {
    e.preventDefault();

    fetch('/example-schema')
      .then((res) => res.json())
      .then((data) => {

        const tableNames = [];
        const sqlSchema = data.SQLSchema;
        console.log('data:', data);
        console.log('SQL schema:', data.SQLSchema);
        console.log('GQL schema:', data.GQLSchema);
        const tableNodes = [];

        for (let i = 0; i < data.SQLSchema.length; i += 1) {
          const fullTable = data.SQLSchema[i];
          const tableName = Object.keys(fullTable)[0];
          tableNames.push(tableName);
          // console.log('fullTable in loop:', fullTable);
          console.log('tableName in loop:', tableName);

          const columns = fullTable[tableName].columns;
          console.log('columns:', columns);
          const oneColumn = columns[0];
          console.log('oneColumn:', oneColumn);
          const dataType = oneColumn.dataType;
          console.log('dataType:', dataType);

          tableNodes.push({
            id: i.toString(),
            data: { label: tableName },

            position: {
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            },
          });
        }
        console.log('SEND NODES: ', tableNodes);

        visualizerDispatch({
          type: 'SET_TABLES',
          payload: {
            // change below based on whatever backend has their data

            sqlSchema,

            tableNodes,
          },
        });

        codeDispatch({
          type: 'SET_CODE',
          payload: {
            // schema: data.GQLSchema.types,
            // resolver: data.GQLSchema.resolvers,
            schema: 'abc',
            resolver: '!!!',
            test: '12345',
          },
        });
      });
  };

  // get data from user input DB
  const handleURI = (e) => {
    e.preventDefault();
    const URILink = document.getElementById('URILink').value;
    // if there's no input, do nothing
    if (!URILink) return;
    alert(URILink);

    fetch('/sql-schema', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: URILink }),
    })
      .then((res) => res.json())
      .then((data) => {

        const tableNames = Object.keys(data);
        const tableNodes = [];

        for (let i = 0; i < tableNames.length; i += 1) {
          tableNodes.push({
            id: i.toString(),
            data: { label: tableNames[i] },
            position: {
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            },
          });
        }
        console.log('SEND NODES: ', tableNodes);
        console.log('TABLE NAMES: ', tableNames);

        visualizerDispatch({
          type: 'SET_TABLES',
          payload: {
            // change below based on whatever backend has their data
            tableNames,
            tableNodes,
          },
        });

        codeDispatch({
          type: 'SET_CODE',
          payload: {
            // schema: data.GQLSchema.types,
            // resolver: data.GQLSchema.resolvers,
            schema: 'abc124124124',
            resolver: '124124214!!!',
            test: '12345124124124',
          },

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
      <form onSubmit={handleURI}>
        <label htmlFor="link">INPUT YOUR LINK:</label>
        <br />

        <input id="URILink" className="dbForm" />
        <br />

        <button className="URIbutton">Submit</button>
        <br />
      </form>

      <button
        type="button"
        className="sampleDataButton"
        onClick={handleSampleData}
      >
        Use Sample Database
      </button>
      <br />
    </div>
  );
}
