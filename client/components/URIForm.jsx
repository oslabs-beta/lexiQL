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
        // const tableNames = [];
        const sqlSchema = data.SQLSchema;
        const tableNodes = [];

        // loop through the data and grab every table name
        for (let i = 0; i < data.SQLSchema.length; i += 1) {
          const currTableNodes = [];
          const fullTable = data.SQLSchema[i];
          const tableName = Object.keys(fullTable)[0];

          currTableNodes.push({
            id: i.toString(),
            type: 'default',
            style: { background: '#f5ba5a' },
            data: { label: tableName },

            position: {
              x: 200 * i,
              y: 0,
            },
          });

          tableNodes.push(currTableNodes);
          console.log('tableNodes[i]:', tableNodes[i]);

          // [[tablename1, column11, column12..], [tablename2, column21, column22]....] 
          const columns = fullTable[tableName].columns;
          console.log('columns:', columns);

          for (let j = 0; j < columns.length; j++) {
            const columnLabel = Object.keys(columns[j])[0];
            tableNodes[i].push({
              id: `${i}${j}`,
              type: 'default',
              style: { background:' #5a95f5' },
              data: { label: columnLabel },
  
              position: {
                x: 200 * i,
                y: 100 * (j+1),
              },
            });
          }

          // tableNodes.push(currTableNodes);
        }

        console.log('tableNodes after 1st loop: ', tableNodes);

        // loop thru a 2nd time to grab the column names and add them the tableNodes array
        // for (let i = 0; i < data.SQLSchema.length; i += 1) {
        //   const fullTable = data.SQLSchema[i];
        //   const tableName = Object.keys(fullTable)[0];
        //   const subArr = tableNodes[i];
        //   console.log('subArr:', subArr);
          
        //   // grabs all the columns in the table
        //   const columns = fullTable[tableName].columns;
        //   console.log('columns:', columns);
        //   console.log('columns[0]:', columns[0]);

        //   // gets the contents of a single column
        //   const oneColumn = columns[0];
        //   console.log('oneColumn:', oneColumn);
        //   // gets the data type of the specific column
        //   const dataTypes = oneColumn['dataType'];
        //   console.log('dataTypes:', dataTypes);

        //   const columnLabel = Object.keys(oneColumn)[0];
        //   tableNodes[i].push({
        //     id: i.toString(),
        //     type: 'default',
        //     style: { background:' #5a95f5' },
        //     data: { label: columnLabel },

        //     position: {
        //       x: 200 * i,
        //       y: 100,
        //     },
        //   });
        // }

        // console.log('tableNodes after 2nd loop: ', tableNodes);

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
            schema: data.GQLSchema.types,
            resolver: data.GQLSchema.resolvers,
            displayCode: data.GQLSchema.types,
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

    fetch('/sql-schema', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: URILink }),
    })
      .then((res) => res.json())
      .then((data) => {
        // const tableNames = [];
        const sqlSchema = data.SQLSchema;
        // console.log('data:', data);
        console.log('SQL schema:', data.SQLSchema);
        const tableNodes = [];

        for (let i = 0; i < data.SQLSchema.length; i += 1) {
          const fullTable = data.SQLSchema[i];
          const tableName = Object.keys(fullTable)[0];
          // tableNames.push(tableName);
          // console.log('fullTable in loop:', fullTable);
          // console.log('tableName in loop:', tableName);

          // const columns = fullTable[tableName].columns;
          // console.log('columns:', columns);
          // const oneColumn = columns[0];
          // console.log('oneColumn:', oneColumn);
          // const dataType = oneColumn.dataType;
          // console.log('dataType:', dataType);

          tableNodes.push({
            id: i.toString(),
            type: 'default',
            style: { background:' #5a95f5' },
            data: { label: tableName },

            position: {
              x: 200 * i,
              y: 0,
            },
          });
        }
        // console.log('SEND NODES: ', tableNodes);

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
            // schema: 'abc124124124',
            // resolver: '124124214!!!',
            // test: '12345124124124',
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
    <div className="uriForm" id="uriForm">
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
  );
}
