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

  // this file needs to be cleaned up and possibly separated much further

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

        // this will store a react node format for each column across all tables, where previously we were just saving one for each table
        const columnNodes = [];

        // new storage for custom nodes - this works, possible delete 'tableNodes' ??
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

        // store relational data here
        const relationalData = {};

        // loop through the data and grab every table name
        for (let i = 0; i < data.SQLSchema.length; i += 1) {
          const fullTable = data.SQLSchema[i];
          // current table name
          const tableName = Object.keys(fullTable)[0];
          console.log('FULLTABLE: ', fullTable);
          console.log('tableName: ', tableName);
          // console.log(
          //   'fkeys: ',
          //   Object.keys(fullTable[tableName].foreignKeys[0])[0],
          // );

          const tableElements = fullTable[tableName];

          console.log('table: ', tableElements);
          // const columnLabel = Object.keys(columns[j])[0];
          // console.log('ref by: ', fullTable[tableName].referencedBy[0]);

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

          // tableNodes.push({
          //   id: i.toString(),
          //   type: "default",
          //   style: { background: "#5a95f5" },
          //   data: { label: tableName },

          //   position: {
          //     x: 200 * i,
          //     y: 0,
          //   },
          // });

          // grab every column name within the current table
          const columns = fullTable[tableName].columns;

          // sub-object in the relationalData obj
          const relationalTableData = {};
          /*
          save any relational info in one obj in this format for each table:
          { <table name>: {
            primaryKey: <primary key>,
            referencedBy: [<table name + column name>, ...] 
            foreignKeys: [[<fkey>, <table name + column name>], ...],
            },
            <table name 2>: ....
          }
          */

          relationalTableData[tableName] = {
            primaryKey: tableElements.primaryKey,
          };

          // store the foreign key within the current table
          const fkeys = tableElements.foreignKeys;

          // check to see if there are any foreign keys and/or referencedByKeys
          if (fkeys) {
            relationalTableData[tableName].foreignKeys = [];
            for (let j = 0; j < fkeys.length; j++) {
              const fkeyName = Object.keys(fkeys[j])[0];
              // console.log('fkeyyy: ', fkeyName);
              // console.log('fkey val: ', fkeys[j][fkeyName].referenceKey);
              relationalTableData[tableName].foreignKeys.push([
                `${fkeys[j][fkeyName].referenceTable}+${fkeys[j][fkeyName].referenceKey}`,
                `${fkeyName}`,
              ]);
            }
          }

          // store the referenced by values within the current table
          const refByKeys = tableElements.referencedBy;

          if (refByKeys) {
            relationalTableData[tableName].referencedBy = [];
            for (let j = 0; j < refByKeys.length; j++) {
              const refKey = Object.keys(refByKeys[j])[0];
              // console.log('fkeyyy: ', fkeyName);
              // console.log('fkey val: ', fkeys[j][fkeyName].referenceKey);
              relationalTableData[tableName].referencedBy.push([
                `${refKey}+${refByKeys[j][refKey]}`,
                `${tableName}+${tableElements.primaryKey}`,
              ]);
            }
          }

          relationalData[tableName] = relationalTableData[tableName];

          // if (full[tableName].referencedBy) {
          //   relationalTableData[tableName].referencedBy = [];
          //   for (let i = 0; i < full[tableName].foreignKeys.length; i++) {
          //     const refBySubArr = [
          //       `${full[tableName]}+${full[TableName].foreignKeys[i]}`,
          //       `${full[tableName].foreignKeys[i].referenceTable}+${full[TableName].foreignKeys[i].referenceKey}`,
          //     ];
          //     relationalTableData[tableName].referencedBy.push(refBySubArr);
          //   }
          // }

          for (let j = 0; j < columns.length; j++) {
            const columnLabel = Object.keys(columns[j])[0];
            // tableNodes.push({
            //   id: `${i}${j}`,
            //   type: "default",
            //   style: { background: "#f5ba5a" },
            //   data: { label: columnLabel },

            //   position: {
            //     x: 200 * i,
            //     y: 30 * (j + 1),
            //   },
            // });
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

            // store react flow node format for each column in the columnNodes array
            columnNodes.push({
              id: `${tableName}+${columnLabel}`,
              // id: i.toString(),
              type: 'selectorNode',
              // data: { onChange: onChange, color: initBgColor },
              data: { tableName: tableName, columnName: columnLabel },
              style: {
                border: '1px solid #777',
                padding: 10,
                // width: 150,
                boxShadow: '5px 7px 5px 0px #aaa9a9',
                fontSize: '10px',
              },
              position: {
                x: 200 * i,
                y: 0,
              },
              sourcePosition: 'right',
              targetPosition: 'left',
            });
          }
          // new logic for custom node to store the stuff
          tableNodesRev.push({
            // id: `${tableName} ${columnLabel}`,
            id: i.toString(),
            type: 'selectorNode',
            // data: { onChange: onChange, color: initBgColor },
            data: { tableName: tableName, columns: columnsList },
            style: {
              backgroundColor: 'white',
              border: '1px solid #777',
              padding: 10,
              width: 250,
              boxShadow: '5px 7px 5px 0px #aaa9a9',
              fontSize: '20px',
            },
            position: {
              x: 300 * i,
              y: 0,
            },
            sourcePosition: 'right',
            targetPosition: 'left',
          });

          // HOW MANY TABLES TO RENDER PER ROW ON CANVAS
          let numTables = data.SQLSchema.length;
          let tablesPerRow = 0;

          if (numTables < 5) tablesPerRow = numTables;
          else {
            if (numTables % 5 === 1) tablesPerRow = 4;
            else tablesPerRow = numTables;
          }

          // for (let j = 0; j < numTables; j++) {}
          if (i < tablesPerRow) {
            tableNodesRev[i].position.x = 300 * i;
            tableNodesRev[i].position.y = 0;
          } else if (i < tablesPerRow * 2) {
            tableNodesRev[i].position.x = 300 * (i - tablesPerRow);
            tableNodesRev[i].position.y = 500;
          } else {
            tableNodesRev[i].position.x = 300 * (i - tablesPerRow * 2);
            tableNodesRev[i].position.y = 1000;
          }

          dbContentsRev[i] = tableContentsRev;
          // store the sub obj into the main obj
          dbContents[i] = tableContents;

          // store the sub array into allTables array
          allTables.push(tableNameColumn);
        }

        // logic for links

        /* 
        the elements in the 'foreignKeys' key will have a connection from their source handle to the target handle of the reference table/reference key listed in the 'foreignKeys' value
        
        format for foreignKeys:

        {
        id: 'e2-3',
        source: '2', <-- this is the foreign key (key in current table)
        target: '3', <-- this is the reference key (key from a different table)
        animated: true,
        style: { stroke: '#fff' },
      },
        */

        /*

        // if the current column name is included in the foreign keys, create a link where 'source' is the current column name and 'target' is the reference key where you'll have to link to another table
        if ()
        
        */

        /* 
        the elements in the 'referencedBy" key will be nodes from a different table that reference that value
        
        format for referencedBy:

        {
        id: 'e1-2',
        source: '1', <-- this is the key that it is referenced by (key from a different table)
        target: '2', <-- this is the current table's primary key
        animated: true,
        style: { stroke: '#fff' },
      },
        */

        /*

        // create a link where the 'source' handle is the value in referencedBy from the respective table, and 'target' is the current table's _id
        */

        // console.log("ALL TABLES ", dbContents);
        // console.log('ALL TABLES ', dbContents[0]);
        // console.log('ALL TABLES ', Object.keys(dbContents[0]));
        // console.log('ALL TABLES ', Object.values(dbContents[0]));
        // console.log("TABLE CONTENTS ", allTables);
        console.log('nodes: ', tableNodesRev);
        console.log('column nodes: ', columnNodes);
        console.log('relational database: ', relationalData);

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
            columnNodes,
            relationalData,
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
