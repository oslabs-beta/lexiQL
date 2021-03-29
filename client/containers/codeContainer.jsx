import React, { useContext } from 'react';
import { CodeContext } from '../state/contexts';

export default function codeContainer() {
  const { testCode } = useContext(CodeContext);
  // console.log(testCode.test);
  return (
    <div className="codeContainer">
      <h1>Code will go here!!!!</h1>
      <p>{testCode.test}</p>
    </div>
  );
}
