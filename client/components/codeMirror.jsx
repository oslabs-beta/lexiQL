import React, { useContext } from 'react';
import { CodeContext } from '../state/contexts';
import { UnControlled as CodeMirror } from 'react-codemirror2';

export default function codeMirror() {
  const { codeState } = useContext(CodeContext);

  return (
    <CodeMirror
      className="codeMirror"
      value={codeState.displayCode}
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true,
      }}
    />
  );
}
