import React, { useContext } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { CodeContext } from '../state/contexts';

export default function CodeMirrorComponent() {
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
