import React, { memo } from 'react';
import ColumnNode from './ColumnNode.jsx';

const TableNode = ({ data }) => {
  const { tableName, columns, dataTypes, hasHandles } = data;

  let tableColumns;

  if (columns && dataTypes) {
    tableColumns = columns.map((column, index) => (
      <ColumnNode
        key={`${tableName}-${column}`}
        columnName={column}
        dataType={dataTypes[index]}
        id={column}
        tableName={tableName}
        hasHandles={hasHandles}
      />
    ));
  }

  return (
    <>
      <div className="tableHeader">
        <strong>{tableName}</strong>
      </div>
      <br />
      {tableColumns}
    </>
  );
};

TableNode.displayName = 'TableNode';

export default memo(TableNode);
