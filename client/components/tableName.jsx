import React, { useContext } from 'react';
import { DiagramContext } from '../state/contexts';

export default function tableName({ tableName }) {
  const { diagramState } = useContext(DiagramContext);

  return (
    <div>
      <p>From Table Name</p>
      {tableName}
    </div>
  );
}
