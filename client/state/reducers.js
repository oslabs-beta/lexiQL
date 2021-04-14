export const initialDiagramState = {
  dbContents: [],
  tableNodes: [{}],
};

export const diagramReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TABLES':
      return {
        ...state,
        sqlSchema: action.payload.sqlSchema,
        tableNodes: action.payload.tableNodes,
        dbContents: action.payload.dbContents,
        relationalData: action.payload.relationalData,
        primaryKeys: action.payload.primaryKeys,
        hasHandles: action.payload.hasHandles,
      };
  }
};

export const initialCodeState = {
  schema: '',
  resolver: '',
  displayCode: '',
  codeIsOpen: false,
};

export const codeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CODE':
      return {
        ...state,
        schema: action.payload.schema,
        resolver: action.payload.resolver,
        displayCode: action.payload.displayCode,
        codeIsOpen: action.payload.codeIsOpen,
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
  URIvalidation: '',
  sampleDBtext: 'Get started by using the sample database:',
  inputDBtext: 'Or put a link to your database:',
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FORM':
      return {
        ...state,
        formIsOpen: action.payload.formIsOpen,
        firstFetch: action.payload.firstFetch,
        URIvalidation: action.payload.URIvalidation,
        sampleDBtext: action.payload.sampleDBtext,
        inputDBtext: action.payload.inputDBtext,
      };
  }
};
