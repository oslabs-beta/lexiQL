import React, { useContext } from 'react';
import URIbtn from './URIbtn';
import { FormContext } from '../state/contexts';

export default function URIForm() {
  const {
    formState,
    formDispatch,
    diagramState,
    diagramDispatch,
    codeState,
    codeDispatch,
  } = useContext(FormContext);

  // const nodes = useStoreState((store) => store.nodes);
  // const transform = useStoreState((store) => store.transform);
  // const setSelectedElements = useStoreActions(
  //   (actions) => actions.setSelectedElements,
  // );

  /*
  // after the visualizer renders, make each table a single unit
  useEffect(() => {
    setSelectedElements(diagramState);
  }, diagramState); // only re-run the effect if the state changes
  */

  // useEffect(() => {
  //   setSelectedElements(
  //     nodes.map((node) => ({ id: node.id, type: node.type })),
  //   );
  // });
  //

  // get the data from the sample DB
  const handleSampleData = (e) => {
    e.preventDefault();

    fetch('/example-schema')
      .then((res) => res.json())
      .then((data) => {
        const sqlSchema = data.SQLSchema;
        const tableNodes = [];
        const allTables = [];

        // new storage for custom nodes
        const tableNodesRev = [];

        /*
        dbContents format:
        { 0: { tableName: <table name>, 
          <columnName1>: <column1 dataType>, 
          <columnName2>: <column2 dataType>, 
          < so on >
          1: { .... }
        }
        */

        const dbContents = {};
        /*
        dbContentsRev format:
        { 0: { tableName: <table name>, 
          columns: [<all column names>], 
          dataTypes: [<all dataTypes of columns>] },
          1: { .... }
        }
        */
        const dbContentsRev = {};

        /*
        columnDataTypes format:
        { <table name[i]>: 
          {columnName: <column name>, 
            dataType: <data type>, 
        <table name[i+1]>: 
          {columnName: <column name>, 
            dataType: <data type> }
        */
        const columnDataTypes = {};

        // loop through the data and grab every table name
        for (let i = 0; i < data.SQLSchema.length; i += 1) {
          const fullTable = data.SQLSchema[i];
          const tableName = Object.keys(fullTable)[0];

          // think of a better name, but this is a subarray to be stored in allTables where the format is:
          // [tableName, columns....]
          const tableNameColumn = [];

          // [ columns....]
          const columnsList = [];
          // testing this for the new custom node
          // sub-object in the dbContents
          const tableContents = {};

          // store the table name as the first key
          tableContents['tableName'] = tableName;

          // sub-object in the dbContentsRev
          const tableContentsRev = { columns: [] };

          // sub-object in the columnDataTypes
          const tableColTypes = {};

          // store the table name as the first key
          tableContentsRev['tableName'] = tableName;

          // store tableName in tableNameColumn
          tableNameColumn.push(tableName);

          tableNodes.push({
            id: i.toString(),
            type: 'default',
            style: { background: '#5a95f5' },
            data: { label: tableName },

            position: {
              x: 200 * i,
              y: 0,
            },
          });

          // grab every column name within the table
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
            // testing this for the new custom node
            // store each column and the data type as a key value pair
            // this saves a key value pair where key is the column name, and its value is the data type
            tableContents[columnLabel] =
              fullTable[tableName].columns[j][columnLabel].dataType;

            // store tableName in tableNameColumn
            tableNameColumn.push(columnLabel);

            // store column name in columnsList so it ends up being an array of all the columns
            columnsList.push(columnLabel);

            // store each column label in the columns key
            tableContentsRev.columns.push(columnLabel);
          }
          // new logic for custom node to store the stuff

          tableNodesRev.push({
            id: i.toString(),
            type: 'selectorNode',
            // data: { onChange: onChange, color: initBgColor },
            data: { tableName: tableName, columns: columnsList },
            style: { border: '1px solid #777', padding: 10 },
            // position: { x: 300, y: 50 },
            position: {
              x: 200 * i,
              y: 0,
            },
          });

          dbContentsRev[i] = tableContentsRev;
          // store the sub obj into the main obj
          dbContents[i] = tableContents;

          // store the sub array into allTables array
          allTables.push(tableNameColumn);
        }

        console.log('ALL TABLES ', dbContents);
        // console.log('ALL TABLES ', dbContents[0]);
        // console.log('ALL TABLES ', Object.keys(dbContents[0]));
        // console.log('ALL TABLES ', Object.values(dbContents[0]));
        // console.log('TABLE CONTENTS ', allTables);
        console.log('TABLE CONTENTS rev ', dbContentsRev);
        console.log('TABLE CONTENTS rev keys', Object.keys(dbContentsRev));
        // console.log('TABLE CONTENTS rev col ', dbContentsRev[0].columns);
        console.log('nodes: ', tableNodesRev);

        diagramDispatch({
          type: 'SET_TABLES',
          payload: {
            sqlSchema,
            tableNodes,
            // testing this for the new custom node
            // save as an array of objects
            dbContents: [dbContents],
            allTables,
            tableNodesRev,
            dbContentsRev,
          },
        });

        codeDispatch({
          type: 'SET_CODE',
          payload: {
            schema: data.GQLSchema.types,
            resolver: data.GQLSchema.resolvers,
            displayCode: data.GQLSchema.types,
          },
        });

        formDispatch({
          type: 'TOGGLE_FORM',
          payload: {
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

          // grab every column name within the table
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

        diagramDispatch({
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
          },
        });

        formDispatch({
          type: 'TOGGLE_FORM',
          payload: {
            firstFetch: false,
            formIsOpen: false,
          },
        });
      });
  };

  // don't have URI form toggle button appear if it's the user's first time on the page
  let btnDisplay = '';
  if (formState.firstFetch) {
    btnDisplay = '';
  } else {
    btnDisplay = <URIbtn />;
  }

  return (
    <div className="uriForm" id="uriForm">
      {btnDisplay}
      <div className={formState.formIsOpen ? 'uripanel open' : 'uripanel'}>
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
