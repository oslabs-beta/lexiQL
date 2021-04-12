// Visualizer display on app page
export const initialDiagramState = {
  dbContents: [['hey', 'sup', 'hello']],
  tableNodes: [
    {
      id: '2',
      type: 'selectorNode',
      data: { label: 'hi' },
      style: { border: '1px solid #777', padding: 10 },
      position: { x: 300, y: 50 },
    },
  ],
};

export const diagramReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TABLES':
      return {
        ...state,
        sqlSchema: action.payload.sqlSchema,
        tableNodes: action.payload.tableNodes,

        // testing this for the new custom node
        dbContents: action.payload.dbContents,
        // tableNodesRev: action.payload.tableNodesRev,
        relationalData: action.payload.relationalData,
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
