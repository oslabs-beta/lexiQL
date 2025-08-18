import CryptoJS from 'crypto-js';
import React, { useContext } from 'react';
import secretKey from '../../server/secretKey';
import URIButton from '../components/URIButton';
import { FormContext } from '../state/contexts';

export default function FormContainer() {
  const { formState, formDispatch, /* diagramState */ diagramDispatch, codeDispatch } =
    useContext(FormContext);

  // get data from the sample DB
  const handleSampleData = (e) => {
    e.preventDefault();

    // Set loading state
    formDispatch({
      type: 'SET_LOADING',
      payload: { isLoading: true },
    });

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
              // Object format: { refKey: referenceKey }
              for (const refKey of Object.keys(refByKeys)) {
                relationalTableData[tableName].referencedBy.push([
                  refKey,
                  tableName,
                  refByKeys[refKey],
                  tableElements.primaryKey,
                ]);
              }
            }
          }

          relationalData[tableName] = relationalTableData[tableName];

          let dataTypes = [];

          // Handle both array format and object format for columns
          if (Array.isArray(columns)) {
            // Array format: [{ columnName: { dataType, ... } }]
            for (let j = 0; j < columns.length; j++) {
              const columnLabel = Object.keys(columns[j])[0];
              tableContents[columnLabel] = fullTable[tableName].columns[j][columnLabel].dataType;
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

          // Create table node
          const tableNode = {
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
          };

          // Position the table in a grid layout
          const tableIndex = tableNodes.length; // Current table index
          const tablesPerRow = 3;
          const row = Math.floor(tableIndex / tablesPerRow);
          const col = tableIndex % tablesPerRow;

          tableNode.position.x = 450 * col + 200;
          tableNode.position.y = 400 * row + 150;

          tableNodes.push(tableNode);
          dbContents[i] = tableContents;
        }

        // Debug: Log the relational data
        console.log('relationalData:', relationalData);

        // logic for the input DB links
        const tableNames = Object.keys(relationalData);

        for (let i = 0; i < tableNames.length; i++) {
          // check to see if the table has a foreignKeys key
          if (relationalData[tableNames[i]].foreignKeys) {
            const currTableFkeys = relationalData[tableNames[i]].foreignKeys;
            console.log(`Foreign keys for ${tableNames[i]}:`, currTableFkeys);
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
              console.log('Creating foreign key edge:', edge);
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
          if (relationalData[tableNames[i]].referencedBy) {
            const currTableRefKeys = relationalData[tableNames[i]].referencedBy;
            console.log(`Referenced by for ${tableNames[i]}:`, currTableRefKeys);
            for (let j = 0; j < currTableRefKeys.length; j++) {
              const edge = {
                id: `${tableNames[i]}-refKey${j}`,
                type: 'default',
                source: currTableRefKeys[j][0],
                target: currTableRefKeys[j][1],
                sourceHandle: `${currTableRefKeys[j][0]}-${currTableRefKeys[j][2]}`,
                targetHandle: `${currTableRefKeys[j][1]}-${currTableRefKeys[j][3]}`,
                animated: true,
                style: { stroke: '#ff9149', strokeWidth: 2 },
              };
              console.log('Creating referenced by edge:', edge);
              tableNodes.push(edge);

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

        // Debug: Log the hasHandles object
        console.log('hasHandles object:', hasHandles);

        // Separate nodes and edges to avoid timing issues
        const tableNodesOnly = tableNodes.filter((node) => node.type === 'selectorNode');
        const edgesOnly = tableNodes.filter((node) => node.type === 'default');

        console.log('tableNodesOnly:', tableNodesOnly);
        console.log('edgesOnly:', edgesOnly);

        // Attach hasHandles data to table nodes
        tableNodesOnly.forEach((node) => {
          // Pass the entire hasHandles object to each table node
          // The ColumnNode component expects hasHandles[tableName] to access handle data
          node.data.hasHandles = hasHandles;
        });

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

        // Clear loading state
        formDispatch({
          type: 'SET_LOADING',
          payload: { isLoading: false },
        });
      })
      .catch((error) => {
        console.error('Error loading sample data:', error);
        formDispatch({
          type: 'SET_LOADING',
          payload: { isLoading: false },
        });
      });
  };

  // get data from user input DB
  const handleURI = (e) => {
    e.preventDefault();
    const URILink = document.getElementById('URILink').value;

    // Clear previous validation
    formDispatch({
      type: 'SET_VALIDATION',
      payload: { URIvalidation: '' },
    });

    // Basic URL validation
    if (!URILink.trim()) {
      formDispatch({
        type: 'SET_VALIDATION',
        payload: { URIvalidation: 'Please enter a database URL.' },
      });
      return;
    }

    if (!URILink.startsWith('postgres://')) {
      formDispatch({
        type: 'SET_VALIDATION',
        payload: { URIvalidation: 'URL must start with postgres://' },
      });
      return;
    }

    // Set loading state
    formDispatch({
      type: 'SET_LOADING',
      payload: { isLoading: true },
    });

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

          // Handle both array format and object format for columns
          if (Array.isArray(columns)) {
            // Array format: [{ columnName: { dataType, ... } }]
            for (let j = 0; j < columns.length; j++) {
              const columnLabel = Object.keys(columns[j])[0];
              tableContents[columnLabel] = fullTable[tableName].columns[j][columnLabel].dataType;
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
          // Create table node
          const tableNode = {
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
          };

          // Position the table in a grid layout
          const tableIndex = tableNodes.length; // Current table index
          const tablesPerRow = 3;
          const row = Math.floor(tableIndex / tablesPerRow);
          const col = tableIndex % tablesPerRow;

          tableNode.position.x = 450 * col + 200;
          tableNode.position.y = 400 * row + 150;

          tableNodes.push(tableNode);
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
                type: 'default',
                source: currTableFkeys[j][0],
                target: currTableFkeys[j][1],
                sourceHandle: `${currTableFkeys[j][0]}-${currTableFkeys[j][2]}`,
                targetHandle: `${currTableFkeys[j][1]}-${currTableFkeys[j][3]}`,
                animated: true,
                style: { stroke: '#ff9149', strokeWidth: 2 },
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
                type: 'default',
                source: currTableRefKeys[j][0],
                target: currTableRefKeys[j][1],
                sourceHandle: `${currTableRefKeys[j][0]}-${currTableRefKeys[j][2]}`,
                targetHandle: `${currTableRefKeys[j][1]}-${currTableRefKeys[j][3]}`,
                animated: true,
                style: { stroke: '#ff9149', strokeWidth: 2 },
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

        // Attach hasHandles data to table nodes
        tableNodesOnly.forEach((node) => {
          // Pass the entire hasHandles object to each table node
          // The ColumnNode component expects hasHandles[tableName] to access handle data
          node.data.hasHandles = hasHandles;
        });

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

        // Clear loading state
        formDispatch({
          type: 'SET_LOADING',
          payload: { isLoading: false },
        });
      })
      .catch((error) => {
        console.error('Error loading sample data:', error);
        formDispatch({
          type: 'SET_LOADING',
          payload: { isLoading: false },
        });
      });
  };

  // don't have URI form toggle button appear if it's the user's first time on the page
  let btnDisplay = '';
  if (formState.firstFetch) {
    btnDisplay = '';
  } else {
    btnDisplay = <URIButton />;
  }

  return (
    <div className="uriForm" id="uriForm">
      {btnDisplay}
      <div className={formState.formIsOpen ? 'uripanel open' : 'uripanel'}>
        <div className="database-card">
          <button
            type="button"
            className="collapse-button"
            onClick={() =>
              formDispatch({ type: 'TOGGLE_FORM', payload: { formIsOpen: !formState.formIsOpen } })
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <h2 className="card-header">Connect to a database</h2>
          <p className="card-helper">Load our sample data or connect your own URL.</p>

          <div className="card-section">
            <button
              type="button"
              className="primary-button"
              onClick={handleSampleData}
              disabled={formState.isLoading}
            >
              {formState.isLoading ? <span className="loading-spinner"></span> : 'Load sample data'}
            </button>
          </div>

          <form className="formContainer" onSubmit={handleURI}>
            <div className="card-section">
              <label htmlFor="URILink" className="input-label">
                Database connection URL
              </label>
              <input
                className={`database-input ${formState.URIvalidation ? 'error' : ''}`}
                id="URILink"
                placeholder="postgres://username:password@host:port/database"
                disabled={formState.isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleURI(e);
                  }
                }}
              />
              <div className="input-helper">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>Example: postgres://user:pass@localhost:5432/mydb</span>
              </div>
              {formState.URIvalidation && (
                <p className="error-message">{formState.URIvalidation}</p>
              )}
              <button type="submit" className="secondary-button" disabled={formState.isLoading}>
                {formState.isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  'Connect & generate schema'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
