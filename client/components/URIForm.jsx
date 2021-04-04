import React, { useContext } from 'react';
import URIbtn from './URIbtn';
import { VisualizerContext, CodeContext } from '../state/contexts';

export default function URIForm() {
  const { visualizerDispatch } = useContext(VisualizerContext);
  const { codeState, codeDispatch } = useContext(CodeContext);

  // get the data from the sample DB
  const handleSampleData = (e) => {
    e.preventDefault();

    fetch('/example-schema')
      .then((res) => res.json())
      .then((data) => {
        const sqlSchema = data.SQLSchema;
        const tableNodes = [];

        // loop through the data and grab every table name
        for (let i = 0; i < data.SQLSchema.length; i += 1) {
          const fullTable = data.SQLSchema[i];
          const tableName = Object.keys(fullTable)[0];

          tableNodes.push({
            id: i.toString(),
            type: 'default',
            style: { background: ' #5a95f5' },
            data: { label: tableName },

            position: {
              x: 200 * i,
              y: 0,
            },
          });

          const columns = fullTable[tableName].columns;

          for (let j = 0; j < columns.length; j++) {
            const columnLabel = Object.keys(columns[j])[0];
            tableNodes.push({
              id: `${i}${j}`,
              type: 'default',
              style: { background: '#f5ba5a' },
              data: { label: columnLabel },

              position: {
                x: 200 * i,
                y: 30 * (j + 1),
              },
            });
          }
        }

        visualizerDispatch({
          type: 'SET_TABLES',
          payload: {
            sqlSchema,
            tableNodes,
          },
        });

        codeDispatch({
          type: 'SET_CODE',
          payload: {
            schema: data.GQLSchema.types,
            resolver: data.GQLSchema.resolvers,
            displayCode: data.GQLSchema.types,
            firstFetch: false,
            formIsOpen: false,
          },
        });
      });
  };

  // get data from user input DB
  const handleURI = (e) => {
    e.preventDefault();
    const URILink = document.getElementById('URILink').value;
    const valid = /^postgres:\/\//g;

    // if there is no input or if input is invalid do nothing
    if (!URILink || !valid.test(URILink))
      return alert(
        'Missing URI link or the link is invalid. Please enter a valid URI link.',
      );

    fetch('/sql-schema', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: URILink }),
    })
      .then((res) => res.json())
      .then((data) => {
        const sqlSchema = data.SQLSchema;
        const tableNodes = [];

        // loop through the data and grab every table name
        for (let i = 0; i < data.SQLSchema.length; i += 1) {
          const fullTable = data.SQLSchema[i];
          const tableName = Object.keys(fullTable)[0];

          tableNodes.push({
            id: i.toString(),
            type: 'default',
            style: { background: ' #5a95f5' },
            data: { label: tableName },

            position: {
              x: 200 * i,
              y: 0,
            },
          });

          const columns = fullTable[tableName].columns;

          for (let j = 0; j < columns.length; j++) {
            const columnLabel = Object.keys(columns[j])[0];
            tableNodes.push({
              id: `${i}${j}`,
              type: 'default',
              style: { background: '#f5ba5a' },
              // style: { background:' #5a95f5' },
              data: { label: columnLabel },

              position: {
                x: 200 * i,
                y: 30 * (j + 1),
              },
            });
          }
        }

        visualizerDispatch({
          type: 'SET_TABLES',
          payload: {
            sqlSchema,
            tableNodes,
          },
        });

        codeDispatch({
          type: 'SET_CODE',
          payload: {
            schema: data.GQLSchema.types,
            resolver: data.GQLSchema.resolvers,
            displayCode: data.GQLSchema.types,
            firstFetch: false,
            formIsOpen: false,
          },
        });
      });
  };

  const toggle = () => {
    codeDispatch({
      type: 'TOGGLE_FORM',
      payload: {
        formIsOpen: !codeState.formIsOpen,
      },
    });
  };

  // don't have URI form toggle button appear if it's the user's first time on the page
  let btnDisplay = '';
  if (codeState.firstFetch) {
    btnDisplay = '';
  } else {
    btnDisplay = <URIbtn />;
  }

  return (
    <div className="uriForm" id="uriForm">
      {btnDisplay}
      <div className={codeState.formIsOpen ? 'uripanel open' : 'uripanel'}>
        <form onSubmit={handleURI}>
          <label className="formHeader" htmlFor="link">
            Link a database:
          </label>
          <br />
          <input className="dbInput" id="URILink" placeholder="postgres://" />
          <br />

          <button className="formButtons" id="uriSubmitButton">
            Submit
          </button>
          <br />
        </form>

        <button
          type="button"
          className="formButtons"
          id="sampleDataButton"
          onClick={handleSampleData}
        >
          Use Sample Database
        </button>
        <br />
      </div>
    </div>
  );
}
