// Visualizer display on app page
export const initialVisualizerState = {
  tableNames: [],
  tableNodes: [],
};

export const visualizerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TABLE':
      return {
        ...state,

        tableNames: action.payload.tableNames,
      };
    // case 'UPDATE_TABLE':
    //   return {
    //     ...state,
    //   }
  }
};

// Code display on app page
// don't think we need to initialize state here? can just pass an empty string
/*
export const initialCodeState = {
  // schema: '',
  // resolver: '',
  test: '',
};
*/

export const codeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CODE':
      return {
        // ...state,
        schema: action.payload.schema,
        resolver: action.payload.resolver,
        test: action.payload.test,
      };

    // case 'TEAM_LOAD':
    //   return {
    //     ...state,
    //   }
  }
};
