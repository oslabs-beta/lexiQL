// Visualizer display on app page
export const initialVisualizerState = {
  tableNames: [],
  tableNodes: [],
  // sqlSchema: []
};

export const visualizerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TABLES':
      return {
        ...state,
        tableNames: action.payload.tableNames,
        tableNodes: action.payload.tableNodes,
        // sqlSchema: action.payload.sqlSchema,
      };
    // case 'UPDATE_TABLE':
    //   return {
    //     ...state,
    //   }
  }
};

// Code display on app page
// don't think we need to initialize state here? can just pass an empty string

export const initialCodeState = {
  schema: '',
  // resolver: '',
  // viewSchema: true,
  displayCode: '',
};

export const codeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CODE':
      return {
        ...state,
<<<<<<< HEAD
        schema: 'TESTING 123!',
        // schema: action.payload.schema,
=======
        // schema: 'TESTING 123',
        schema: action.payload.schema,
>>>>>>> 6aa129352e7f1292e283af7217e27fd20a31316a
        resolver: 'TEMP HARDCODED TEXT',
        displayCode: action.payload.displayCode,
        // display:
      };
    case 'SET_DISPLAY':
      return {
        ...state,
        displayCode: action.payload.displayCode,
        // display:
      };

    // case 'TEAM_LOAD':
    //   return {
    //     ...state,
    //   }
  }
};
