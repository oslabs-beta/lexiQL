import React, { useContext } from 'react';
import { CodeContext } from '../state/contexts';
import { UnControlled as CodeMirror } from 'react-codemirror2';
// import '../node_modules/codemirror/lib/codemirror.css';
// import '../node_modules/codemirror/theme/material.css';
// import 'codemirror/mode/javascript/javascript';
require('../../node_modules/codemirror/mode/xml/xml');
require('../../node_modules/codemirror/mode/javascript/javascript');
require('../../node_modules/codemirror/mode/css/css');
require('../../node_modules/codemirror/mode/jsx/jsx');
require('../../node_modules/codemirror/lib/codemirror.css');
require('../../node_modules/codemirror/theme/material.css');
// require('./theme.css');

export default function codeMirror() {
  const { codeState, codeDispatch } = useContext(CodeContext);

  return (
    <CodeMirror
      className="CodeMirror"
      value={codeState.displayCode}
      // value="hey hey hey pals"
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true,
      }}
      // onChange={(editor, data, value) => {}}
    />
  );
}
