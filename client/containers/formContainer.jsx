import React, { useContext } from 'react';
import URIbtn from '../components/URIbtn';
import { FormContext } from '../state/contexts';
import CryptoJS from 'crypto-js';
import secretKey from '../../server/secretKey';

export default function formContainer() {
  const {
    formState,
    formDispatch,
    diagramState,
    diagramDispatch,
    codeState,
    codeDispatch,
  } = useContext(FormContext);

  // get data from the sample DB
  const handleSampleData = (e) => {
    e.preventDefault();

    fetch('/example-schema')
      .then((res) => res.json())
      .then((data) => {
        const sqlSchema = data.SQLSchema;
        const tableNodes = [];
        const relationalData = {};
        const primaryKeys = {};
        const dbContents = {};
        // store the foreign keys to use in 'hasHandles'
        const allForeignKeys = [];
        // store the referenced by values to use in 'hasHandles'
        const allRefByValues = [];

        for (let i = 0; i < sqlSchema.length; i += 1) {
          const fullTable = sqlSchema[i];
          const tableName = Object.keys(fullTable)[0];
          const tableElements = fullTable[tableName];

          // all column names within the current table
          const columns = fullTable[tableName].columns;
          const columnsList = [];

          const tableContents = {};

          // store the table name as the first key in tableContents
          tableContents['tableName'] = tableName;

          // store primary key of each table in tableContents
          primaryKeys[tableName] = tableElements.primaryKey;

          const relationalTableData = {};

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

              // store in the format of [source, target, sourceHandle, targetHandle]
              relationalTableData[tableName].foreignKeys.push([
                tableName,
                fkeys[j][fkeyName].referenceTable,
                fkeyName,
                fkeys[j][fkeyName].referenceKey,
              ]);
            }
          }

          // store the referenced by values within the current table
          const refByKeys = tableElements.referencedBy;

          if (refByKeys) {
            relationalTableData[tableName].referencedBy = [];
            for (let j = 0; j < refByKeys.length; j++) {
              const refKey = Object.keys(refByKeys[j])[0];
              // store in the format of [source, target, sourceHandle, targetHandle]
              relationalTableData[tableName].referencedBy.push([
                refKey,
                tableName,
                refByKeys[j][refKey],
                tableElements.primaryKey,
              ]);
            }
          }

          relationalData[tableName] = relationalTableData[tableName];

          // obj to keep track of which columns have source/target handles to help with  to avoid each node having handles when unnecessary
          /*
          const hasHandles = {}

          for (let )
          // iterate over relationalData object
          */

          let dataTypes = [];

          for (let j = 0; j < columns.length; j++) {
            const columnLabel = Object.keys(columns[j])[0];

            // testing this for the new custom node
            // store each column and the data type as a key value pair
            // this saves a key value pair where key is the column name, and its value is the data type
            tableContents[columnLabel] =
              fullTable[tableName].columns[j][columnLabel].dataType;

            // store column name in columnsList so it ends up being an array of all the columns
            columnsList.push(columnLabel);
            dataTypes.push(tableContents[columnLabel]);
          }

          // move primary key to front of columnsList array before saving it onto tableNodes
          columnsList.forEach((column, i) => {
            if (column === tableElements.primaryKey) {
              columnsList.splice(i, 1);
              columnsList.unshift(column);
              const matchingCol = dataTypes.splice(i, 1);
              dataTypes.unshift(matchingCol);
            }
          });

          tableNodes.push({
            id: `${tableName}`,
            // id: i.toString(),
            type: 'selectorNode',
            // data: { onChange: onChange, color: initBgColor },
            data: {
              tableName: tableName,
              columns: columnsList,
              dataTypes: dataTypes,
            },
            style: {
              backgroundColor: 'white',
              border: '1px solid #777',
              padding: 10,
              width: 350,
              boxShadow: '5px 7px 5px 0px #aaa9a9',
              fontSize: '14px',
            },
            position: {
              x: 0,
              y: 0,
            },
            sourcePosition: 'right',
            targetPosition: 'left',
          });

          // HOW MANY TABLES TO RENDER PER ROW ON CANVAS
          let numTables = sqlSchema.length;
          let tablesPerRow = 0;

          if (numTables < 5) tablesPerRow = numTables;
          else {
            if (numTables % 5 === 1) tablesPerRow = 4;
            else tablesPerRow = numTables;
          }

          // currently brute-forcing the actual placement of the 4 or 5 tables per row of tables:
          if (i < tablesPerRow) {
            tableNodes[i].position.x = 500 * i;
            tableNodes[i].position.y = 0;
          } else if (i < tablesPerRow * 2) {
            tableNodes[i].position.x = 500 * (i - tablesPerRow);
            tableNodes[i].position.y = 550;
          } else {
            tableNodes[i].position.x = 500 * (i - tablesPerRow * 2);
            tableNodes[i].position.y = 1100;
          }

          // store the sub obj into the main obj
          dbContents[i] = tableContents;
        }

        // logic for links

        // store everything in tableNodesRev - this is where the nodes are stored, later to be rendered by react flow

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

        const tableNames = Object.keys(relationalData);

        for (let i = 0; i < tableNames.length; i++) {
          // check to see if the table has a foreignKeys key
          if (relationalData[tableNames[i]].foreignKeys) {
            const currTableFkeys = relationalData[tableNames[i]].foreignKeys;
            for (let j = 0; j < currTableFkeys.length; j++) {
              tableNodes.push({
                id: `${tableNames[i]}-fkey${j}`,
                source: currTableFkeys[j][0],
                target: currTableFkeys[j][1],
                sourceHandle: currTableFkeys[j][2],
                targetHandle: currTableFkeys[j][3],
              });

              allForeignKeys.push({
                tableName: tableNames[i],
                source: currTableFkeys[j][0],
                target: currTableFkeys[j][1],
                sourceHandle: currTableFkeys[j][2],
                targetHandle: currTableFkeys[j][3],
              });
            }
          }

          // check to see if the table has a referencedBy key
          if (relationalData[tableNames[i]].referencedBy) {
            const currTableRefKeys = relationalData[tableNames[i]].referencedBy;
            for (let j = 0; j < currTableRefKeys.length; j++) {
              tableNodes.push({
                id: `${tableNames[i]}-refKey${j}`,
                source: currTableRefKeys[j][0],
                target: currTableRefKeys[j][1],
                sourceHandle: currTableRefKeys[j][2],
                targetHandle: currTableRefKeys[j][3],
              });

              allRefByValues.push({
                tableName: tableNames[i],
                source: currTableRefKeys[j][0],
                target: currTableRefKeys[j][1],
                sourceHandle: currTableRefKeys[j][2],
                targetHandle: currTableRefKeys[j][3],
              });
            }
          }
        }

        // store all the source/target handles that a table has to only render handles for the columns that have them
        const hasHandles = {};

        // only care about the source and source handles
        allForeignKeys.forEach((obj) => {
          if (!hasHandles[obj.source]) {
            hasHandles[obj.source] = { sourceHandles: [obj.sourceHandle] };
          } else {
            hasHandles[obj.source].sourceHandles.push(obj.sourceHandle);
          }
        });

        // only care about the target and target handles

        allRefByValues.forEach((obj) => {
          if (!hasHandles[obj.target]) {
            hasHandles[obj.target] = { targetHandles: [obj.targetHandle] };
          } else {
            if (!hasHandles[obj.target].targetHandles) {
              hasHandles[obj.target].targetHandles = [obj.targetHandle];
            } else if (
              !hasHandles[obj.target].targetHandles.includes(obj.targetHandle)
            ) {
              hasHandles[obj.target].targetHandles.push(obj.targetHandle);
            }
          }
        });

        // console.log('table nodes in formcontainer: ', tableNodes);
        // console.log('has handles: ', hasHandles);
        // console.log('relational data: ', relationalData);

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
        // console.log('dbContents: ', dbContents);

        diagramDispatch({
          type: 'SET_TABLES',
          payload: {
            sqlSchema,
            dbContents: [dbContents],
            tableNodes,
            relationalData,
            primaryKeys,
            hasHandles,
          },
        });

        codeDispatch({
          type: 'SET_CODE',
          payload: {
            schema: data.GQLSchema.types,
            resolver: data.GQLSchema.resolvers,
            displayCode: data.GQLSchema.types,
            codeIsOpen: true,
          },
        });

        formDispatch({
          type: 'TOGGLE_FORM',
          payload: {
            firstFetch: false,
            formIsOpen: false,
            sampleDBtext: 'Use the sample database:',
            inputDBtext: 'Or input a link to a different database:',
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
    if (!URILink || !valid.test(URILink)) {
      // return alert(
      //   'Missing URI link or the link is invalid. Please enter a valid URI link.',
      // );

      return formDispatch({
        type: 'TOGGLE_FORM',
        payload: {
          URIvalidation: 'Invalid URI link.',
          formIsOpen: true,
        },
      });
    }
    // return alert(
    //   'Missing URI link or the link is invalid. Please enter a valid URI link.',
    // );

    // encrypt URI before sending to server
    const encryptedURL = CryptoJS.AES.encrypt(URILink, secretKey).toString();

    fetch('/sql-schema', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: encryptedURL }),
    })
      .then((res) => res.json())
      .then((data) => {
        const sqlSchema = data.SQLSchema;
        const tableNodes = [];
        const relationalData = {};
        const primaryKeys = {};
        const dbContents = {};
        // store the foreign keys to use in 'hasHandles'
        const allForeignKeys = [];
        // store the referenced by values to use in 'hasHandles'
        const allRefByValues = [];

        // loop through the data and grab every table name
        for (let i = 0; i < sqlSchema.length; i += 1) {
          const fullTable = sqlSchema[i];
          const tableName = Object.keys(fullTable)[0];
          const tableElements = fullTable[tableName];
          // grab every column name within the table
          const columns = fullTable[tableName].columns;
          const columnsList = [];

          // sub-object in the dbContents
          const tableContents = {};

          // store the table name as the first key
          tableContents['tableName'] = tableName;

          // store primary key of each table
          primaryKeys[tableName] = tableElements.primaryKey;

          // sub-object in the relationalData obj
          const relationalTableData = {};

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

              // store in the format of [source, target, sourceHandle, targetHandle]
              relationalTableData[tableName].foreignKeys.push([
                tableName,
                fkeys[j][fkeyName].referenceTable,
                fkeyName,
                fkeys[j][fkeyName].referenceKey,
              ]);
            }
          }

          // store the referenced by values within the current table
          const refByKeys = tableElements.referencedBy;

          if (refByKeys) {
            relationalTableData[tableName].referencedBy = [];
            for (let j = 0; j < refByKeys.length; j++) {
              const refKey = Object.keys(refByKeys[j])[0];
              // store in the format of [source, target, sourceHandle, targetHandle]
              relationalTableData[tableName].referencedBy.push([
                refKey,
                tableName,
                refByKeys[j][refKey],
                tableElements.primaryKey,
              ]);
            }
          }

          relationalData[tableName] = relationalTableData[tableName];

          let dataTypes = [];

          for (let j = 0; j < columns.length; j++) {
            const columnLabel = Object.keys(columns[j])[0];
            tableContents[columnLabel] =
              fullTable[tableName].columns[j][columnLabel].dataType;

            columnsList.push(columnLabel);
            dataTypes.push(tableContents[columnLabel]);
          }

          // move primary key to front of columnsList array before saving it onto tableNodes
          columnsList.forEach((column, i) => {
            if (column === tableElements.primaryKey) {
              columnsList.splice(i, 1);
              columnsList.unshift(column);
              const matchingCol = dataTypes.splice(i, 1);
              dataTypes.unshift(matchingCol);
            }
          });
          // new logic for custom node to store the stuff
          tableNodes.push({
            id: `${tableName}`,
            // id: i.toString(),
            type: 'selectorNode',
            // data: { onChange: onChange, color: initBgColor },
            data: {
              tableName: tableName,
              columns: columnsList,
              dataTypes: dataTypes,
            },
            style: {
              backgroundColor: 'white',
              border: '1px solid #777',
              padding: 10,
              width: 350,
              boxShadow: '5px 7px 5px 0px #aaa9a9',
              fontSize: '14px',
            },
            position: {
              x: 0,
              y: 0,
            },
            sourcePosition: 'right',
            targetPosition: 'left',
          });

          // HOW MANY TABLES TO RENDER PER ROW ON CANVAS
          let numTables = sqlSchema.length;
          let tablesPerRow = 0;

          if (numTables < 5) tablesPerRow = numTables;
          else {
            if (numTables % 5 === 1) tablesPerRow = 4;
            else tablesPerRow = numTables;
          }

          // for (let j = 0; j < numTables; j++) {}
          if (i < tablesPerRow) {
            tableNodes[i].position.x = 500 * i;
            tableNodes[i].position.y = 0;
          } else if (i < tablesPerRow * 2) {
            tableNodes[i].position.x = 500 * (i - tablesPerRow);
            tableNodes[i].position.y = 550;
          } else {
            tableNodes[i].position.x = 500 * (i - tablesPerRow * 2);
            tableNodes[i].position.y = 1100;
          }
          dbContents[i] = tableContents;
        }

        // logic for the input DB links
        const tableNames = Object.keys(relationalData);

        for (let i = 0; i < tableNames.length; i++) {
          // check to see if the table has a foreignKeys key
          if (relationalData[tableNames[i]].foreignKeys) {
            const currTableFkeys = relationalData[tableNames[i]].foreignKeys;
            for (let j = 0; j < currTableFkeys.length; j++) {
              tableNodes.push({
                id: `${tableNames[i]}-fkey${j}`,
                source: currTableFkeys[j][0],
                target: currTableFkeys[j][1],
                sourceHandle: currTableFkeys[j][2],
                targetHandle: currTableFkeys[j][3],
              });

              allForeignKeys.push({
                tableName: tableNames[i],
                source: currTableFkeys[j][0],
                target: currTableFkeys[j][1],
                sourceHandle: currTableFkeys[j][2],
                targetHandle: currTableFkeys[j][3],
              });
            }
          }

          // check to see if the table has a referencedBy key
          if (relationalData[tableNames[i]].referencedBy) {
            const currTableRefKeys = relationalData[tableNames[i]].referencedBy;
            for (let j = 0; j < currTableRefKeys.length; j++) {
              tableNodes.push({
                id: `${tableNames[i]}-refKey${j}`,
                source: currTableRefKeys[j][0],
                target: currTableRefKeys[j][1],
                sourceHandle: currTableRefKeys[j][2],
                targetHandle: currTableRefKeys[j][3],
              });

              allRefByValues.push({
                tableName: tableNames[i],
                source: currTableRefKeys[j][0],
                target: currTableRefKeys[j][1],
                sourceHandle: currTableRefKeys[j][2],
                targetHandle: currTableRefKeys[j][3],
              });
            }
          }
        }

        const hasHandles = {};

        // only care about the source and source handles
        allForeignKeys.forEach((obj) => {
          if (!hasHandles[obj.source]) {
            hasHandles[obj.source] = { sourceHandles: [obj.sourceHandle] };
          } else {
            hasHandles[obj.source].sourceHandles.push(obj.sourceHandle);
          }
        });

        // only care about the target and target handles

        allRefByValues.forEach((obj) => {
          if (!hasHandles[obj.target]) {
            hasHandles[obj.target] = { targetHandles: [obj.targetHandle] };
          } else {
            if (!hasHandles[obj.target].targetHandles) {
              hasHandles[obj.target].targetHandles = [obj.targetHandle];
            } else if (
              !hasHandles[obj.target].targetHandles.includes(obj.targetHandle)
            ) {
              hasHandles[obj.target].targetHandles.push(obj.targetHandle);
            }
          }
        });

        console.log('hashandles: ', hasHandles);

        diagramDispatch({
          type: 'SET_TABLES',
          payload: {
            sqlSchema,
            dbContents: [dbContents],
            tableNodes,
            relationalData,
            primaryKeys,
            hasHandles,
          },
        });

        codeDispatch({
          type: 'SET_CODE',
          payload: {
            schema: data.GQLSchema.types,
            resolver: data.GQLSchema.resolvers,
            displayCode: data.GQLSchema.types,
            codeIsOpen: true,
          },
        });

        formDispatch({
          type: 'TOGGLE_FORM',
          payload: {
            firstFetch: false,
            formIsOpen: false,
            sampleDBtext: 'Use the sample database:',
            inputDBtext: 'Or input a link to a different database:',
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
        <div id="uriAboveForm">
          <h6 id="sampleHeader">
            Get started by using
            <br />
            our sample database:
          </h6>

          <button
            type="button"
            className="formButtons"
            id="sampleDataButton"
            onClick={handleSampleData}
          >
            Use Sample Database
          </button>
        </div>
        <form className="formContainer" onSubmit={handleURI}>
          {/* <label className="formHeader" htmlFor="link"> */}
          <h6 id="inputHeader">
            Or input a link to
            <br />
            your SQL database:
          </h6>
          {/* </label> */}
          <input className="dbInput" id="URILink" placeholder="postgres://" />
          <p id="invalidURI">{formState.URIvalidation}</p>
          <button className="formButtons" id="uriSubmitButton">
            Submit
          </button>
          {/* <br /> */}
        </form>
      </div>
    </div>
  );
}

// og form:
{
  /* <div className="uriForm" id="uriForm">
      {btnDisplay}
      <div className={formState.formIsOpen ? 'uripanel open' : 'uripanel'}>
        <p>sample db button location?</p>

        <form onSubmit={handleURI}>
          <label className="formHeader" htmlFor="link">
          {/* Get started by using the sample database: */
}
//         Link a database:
//       </label>
//       <br />
//       <input className="dbInput" id="URILink" placeholder="postgres://" />
//       <br />
//       <p id="invalidURI">{formState.URIvalidation}</p>
//       Or input a link to your database:
//       <button className="formButtons" id="uriSubmitButton">
//         Submit
//       </button>
//       <br />
//     </form>
//     <button
//       type="button"
//       className="formButtons"
//       id="sampleDataButton"
//       onClick={handleSampleData}
//     >
//       Use Sample Database
//     </button>
//     <br />
//   </div>
// </div> */}
