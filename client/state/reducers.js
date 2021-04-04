// Visualizer display on app page
export const initialVisualizerState = {
  tableNames: [],
  tableNodes: [],
  // sqlSchema: []
};

export const visualizerReducer = (state, action) => {
  switch (action.type) {
    case "SET_TABLES":
      return {
        ...state,
        // tableNames: action.payload.tableNames,
        tableNodes: action.payload.tableNodes,
        sqlSchema: action.payload.sqlSchema,
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
  schema: "",
  resolver: "",
  // viewSchema: true,
  displayCode: "",

  // state for the collapsible panels, have to move out once we create a new context
  codeIsOpen: true,
  formIsOpen: true,
  firstFetch: true,
};

export const codeReducer = (state, action) => {
  switch (action.type) {
    case "SET_CODE":
      return {
        ...state,
        schema: action.payload.schema,
        resolver: action.payload.resolver,
        displayCode: action.payload.displayCode,
        firstFetch: action.payload.firstFetch,
        formIsOpen: action.payload.formIsOpen,
      };
    case "SET_DISPLAY":
      return {
        ...state,
        displayCode: action.payload.displayCode,
      };

    // case for the collapsible panels, have to move out once we create a new context
    case "TOGGLE_CODE":
      return {
        ...state,
        codeIsOpen: action.payload.codeIsOpen,
      };
    case "TOGGLE_FORM":
      return {
        ...state,
        formIsOpen: action.payload.formIsOpen,
      };
  }
};
