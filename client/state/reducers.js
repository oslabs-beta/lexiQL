// Visualizer display on app page
export const initialDiagramState = {
  dbContents: [],
  tableNodes: [{}],
};

export const diagramReducer = (state, action) => {
  switch (action.type) {
    case "SET_TABLES":
      return {
        ...state,
        sqlSchema: action.payload.sqlSchema,
        tableNodes: action.payload.tableNodes,
        dbContents: action.payload.dbContents,
        relationalData: action.payload.relationalData,
        primaryKeys: action.payload.primaryKeys,
      };
  }
};

export const initialCodeState = {
  schema: "",
  resolver: "",
  displayCode: "",
  codeIsOpen: true,
};

export const codeReducer = (state, action) => {
  switch (action.type) {
    case "SET_CODE":
      return {
        ...state,
        schema: action.payload.schema,
        resolver: action.payload.resolver,
        displayCode: action.payload.displayCode,
      };
    case "SET_DISPLAY":
      return {
        ...state,
        displayCode: action.payload.displayCode,
      };

    case "TOGGLE_CODE":
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
    case "TOGGLE_FORM":
      return {
        ...state,
        formIsOpen: action.payload.formIsOpen,
        firstFetch: action.payload.firstFetch,
      };
  }
};
