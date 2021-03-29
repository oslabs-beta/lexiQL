// Visualizer display on app page
export const initialVisualizerState = {
  allTables: [],
};

export const visualizerReducer = (state, action) => {
  switch (action.type) {
  case 'SET_TABLE':
    return {
      ...state,
      allTables: action.payload,
    }
  // case 'UPDATE_TABLE':
  //   return {
  //     ...state,
  //   }
  }
};

// Code display on app page
export const initialCodeState = {
  schema: '',
  resolver: '',
};

export const codeReducer = (state, action) => {
  switch (action.type) {
  case 'SET_CODE':
    return {
      ...state,
      schema: action.payload.schema,
      resolver: action.payload.resolver,
    }

  // case 'TEAM_LOAD':
  //   return {
  //     ...state,
  //   }
  }
};
