import React, { Suspense, useContext, useEffect, useState } from 'react';
import CodeDrawer from '../components/CodeDrawer';
import { CodeContext } from '../state/contexts';

export default function CodeContainer() {
  const { codeState, codeDispatch } = useContext(CodeContext);
  const [drawerWidth, setDrawerWidth] = useState(32);
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);

  const toggleCodeDrawer = () => {
    codeDispatch({
      type: 'TOGGLE_CODE',
      payload: {
        codeIsOpen: !codeState.codeIsOpen,
      },
    });
  };

  // Clear collapsed state when drawer is closed
  useEffect(() => {
    if (!codeState.codeIsOpen) {
      localStorage.removeItem('schema-drawer-collapsed');
      setIsDrawerCollapsed(false);
    }
  }, [codeState.codeIsOpen]);

  const handleDrawerWidthChange = (width) => {
    setDrawerWidth(width);
  };

  const handleDrawerCollapseChange = (collapsed) => {
    setIsDrawerCollapsed(collapsed);
  };

  const toggleButtonStyle = {
    right: codeState.codeIsOpen ? (isDrawerCollapsed ? '44px' : `${drawerWidth}%`) : '0',
  };

  return (
    <div className="codeContainer" id="codeContainer">
      <button
        type="button"
        className={`code-toggle-btn ${codeState.codeIsOpen ? 'open' : ''}`}
        onClick={toggleCodeDrawer}
        title={codeState.codeIsOpen ? 'Hide code panel' : 'Show code panel'}
        style={toggleButtonStyle}
      >
        {codeState.codeIsOpen ? '▶' : '◀'}
      </button>

      {codeState.codeIsOpen && (
        <Suspense fallback={<div style={{ padding: '1rem' }}>Loading editor…</div>}>
          <CodeDrawer
            onWidthChange={handleDrawerWidthChange}
            onCollapseChange={handleDrawerCollapseChange}
          />
        </Suspense>
      )}
    </div>
  );
}
