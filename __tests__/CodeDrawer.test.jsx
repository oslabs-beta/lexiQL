import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CodeDrawer from '../client/components/CodeDrawer';
import { CodeContext } from '../client/state/contexts';

// Mock the CodeMirror component
jest.mock('react-codemirror2', () => ({
  UnControlled: ({ value }) => <div data-testid="code-mirror">{value}</div>,
}));

const mockCodeState = {
  schema: 'type User { id: ID! name: String! }',
  resolver: 'const resolvers = { Query: { users: () => [] } }',
  displayCode: 'type User { id: ID! name: String! }',
  codeIsOpen: true,
};

const mockCodeDispatch = jest.fn();

const renderCodeDrawer = () => {
  return render(
    <CodeContext.Provider value={{ codeState: mockCodeState, codeDispatch: mockCodeDispatch }}>
      <CodeDrawer />
    </CodeContext.Provider>
  );
};

describe('CodeDrawer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with schema tab active by default', () => {
    renderCodeDrawer();

    expect(screen.getByText('Schema')).toBeInTheDocument();
    expect(screen.getByText('Resolver')).toBeInTheDocument();
    expect(screen.getByTestId('code-mirror')).toBeInTheDocument();

    // Schema tab should be active
    expect(screen.getByText('Schema').closest('button')).toHaveClass('schema-drawer__tab--active');
  });

  it('switches to resolver tab when clicked', () => {
    renderCodeDrawer();

    const resolverTab = screen.getByText('Resolver');
    fireEvent.click(resolverTab);

    expect(mockCodeDispatch).toHaveBeenCalledWith({
      type: 'SET_DISPLAY',
      payload: {
        displayCode: mockCodeState.resolver,
      },
    });
  });

  it('has a copy button with tooltip', () => {
    renderCodeDrawer();

    const copyButton = screen.getByRole('button', { name: /copy to clipboard/i });
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toHaveAttribute('title', 'Copy to clipboard');
  });

  it('has a resize handle', () => {
    renderCodeDrawer();

    const resizeHandle = document.querySelector('.schema-drawer__resize-handle');
    expect(resizeHandle).toBeInTheDocument();
    expect(resizeHandle).toHaveClass('schema-drawer__resize-handle');
  });
});
