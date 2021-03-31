// Visualizer display on app page
export const initialVisualizerState = {
  tableNames: [],
  tableNodes: [],
};

export const visualizerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TABLES':
      return {
        ...state,
        tableNames: action.payload.tableNames,
        tableNodes: action.payload.tableNodes,
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
        // schema: 'TESTING 123',
        schema: action.payload.schema,
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
