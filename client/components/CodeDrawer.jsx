import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CodeContext } from '../state/contexts';

// Import CodeMirror with proper error handling
let CodeMirror;
try {
  CodeMirror = require('react-codemirror2').UnControlled;
} catch (error) {
  console.error('Failed to load CodeMirror:', error);
  // Fallback component
  const CodeMirrorFallback = ({ value, _options }) => (
    <div className="schema-drawer__editor-fallback">
      <pre>{value || '// CodeMirror failed to load'}</pre>
    </div>
  );
  CodeMirror = CodeMirrorFallback;
}

export default function CodeDrawer({ onWidthChange, onCollapseChange }) {
  const { codeState, codeDispatch } = useContext(CodeContext);
  const [activeTab, setActiveTab] = useState('schema');
  const [isResizing, setIsResizing] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(32); // 32% default width
  const [wordWrap, setWordWrap] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCopyConfirmation, setShowCopyConfirmation] = useState(false);
  const [isFormatted, setIsFormatted] = useState(false);
  const drawerRef = useRef(null);
  const resizeRef = useRef(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedWidth = localStorage.getItem('schema-drawer-width');
    const savedTab = localStorage.getItem('schema-drawer-tab');
    const savedWordWrap = localStorage.getItem('schema-drawer-wordwrap');
    const savedCollapsed = localStorage.getItem('schema-drawer-collapsed');

    if (savedWidth) setDrawerWidth(parseFloat(savedWidth));
    if (savedTab) setActiveTab(savedTab);
    if (savedWordWrap) setWordWrap(savedWordWrap === 'true');
    // Only load collapsed state if the drawer is actually open
    if (savedCollapsed && codeState.codeIsOpen) {
      setIsCollapsed(savedCollapsed === 'true');
    } else {
      // Reset collapsed state when drawer opens
      setIsCollapsed(false);
    }
  }, [codeState.codeIsOpen]);

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('schema-drawer-width', drawerWidth.toString());
  }, [drawerWidth]);

  useEffect(() => {
    localStorage.setItem('schema-drawer-tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('schema-drawer-wordwrap', wordWrap.toString());
  }, [wordWrap]);

  useEffect(() => {
    localStorage.setItem('schema-drawer-collapsed', isCollapsed.toString());
  }, [isCollapsed]);

  // Notify parent of collapse state changes
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsFormatted(false); // Reset formatted state when switching tabs

    if (tab === 'schema') {
      codeDispatch({
        type: 'SET_DISPLAY',
        payload: {
          displayCode:
            codeState.schema ||
            '// No schema data available\n// Load sample data or connect to a database to see the generated GraphQL schema',
        },
      });
    } else if (tab === 'resolver') {
      codeDispatch({
        type: 'SET_DISPLAY',
        payload: {
          displayCode:
            codeState.resolver ||
            '// No resolver data available\n// Load sample data or connect to a database to see the generated GraphQL resolvers',
        },
      });
    }
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(codeState.displayCode || '');
      setShowCopyConfirmation(true);

      // Hide the confirmation message after 2 seconds
      setTimeout(() => {
        setShowCopyConfirmation(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleDownload = () => {
    const content = codeState.displayCode || '';
    const extension = activeTab === 'schema' ? '.graphql' : '.js';
    const filename = `${activeTab}${extension}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFormat = () => {
    let content = '';

    // Use the original data based on active tab
    if (activeTab === 'schema') {
      content = codeState.schema || '';
    } else if (activeTab === 'resolver') {
      content = codeState.resolver || '';
    }

    if (isFormatted) {
      // Toggle back to unformatted (original)
      codeDispatch({
        type: 'SET_DISPLAY',
        payload: {
          displayCode: content,
        },
      });
      setIsFormatted(false);
    } else {
      // Format the code
      const formatted = content
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join('\n');

      codeDispatch({
        type: 'SET_DISPLAY',
        payload: {
          displayCode: formatted,
        },
      });
      setIsFormatted(true);
    }
  };

  const handleToggleCollapse = () => {
    try {
      const newCollapsedState = !isCollapsed;
      setIsCollapsed(newCollapsedState);

      // Ensure the parent is notified immediately
      if (onCollapseChange) {
        onCollapseChange(newCollapsedState);
      }
    } catch (error) {
      console.error('Error toggling drawer collapse:', error);
      // Fallback: ensure drawer is in a safe state
      setIsCollapsed(false);
      if (onCollapseChange) {
        onCollapseChange(false);
      }
    }
  };

  const startResize = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const stopResize = () => {
    setIsResizing(false);
  };

  const handleResize = useCallback(
    (e) => {
      if (!isResizing) return;

      const containerWidth = window.innerWidth;
      const newWidth = ((containerWidth - e.clientX) / containerWidth) * 100;

      // Limit width between 20% and 60%, minimum 320px
      const minWidthPercent = (320 / containerWidth) * 100;
      if (newWidth >= Math.max(20, minWidthPercent) && newWidth <= 60) {
        setDrawerWidth(newWidth);
        if (onWidthChange) {
          onWidthChange(newWidth);
        }
      }
    },
    [isResizing, onWidthChange]
  );

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResize);

      return () => {
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
      };
    }
  }, [isResizing, handleResize]);

  // Set initial display code when component mounts (only once)
  useEffect(() => {
    if (!codeState.displayCode && !codeState.schema && !codeState.resolver) {
      // Only set placeholder if there's no code data at all
      codeDispatch({
        type: 'SET_DISPLAY',
        payload: {
          displayCode:
            '// No schema data available\n// Load sample data or connect to a database to see the generated GraphQL schema',
        },
      });
    }
  }, [codeDispatch, codeState.displayCode, codeState.schema, codeState.resolver]); // Include all dependencies

  const drawerStyle = {
    width: isCollapsed ? '44px' : `${drawerWidth}%`,
  };

  return (
    <div
      className={`schema-drawer ${isCollapsed ? 'schema-drawer--collapsed' : ''}`}
      style={drawerStyle}
      ref={drawerRef}
    >
      {/* Resize handle */}
      <div className="schema-drawer__resize-handle" onMouseDown={startResize} ref={resizeRef} />

      {/* Header */}
      <div className="schema-drawer__header">
        <div className="schema-drawer__tabs">
          <button
            className={`schema-drawer__tab ${activeTab === 'schema' ? 'schema-drawer__tab--active' : ''}`}
            onClick={() => handleTabChange('schema')}
            aria-label="View GraphQL schema"
          >
            Schema
          </button>
          <button
            className={`schema-drawer__tab ${activeTab === 'resolver' ? 'schema-drawer__tab--active' : ''}`}
            onClick={() => handleTabChange('resolver')}
            aria-label="View GraphQL resolvers"
          >
            Resolver
          </button>
        </div>

        <div className="schema-drawer__controls">
          <button
            className="schema-drawer__control"
            onClick={handleCopy}
            aria-label="Copy to clipboard"
            title="Copy to clipboard"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>

          {showCopyConfirmation && <div className="schema-drawer__copy-confirmation">Copied</div>}

          <button
            className="schema-drawer__control"
            onClick={handleDownload}
            aria-label="Download file"
            title="Download file"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>

          <button
            className={`schema-drawer__control ${wordWrap ? 'schema-drawer__control--active' : ''}`}
            onClick={() => setWordWrap(!wordWrap)}
            aria-label="Toggle word wrap"
            title="Toggle word wrap"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <button
            className={`schema-drawer__control ${isFormatted ? 'schema-drawer__control--active' : ''}`}
            onClick={handleFormat}
            aria-label="Format code"
            title="Format code"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <button
            className={`schema-drawer__control schema-drawer__control--collapse ${isCollapsed ? 'schema-drawer__control--collapsed' : ''}`}
            onClick={handleToggleCollapse}
            aria-label={isCollapsed ? 'Expand drawer' : 'Collapse drawer'}
            title={isCollapsed ? 'Expand drawer' : 'Collapse drawer'}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Code editor area */}
      <div className="schema-drawer__editor">
        <CodeMirror
          className="schema-drawer__code-editor"
          value={codeState.displayCode || ''}
          options={{
            mode: 'javascript',
            theme: 'orbit-dark',
            lineNumbers: true,
            lineWrapping: wordWrap,
            readOnly: true,
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
            fontSize: 13.5,
            lineHeight: 1.6,
          }}
        />
      </div>
    </div>
  );
}
