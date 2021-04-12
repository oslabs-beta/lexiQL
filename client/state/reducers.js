import { Elements } from 'react-flow-renderer';

// Visualizer display on app page
export const initialDiagramState = {
  tableNames: [],
  tableNodes: [],
  // testing this for the new custom node
  dbContents: [['hey', 'sup', 'hello']],
  // hardcoded for now but should be cleaned up
  dbContentsRev: {
    0: { tableName: 'hello', columns: ['test1a', 'test1b', 'test1c'] },
    1: { tableName: 'bye', columns: ['test2a', 'test2b', 'test2c'] },
    3: { tableName: 'hi', columns: ['test3a', 'test3b', 'test3c'] },
  },
  allTables: [],
  tableNodesRev: [
    {
      id: '2',
      type: 'selectorNode',
      data: { label: 'hi' },
      style: { border: '1px solid #777', padding: 10 },
      position: { x: 300, y: 50 },
    },
    // {
    //   id: '3',
    //   type: 'selectorNode',
    //   data: { label: 'bye' },
    //   style: { border: '1px solid #777', padding: 10 },
    //   position: { x: 300, y: 50 },
    // },
  ],
};

export const diagramReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TABLES':
      return {
        ...state,
        tableNodes: action.payload.tableNodes,
        sqlSchema: action.payload.sqlSchema,
        // testing this for the new custom node
        dbContents: action.payload.dbContents,
        dbContentsRev: action.payload.dbContentsRev,
        allTables: action.payload.allTables,
        tableNodesRev: action.payload.tableNodesRev,
      };
    case 'SET_ALL':
      return {
        ...state,
        displayCode: Elements,
      };
  }
};

export const initialCodeState = {
  schema: '',
  resolver: '',
  displayCode: '',
  codeIsOpen: true,
};

export const codeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CODE':
      return {
        ...state,
        schema: action.payload.schema,
        resolver: action.payload.resolver,
        displayCode: action.payload.displayCode,
      };
    case 'SET_DISPLAY':
      return {
        ...state,
        displayCode: action.payload.displayCode,
      };

    case 'TOGGLE_CODE':
      return {
        ...state,
        codeIsOpen: action.payload.codeIsOpen,
      };
  }
};

export const initialFormState = {
  formIsOpen: true,
  firstFetch: true,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FORM':
      return {
        ...state,
        formIsOpen: action.payload.formIsOpen,
        firstFetch: action.payload.firstFetch,
      };
  }
};

/*
export const setSelectedElements: (
  elements: Elements<any>,
) => {
  type: 'SET_SELECTED_ELEMENTS',
  payload: Elements<any>,
};
*/
