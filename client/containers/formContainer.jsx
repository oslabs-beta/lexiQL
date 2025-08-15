import CryptoJS from 'crypto-js';
import React, { useContext } from 'react';
import secretKey from '../../server/secretKey';
import URIbtn from '../components/URIbtn';
import { FormContext } from '../state/contexts';

export default function FormContainer() {
  const { formState, formDispatch, /* diagramState */ diagramDispatch, codeDispatch } =
    useContext(FormContext);

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

        // Handle both array format (from formatGraphData) and object format (from mock data)
        let tablesToProcess = [];
        if (Array.isArray(sqlSchema)) {
          // Old format: array of objects with table names as keys
          tablesToProcess = sqlSchema;
        } else {
          // New format: direct object with table names as keys
          tablesToProcess = Object.keys(sqlSchema).map((tableName) => ({
            [tableName]: sqlSchema[tableName],
          }));
        }

        for (let i = 0; i < tablesToProcess.length; i += 1) {
          const fullTable = tablesToProcess[i];
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
            // Handle both array format and object format for foreignKeys
            if (Array.isArray(fkeys)) {
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
            } else {
              // Object format: { fkeyName: { referenceTable, referenceKey } }
              for (const fkeyName of Object.keys(fkeys)) {
                relationalTableData[tableName].foreignKeys.push([
                  tableName,
                  fkeys[fkeyName].referenceTable,
                  fkeyName,
                  fkeys[fkeyName].referenceKey,
                ]);
              }
            }
          }

          // store the referenced by values within the current table
          const refByKeys = tableElements.referencedBy;

          if (refByKeys) {
            relationalTableData[tableName].referencedBy = [];
            // Handle both array format and object format for referencedBy
            if (Array.isArray(refByKeys)) {
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
            } else {
              // Object format: { refTable: refColumn }
              for (const refTable of Object.keys(refByKeys)) {
                relationalTableData[tableName].referencedBy.push([
                  refTable,
                  tableName,
                  refByKeys[refTable],
                  tableElements.primaryKey,
                ]);
              }
            }
          }

          relationalData[tableName] = relationalTableData[tableName];

          let dataTypes = [];

          // Handle both array format and object format for columns
          if (Array.isArray(columns)) {
            for (let j = 0; j < columns.length; j++) {
              const columnLabel = Object.keys(columns[j])[0];
              tableContents[columnLabel] = fullTable[tableName].columns[j][columnLabel].dataType;

              // store column name in columnsList so it ends up being an array of all the columns
              columnsList.push(columnLabel);
              dataTypes.push(tableContents[columnLabel]);
            }
          } else {
            // Object format: { columnName: { dataType, ... } }
            for (const columnName of Object.keys(columns)) {
              tableContents[columnName] = columns[columnName].dataType;
              columnsList.push(columnName);
              dataTypes.push(tableContents[columnName]);
            }
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
            type: 'selectorNode',
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

          // Create a well-spaced layout for the tables
          // Position tables in a grid-like pattern with proper spacing
          // layout constants
          const tablesPerRow = 3; // Show 3 tables per row
          // const tableWidth = 400; // Width of each table
          // const tableHeight = 300; // Height of each table
          const horizontalSpacing = 450; // More space between tables horizontally
          const verticalSpacing = 400; // More space between rows

          const row = Math.floor(i / tablesPerRow);
          const col = i % tablesPerRow;

          // Add buffer around the outside to help center the tables
          const bufferX = 200; // Buffer from left edge
          const bufferY = 150; // Buffer from top edge

          tableNodes[i].position.x = bufferX + col * horizontalSpacing;
          tableNodes[i].position.y = bufferY + row * verticalSpacing;

          // store the sub obj into the main obj
          dbContents[i] = tableContents;
        }

        const tableNames = Object.keys(relationalData);

        for (let i = 0; i < tableNames.length; i++) {
          // check to see if the table has a foreignKeys key
          if (relationalData[tableNames[i]].foreignKeys) {
            const currTableFkeys = relationalData[tableNames[i]].foreignKeys;
            for (let j = 0; j < currTableFkeys.length; j++) {
              const edge = {
                id: `${tableNames[i]}-fkey${j}`,
                type: 'default',
                source: currTableFkeys[j][0],
                target: currTableFkeys[j][1],
                sourceHandle: `${currTableFkeys[j][0]}-${currTableFkeys[j][2]}`,
                targetHandle: `${currTableFkeys[j][1]}-${currTableFkeys[j][3]}`,
                animated: true,
                style: { stroke: '#ff9149', strokeWidth: 2 },
              };
              tableNodes.push(edge);

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
          // Skip edge creation for referencedBy to avoid duplicates with foreignKeys
          if (relationalData[tableNames[i]].referencedBy) {
            const currTableRefKeys = relationalData[tableNames[i]].referencedBy;
            for (let j = 0; j < currTableRefKeys.length; j++) {
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

        // Create hasHandles data after foreign key processing
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
            } else if (!hasHandles[obj.target].targetHandles.includes(obj.targetHandle)) {
              hasHandles[obj.target].targetHandles.push(obj.targetHandle);
            }
          }
        });

        // Now update the table nodes to include hasHandles data
        tableNodes.forEach((node) => {
          if (node.type === 'selectorNode') {
            node.data.hasHandles = hasHandles;
          }
        });

        // Create separate nodes for columns that need handles
        const tableNamesForHandles = Object.keys(relationalData);
        for (let i = 0; i < tableNamesForHandles.length; i++) {
          const tableName = tableNamesForHandles[i];
          const tableData = relationalData[tableName];

          // Check for source handles (foreign keys)
          if (tableData.foreignKeys) {
            tableData.foreignKeys.forEach((fk) => {
              const sourceColumn = fk[2]; // e.g., "user_id"
              const sourceHandleId = `${tableName}-${sourceColumn}`;

              // Create a separate node for this column
              tableNodes.push({
                id: sourceHandleId,
                type: 'columnHandleNode',
                data: {
                  tableName: tableName,
                  columnName: sourceColumn,
                  isSource: true,
                },
                style: {
                  backgroundColor: 'transparent',
                  border: 'none',
                  width: 10,
                  height: 20,
                },
                position: {
                  x: 0, // Will be calculated below
                  y: 0, // Will be calculated below
                },
                sourcePosition: 'right',
              });
            });
          }

          // Check for target handles (referenced by)
          if (tableData.referencedBy) {
            tableData.referencedBy.forEach((ref) => {
              const targetColumn = ref[3]; // e.g., "id"
              const targetHandleId = `${tableName}-${targetColumn}`;

              // Create a separate node for this column
              tableNodes.push({
                id: targetHandleId,
                type: 'columnHandleNode',
                data: {
                  tableName: tableName,
                  columnName: targetColumn,
                  isTarget: true,
                },
                style: {
                  backgroundColor: 'transparent',
                  border: 'none',
                  width: 10,
                  height: 20,
                },
                position: {
                  x: 0, // Will be calculated below
                  y: 0, // Will be calculated below
                },
                targetPosition: 'left',
              });
            });
          }
        }

        // Position the column handle nodes correctly relative to their tables
        tableNodes.forEach((node) => {
          if (node.type === 'columnHandleNode') {
            const tableName = node.data.tableName;
            const tableIndex = tableNamesForHandles.indexOf(tableName);
            const tableRow = Math.floor(tableIndex / 3);
            const tableCol = tableIndex % 3;
            const tableX = 200 + tableCol * 450;
            const tableY = 150 + tableRow * 400;

            if (node.data.isSource) {
              node.position.x = tableX + 350; // Right side of table
              node.position.y = tableY;
            } else if (node.data.isTarget) {
              node.position.x = tableX - 10; // Left side of table
              node.position.y = tableY;
            }
          }
        });

        // Separate nodes and edges to avoid timing issues
        const tableNodesOnly = tableNodes.filter((node) => node.type === 'selectorNode');
        const edgesOnly = tableNodes.filter((node) => node.type === 'default');

        // First, set the table nodes only (without edges)
        diagramDispatch({
          type: 'SET_TABLES',
          payload: {
            sqlSchema,
            dbContents: [dbContents],
            tableNodes: tableNodesOnly,
            relationalData,
            primaryKeys,
            hasHandles,
          },
        });

        // Then, after a short delay, add the edges
        setTimeout(() => {
          diagramDispatch({
            type: 'SET_EDGES',
            payload: {
              edges: edgesOnly,
            },
          });
        }, 100);

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
      return formDispatch({
        type: 'TOGGLE_FORM',
        payload: {
          URIvalidation: 'Invalid URI link.',
          formIsOpen: true,
        },
      });
    }

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
            tableContents[columnLabel] = fullTable[tableName].columns[j][columnLabel].dataType;

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
            type: 'selectorNode',
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

          const numTables = tableNodes.length;
          let tablesPerRow = 0;

          if (numTables < 5) tablesPerRow = numTables;
          else {
            if (numTables % 5 === 1) tablesPerRow = 4;
            else tablesPerRow = numTables;
          }

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
                animated: true,
                style: { stroke: '#fff' },
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
            } else if (!hasHandles[obj.target].targetHandles.includes(obj.targetHandle)) {
              hasHandles[obj.target].targetHandles.push(obj.targetHandle);
            }
          }
        });

        // Separate nodes and edges to avoid timing issues
        const tableNodesOnly = tableNodes.filter((node) => node.type === 'selectorNode');
        const edgesOnly = tableNodes.filter((node) => node.type === 'default');

        // First, set the table nodes only (without edges)
        diagramDispatch({
          type: 'SET_TABLES',
          payload: {
            sqlSchema,
            dbContents: [dbContents],
            tableNodes: tableNodesOnly,
            relationalData,
            primaryKeys,
            hasHandles,
          },
        });

        // Then, after a short delay, add the edges
        setTimeout(() => {
          diagramDispatch({
            type: 'SET_EDGES',
            payload: {
              edges: edgesOnly,
            },
          });
        }, 100);

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
          <h6 id="inputHeader">
            Or input a link to
            <br />
            your SQL database:
          </h6>
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
