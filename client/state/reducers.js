// Visualizer display on app page
export const initialDiagramState = {
  tableNames: [],
  tableNodes: [],
};

export const diagramReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TABLES':
      return {
        ...state,

        tableNodes: action.payload.tableNodes,
        sqlSchema: action.payload.sqlSchema,
      };
  }
};

// Code display on app page
// don't think we need to initialize state here? can just pass an empty string

export const initialCodeState = {
  schema: '',
  resolver: '',
  displayCode: '',

  // state for the collapsible panels, have to move out once we create a new context
  codeIsOpen: true,
  formIsOpen: true,
  firstFetch: true,
};

export const codeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CODE':
      return {
        ...state,
        schema: action.payload.schema,
        resolver: action.payload.resolver,
        displayCode: action.payload.displayCode,
        firstFetch: action.payload.firstFetch,
        formIsOpen: action.payload.formIsOpen,
      };
    case 'SET_DISPLAY':
      return {
        ...state,
        displayCode: action.payload.displayCode,
      };

    // case for the collapsible panels, have to move out once we create a new context
    case 'TOGGLE_CODE':
      return {
        ...state,
        codeIsOpen: action.payload.codeIsOpen,
      };
    case 'TOGGLE_FORM':
      return {
        ...state,
        formIsOpen: action.payload.formIsOpen,
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
      };
  }
};
