// Visualizer display on app page
export const initialVisualizerState = () => {
  allTables: []
};

export const visualizerReducer = (state, action) => {
  switch (action.type) {
  case 'SET_TABLE':
    return {
      ...state,
      allTables: action.payload,
    }
  // case 'TEAM_LOAD':
  //   return {
  //     ...state,
  //   }
  }
};

// Code display on app page
export const initialCodeState = () => {

};

export const codeReducer = (state, action) => {
  switch (action.type) {
  case 'HOMEPAGE_LOAD':
    return {
      ...state,
    }

  case 'TEAM_LOAD':
    return {
      ...state,
    }
  }
};
