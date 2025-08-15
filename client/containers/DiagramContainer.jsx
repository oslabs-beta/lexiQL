import React, { Suspense } from 'react';
let FlowContainer;
if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  FlowContainer = require('./FlowContainer.jsx').default;
} else {
  FlowContainer = React.lazy(() => import('./FlowContainer.jsx'));
}

export default function DiagramContainer() {
  return (
    <div className="diagramContainer">
      <Suspense fallback={<div style={{ padding: '2rem' }}>Loading diagram…</div>}>
        <FlowContainer />
      </Suspense>
    </div>
  );
}
